// dl.agentlabs.cc — static asset CDN (Cloudflare Worker, script name: agentpod-apk-cdn)
//
// Fronts PUBLIC GitHub **Release assets** at clean, stable, custom-domain URLs.
//
// WHY RELEASE ASSETS
// ------------------
// Release-asset egress is explicitly unmetered:
//   "There is no limit on the total size of a release, nor bandwidth usage."
//   https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases
// Git LFS bandwidth, by contrast, is billed to the repository owner and is
// blocked outright once the monthly quota is exhausted — which previously took
// down deploys for this org. See VibeBrowserProductPage#203 / #207.
//
// WHY A WORKER AND NOT THE RELEASE URL DIRECTLY
// ---------------------------------------------
// GitHub serves release assets with headers that are fine for a download but
// wrong for an inline <video>:
//   content-type: application/octet-stream   (not video/mp4)
//   content-disposition: attachment          (asks the browser to save, not play)
//   <no cache-control at all>                (so every play re-downloads)
// This Worker rewrites all three, and forwards Range requests so the browser can
// seek and progressively stream instead of buffering the whole file.
//
// ROUTES
//   GET /agentpod/openclaw-latest.apk            -> latest APK release asset
//   GET /agentpod/openclaw-<version>-release.apk -> that version's APK asset
//   GET /media/<name>.(mp4|webm)                 -> demo video from MEDIA_TAG
//
// Consumers: NEXT_PUBLIC_APK_URL, VibeBrowserProductPage next.config.mjs
// redirects, and scripts/media-assets.cjs build-time fetches.

const REPO = "VibeTechnologies/agentpod-releases";
const ASSET = "openclaw-universal-release.apk";
const APK_CT = "application/vnd.android.package-archive";

/** Demo video assets. The tag is immutable, so responses are cacheable forever. */
const MEDIA_REPO = "dzianisv/VibeBrowserProductPage";
const MEDIA_TAG = "media-v1";
const MEDIA_CT = { mp4: "video/mp4", webm: "video/webm" };

/**
 * Only a flat, extension-checked basename is accepted. This is a security
 * boundary, not a nicety: the value is interpolated into an upstream URL, so
 * allowing `/`, `..` or `?` would let a caller redirect the fetch at an
 * arbitrary GitHub path (SSRF) or escape the pinned release tag.
 */
const MEDIA_NAME = /^[A-Za-z0-9][A-Za-z0-9._-]*\.(mp4|webm)$/;

function resolveApk(pathname) {
  if (pathname === "/agentpod/openclaw-latest.apk") {
    return `https://github.com/${REPO}/releases/latest/download/${ASSET}`;
  }
  const m = pathname.match(/^\/agentpod\/openclaw-(.+)-release\.apk$/);
  if (m) {
    const ver = m[1];
    const tag = ver.startsWith("v") ? ver : `v${ver}`;
    return `https://github.com/${REPO}/releases/download/${tag}/${ASSET}`;
  }
  return null;
}

function resolveMedia(pathname) {
  const m = pathname.match(/^\/media\/([^/]+)$/);
  if (!m) return null;
  const name = m[1];
  if (!MEDIA_NAME.test(name)) return null;
  return {
    url: `https://github.com/${MEDIA_REPO}/releases/download/${MEDIA_TAG}/${name}`,
    contentType: MEDIA_CT[name.split(".").pop().toLowerCase()],
  };
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", { status: 405 });
    }
    if (url.pathname === "/" || url.pathname === "") {
      return new Response(
        "AgentPod APK CDN. Try /agentpod/openclaw-latest.apk or /media/<name>.mp4\n",
        { status: 200, headers: { "content-type": "text/plain" } }
      );
    }

    const media = resolveMedia(url.pathname);
    return media
      ? serveMedia(request, media)
      : serveApk(request, resolveApk(url.pathname));
  },
};

async function serveApk(request, ghUrl) {
  if (!ghUrl) return new Response("Not found\n", { status: 404 });

  const upstream = await fetch(ghUrl, {
    method: "GET",
    redirect: "follow",
    cf: { cacheEverything: true, cacheTtl: 300 },
  });
  if (upstream.status === 404) return new Response("Not found\n", { status: 404 });
  if (!upstream.ok) return new Response(`Upstream ${upstream.status}\n`, { status: 502 });

  const h = new Headers();
  h.set("content-type", APK_CT);
  const cl = upstream.headers.get("content-length");
  if (cl) h.set("content-length", cl);
  h.set("content-disposition", `attachment; filename="${ASSET}"`);
  h.set("cache-control", "public, max-age=300");
  h.set("access-control-allow-origin", "*");
  h.set("x-agentpod-source", ghUrl);

  if (request.method === "HEAD") return new Response(null, { status: 200, headers: h });
  return new Response(upstream.body, { status: 200, headers: h });
}

async function serveMedia(request, { url: ghUrl, contentType }) {
  // Forward Range so <video> can seek and stream progressively rather than
  // downloading the whole file before the first frame.
  //
  // Range and Cloudflare's `cacheEverything` are mutually exclusive here:
  // combining them makes the subrequest resolve to a 404, so ranged reads
  // deliberately bypass the edge cache and go straight to the origin. The
  // uncached path is the rare one (seeks); first/full loads still get cached.
  const range = request.headers.get("range");
  const upstream = await fetch(ghUrl, {
    method: "GET",
    redirect: "follow",
    headers: range ? { range } : {},
    // The release tag is immutable, so a long edge TTL is safe and keeps
    // repeat plays off the origin entirely.
    ...(range ? {} : { cf: { cacheEverything: true, cacheTtl: 604800 } }),
  });
  if (upstream.status === 404) return new Response("Not found\n", { status: 404 });
  if (!upstream.ok && upstream.status !== 206) {
    return new Response(`Upstream ${upstream.status}\n`, { status: 502 });
  }

  const h = new Headers();
  h.set("content-type", contentType);
  // Deliberately NO content-disposition: these must play inline, not download.
  h.set("cache-control", "public, max-age=31536000, immutable");
  h.set("accept-ranges", "bytes");
  h.set("access-control-allow-origin", "*");
  h.set("x-media-source", ghUrl);
  for (const k of ["content-length", "content-range", "etag", "last-modified"]) {
    const v = upstream.headers.get(k);
    if (v) h.set(k, v);
  }

  if (request.method === "HEAD") {
    return new Response(null, { status: upstream.status, headers: h });
  }
  return new Response(upstream.body, { status: upstream.status, headers: h });
}
