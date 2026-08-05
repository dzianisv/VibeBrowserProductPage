#!/usr/bin/env node
'use strict'

/**
 * Media asset tooling for deploys that check out WITHOUT Git LFS.
 *
 * WHY THIS EXISTS
 * ---------------
 * This repo keeps ~180 MB of demo video in Git LFS. GitHub's free plan gives
 * 1 GB/month of LFS *bandwidth* and that quota is consumed per-job, so a
 * handful of `lfs: true` checkouts exhaust it and then EVERY `actions/checkout`
 * hard-fails with "This repository exceeded its LFS budget" — including the
 * production deploys, which then never ship.
 *
 * `package.json`'s `"prebuild": "git lfs pull 2>/dev/null || true"` fails OPEN,
 * so a deploy that checks out with `lfs: false` will happily build and ship
 * 130-byte LFS *pointer files* in place of real video. That is a silent,
 * user-visible breakage. Hence the two subcommands below.
 *
 *   fetch <app>    Materialise the real bytes for the assets an app genuinely
 *                  serves itself, downloading them from GitHub's media CDN
 *                  (media.githubusercontent.com) instead of the LFS API. That
 *                  CDN is not charged against the LFS bandwidth budget, which
 *                  is exactly why the root site already 307-redirects its own
 *                  videos there in production (see next.config.mjs).
 *
 *   verify <app>   POST-BUILD GUARD. Walks the built output and fails loudly if
 *                  any .mp4/.webm is an LFS pointer or implausibly small. An
 *                  asset that is absent by design is fine; a pointer file
 *                  masquerading as a video is not.
 *
 * Every app is declared in APPS below. Adding a video to an app that serves its
 * own bytes means adding it to `assets` — otherwise the guard will not know to
 * fetch it, and the build will fail rather than ship a pointer.
 */

const fs = require('node:fs')
const path = require('node:path')

const REPO_ROOT = path.resolve(__dirname, '..')

/** GitHub's media CDN mirror of the LFS objects, keyed off the deployed ref. */
const MEDIA_BASE =
  'https://media.githubusercontent.com/media/dzianisv/VibeBrowserProductPage'

/**
 * Smallest plausible real video. Every LFS pointer file this repo produces is
 * ~130 bytes; the smallest genuine asset is ~250 KB. 1 KB cleanly separates
 * them while still catching a truncated download.
 */
const MIN_VIDEO_BYTES = 1024

const VIDEO_EXTENSIONS = new Set(['.mp4', '.webm'])

const APPS = {
  /**
   * vibebrowser.app — serves NO local video bytes.
   *
   * Two independent mechanisms guarantee this:
   *   1. `.vercelignore` excludes `public/*.mp4` and `public/*.webm`, so the
   *      files are never uploaded to Vercel at all; and
   *   2. `next.config.mjs` 307-redirects every `*.mp4` / `*.webm` request to
   *      media.githubusercontent.com, which is matched before the filesystem
   *      route that would serve `public/`.
   *
   * Verified live: `https://www.vibebrowser.app/linkedin-demo.mp4` → 307 →
   * media.githubusercontent.com → 200, content-length 70653630.
   *
   * `strip` therefore deletes the (pointer) files before the build so the
   * output is video-free by design and the post-build guard is unambiguous.
   */
  root: {
    strip: ['public'],
    assets: [],
    outputDirs: ['.vercel/output'],
  },

  /**
   * agentlabs.cc — apps/agentlabs/next.config.ts has NO video redirect and the
   * app has no .vercelignore, so `/agentpod/demo-10x.mp4` is served from its
   * own `public/`. Verified live: 200, content-type video/mp4, 499416 bytes.
   * These assets must be real.
   */
  agentlabs: {
    strip: [],
    assets: [
      'apps/agentlabs/public/agentpod/demo-10x.mp4',
      'apps/agentlabs/public/agentpod/demo-full.mp4',
    ],
    outputDirs: ['apps/agentlabs/.vercel/output', '.vercel/output'],
  },

  /**
   * opencode.agentlabs.cc — OpenCodeMobileSite/next.config.ts has no video
   * redirect and no .vercelignore; ShowcaseVideo.tsx <source>s both files from
   * its own `public/`. These assets must be real.
   */
  'opencode-mobile': {
    strip: [],
    assets: [
      'OpenCodeMobileSite/public/media/video/cua-showcase-10x.mp4',
      'OpenCodeMobileSite/public/media/video/cua-showcase-10x.webm',
    ],
    outputDirs: ['OpenCodeMobileSite/.vercel/output'],
  },
}

function fail(message) {
  console.error(`::error::${message}`)
  process.exitCode = 1
}

