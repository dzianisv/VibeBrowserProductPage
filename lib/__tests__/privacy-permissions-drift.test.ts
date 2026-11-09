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
