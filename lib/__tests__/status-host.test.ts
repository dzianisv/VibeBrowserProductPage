import { test, describe } from 'node:test'
import assert from 'node:assert/strict'

import { statusHostRewritePath } from '../status-host.ts'

describe('statusHostRewritePath', () => {
  test('status host root rewrites to the existing /status page', () => {
    assert.equal(statusHostRewritePath('status.vibebrowser.app', '/'), '/status')
  })

  test('status host with a port still rewrites only the root', () => {
    assert.equal(statusHostRewritePath('status.vibebrowser.app:443', '/'), '/status')
  })

  test('does not rewrite /status or /status.json (www freshness-check stays valid)', () => {
    assert.equal(statusHostRewritePath('status.vibebrowser.app', '/status'), null)
    assert.equal(statusHostRewritePath('status.vibebrowser.app', '/status.json'), null)
    assert.equal(statusHostRewritePath('www.vibebrowser.app', '/'), null)
    assert.equal(statusHostRewritePath('www.vibebrowser.app', '/status'), null)
    assert.equal(statusHostRewritePath('www.vibebrowser.app', '/status.json'), null)
    assert.equal(statusHostRewritePath('vibebrowser.app', '/'), null)
    assert.equal(statusHostRewritePath('enterprise.vibebrowser.app', '/'), null)
  })
})
