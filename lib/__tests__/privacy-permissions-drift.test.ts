import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const PRIVACY_POLICY = readFileSync(new URL('../../privacy-policy.tsx', import.meta.url), 'utf8')
const TERMS_OF_SERVICE = readFileSync(new URL('../../terms-of-service.tsx', import.meta.url), 'utf8')

// Pinned from VibeWebAgent manifest.extension.json — manifest order, 16 permissions.
const EXPECTED_PERMISSIONS = [
  'activeTab',
  'alarms',
  'audioCapture',
  'cookies',
  'debugger',
  'history',
  'identity',
  'offscreen',
  'scripting',
  'sidePanel',
  'storage',
  'tabGroups',
  'tabs',
  'unlimitedStorage',
  'webNavigation',
  'webRequest',
]

const HOST_PERMISSION_ENTRY =
  '<p className="font-medium">Host Permissions (&lt;all_urls&gt;)</p>'

function browserPermissionsSection(html: string): string {
  const start = html.indexOf('<h2 className="text-xl font-semibold mb-4">Browser Permissions</h2>')
  assert.ok(start !== -1, 'expected "Browser Permissions" section in privacy-policy.tsx')
  const end = html.indexOf('</section>', start)
  assert.ok(end !== -1, 'expected closing </section> for the Browser Permissions section')
  return html.slice(start, end)
}

function permissionNames(section: string): string[] {
  const names: string[] = []
  const nameRe = /<p className="font-medium">([^<]+)<\/p>/g
  let match
  while ((match = nameRe.exec(section)) !== null) {
    names.push(match[1])
  }
  return names
}

test('privacy-policy Browser Permissions lists exactly the 16 manifest permissions in manifest order', () => {
  const section = browserPermissionsSection(PRIVACY_POLICY)
  // Host Permissions (<all_urls>) is asserted separately; it is not one of the 16.
  const names = permissionNames(section).filter((name) => !name.startsWith('Host Permissions'))
  assert.deepEqual(names, EXPECTED_PERMISSIONS)
})

test('privacy-policy declares Host Permissions (<all_urls>) as a separate entry outside the 16', () => {
  assert.ok(PRIVACY_POLICY.includes(HOST_PERMISSION_ENTRY), 'missing Host Permissions (<all_urls>) entry')
})

test('neither privacy-policy.tsx nor terms-of-service.tsx claims bookmarks', () => {
  assert.equal(PRIVACY_POLICY.includes('bookmarks'), false, 'bookmarks found in privacy-policy.tsx')
  assert.equal(TERMS_OF_SERVICE.includes('bookmarks'), false, 'bookmarks found in terms-of-service.tsx')
})

// Extract permission descriptions into a map: name -> description (HTML-decoded)
function extractDescriptions(section: string): Map<string, string> {
  const descriptions = new Map<string, string>()
  // Match entry divs containing font-medium name + text-sm description
  const entryRe = /<div className="border-l-4 border-purple-500 pl-4">\s*<p className="font-medium">([^<]+)<\/p>\s*<p className="text-sm text-muted-foreground">([^<]*(?:&apos;[^<]*)*)<\/p>\s*<\/div>/g
  let match
  while ((match = entryRe.exec(section)) !== null) {
    const name = match[1]
    const rawDesc = match[2]
    // Decode &apos; to real apostrophe for comparison
    const decodedDesc = rawDesc.replace(/&apos;/g, "'")
    descriptions.set(name, decodedDesc)
  }
  return descriptions
}

test('audioCapture description must contain the full code-true disclosure', () => {
  const section = browserPermissionsSection(PRIVACY_POLICY)
  const descriptions = extractDescriptions(section)
  const actual = descriptions.get('audioCapture')
  const expected = "Trigger Chrome's microphone prompt for voice input; live microphone audio is streamed to the browser's speech-recognition service and the resulting transcript is sent to your selected model provider"
  assert.equal(actual, expected, 'audioCapture description mismatch')
})

test('audioCapture description must mention microphone AND transcript', () => {
  const section = browserPermissionsSection(PRIVACY_POLICY)
  const descriptions = extractDescriptions(section)
  const actual = descriptions.get('audioCapture')
  assert.ok(actual, 'audioCapture description not found')
  assert.ok(actual!.toLowerCase().includes('microphone'), 'audioCapture description missing "microphone"')
  assert.ok(actual!.toLowerCase().includes('transcript'), 'audioCapture description missing "transcript"')
})

test('history description must match PR #2306 canonical wording', () => {
  const section = browserPermissionsSection(PRIVACY_POLICY)
  const descriptions = extractDescriptions(section)
  const actual = descriptions.get('history')
  const expected = 'Read recent browsing history to generate personalized suggestions'
  assert.equal(actual, expected, 'history description mismatch')
})

test('webRequest description must match PR #2306 canonical wording', () => {
  const section = browserPermissionsSection(PRIVACY_POLICY)
  const descriptions = extractDescriptions(section)
  const actual = descriptions.get('webRequest')
  const expected = 'Observe network requests and response headers while an agent task runs or an MCP client is connected'
  assert.equal(actual, expected, 'webRequest description mismatch')
})