/** An LFS pointer file is a tiny text blob starting with a version URL. */
function isLfsPointer(absolutePath) {
  const handle = fs.openSync(absolutePath, 'r')
  try {
    const buffer = Buffer.alloc(64)
    const read = fs.readSync(handle, buffer, 0, 64, 0)
    return buffer.subarray(0, read).toString('utf8').startsWith('version https://git-lfs')
  } finally {
    fs.closeSync(handle)
  }
}

function* walkVideos(directory) {
  let entries
  try {
    entries = fs.readdirSync(directory, { withFileTypes: true })
  } catch {
    return
  }

  for (const entry of entries) {
    const absolute = path.join(directory, entry.name)
    // Vercel's build output symlinks large trees; following them would double
    // count and can escape the output directory entirely.
    if (entry.isSymbolicLink()) continue
    if (entry.isDirectory()) {
      yield* walkVideos(absolute)
    } else if (VIDEO_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      yield absolute
    }
  }
}

async function download(url, destination) {
  const response = await fetch(url, { redirect: 'follow' })
  if (!response.ok) {
    throw new Error(`GET ${url} returned ${response.status}`)
  }
  const bytes = Buffer.from(await response.arrayBuffer())
  if (bytes.length < MIN_VIDEO_BYTES) {
    throw new Error(
      `GET ${url} returned only ${bytes.length} bytes — refusing to write a stub`,
    )
  }
  fs.mkdirSync(path.dirname(destination), { recursive: true })
  fs.writeFileSync(destination, bytes)
  return bytes.length
}

async function commandFetch(app, config) {
  // Pin to the exact commit being deployed so a concurrent push to main can
  // never swap the bytes underneath this build.
  const ref = process.env.GITHUB_SHA || 'main'

  for (const relative of config.strip) {
    const directory = path.join(REPO_ROOT, relative)
    for (const absolute of walkVideos(directory)) {
      fs.rmSync(absolute)
      console.log(`stripped  ${path.relative(REPO_ROOT, absolute)} (not served by ${app})`)
    }
  }

  for (const relative of config.assets) {
    const destination = path.join(REPO_ROOT, relative)
    const existing = fs.existsSync(destination) ? fs.statSync(destination).size : -1

    if (existing >= MIN_VIDEO_BYTES && !isLfsPointer(destination)) {
      console.log(`ok        ${relative} (${existing} bytes, already real)`)
      continue
    }

    const url = `${MEDIA_BASE}/${ref}/${relative}`
    const size = await download(url, destination)
    console.log(`fetched   ${relative} (${size} bytes) from ${ref}`)
  }
}

function commandVerify(app, config) {
  const declared = new Set(
    config.assets.map((relative) => path.basename(relative)),
  )
  let scanned = 0
  let checkedDirectories = 0

  for (const relative of config.outputDirs) {
    const directory = path.join(REPO_ROOT, relative)
    if (!fs.existsSync(directory)) continue
    checkedDirectories += 1

    for (const absolute of walkVideos(directory)) {
      scanned += 1
      const shown = path.relative(REPO_ROOT, absolute)
      const size = fs.statSync(absolute).size

      if (isLfsPointer(absolute)) {
        fail(
          `${shown} is a Git LFS pointer file (${size} bytes), not video. ` +
            `The deploy would ship a broken asset. Add it to APPS['${app}'].assets ` +
            `in scripts/media-assets.cjs, or restore lfs: true for this job.`,
        )
        continue
      }

      if (size < MIN_VIDEO_BYTES) {
        fail(`${shown} is only ${size} bytes — implausible for a video; refusing to deploy.`)
        continue
      }

      console.log(`ok        ${shown} (${size} bytes)`)
    }
  }

  if (checkedDirectories === 0) {
    fail(
      `no build output found for '${app}' (looked in ${config.outputDirs.join(', ')}) — ` +
        `the guard cannot confirm the deploy is pointer-free.`,
    )
    return
  }

  // An app that declares assets but ships none of them has silently lost them.
  if (declared.size > 0 && scanned === 0) {
    fail(
      `'${app}' declares ${declared.size} video asset(s) but the build output contains none. ` +
        `They were dropped somewhere between fetch and build.`,
    )
    return
  }

  if (process.exitCode) {
    fail(`media guard FAILED for '${app}' — see the errors above. Not deploying.`)
    return
  }

  console.log(
    `media guard: ${scanned} video file(s) in '${app}' output, all real (>= ${MIN_VIDEO_BYTES} bytes).`,
  )
}

async function main() {
  const [command, app] = process.argv.slice(2)
  const config = APPS[app]

  if (!config || !['fetch', 'verify'].includes(command)) {
    console.error(
      `usage: node scripts/media-assets.cjs <fetch|verify> <${Object.keys(APPS).join('|')}>`,
    )
    process.exit(2)
  }

  if (command === 'fetch') {
    await commandFetch(app, config)
  } else {
    commandVerify(app, config)
  }
}

main().catch((error) => {
  fail(error.message)
  process.exit(1)
})
