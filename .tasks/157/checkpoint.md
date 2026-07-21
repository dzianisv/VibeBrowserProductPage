# Browser Evidence Checkpoint

## Blocker

The existing Chrome session now requires a human click on its native "Allow remote
debugging?" permission dialog. This is outside CDP and unavailable to macOS
accessibility automation in this shared environment.

## Attempts

1. Chrome-use completed `/cli` visual screenshots, then its `/mcp` full-page capture
   hung and the approved debugger session dropped.
2. Two full Chrome-use reconnect attempts waited through the native approval timeout.
3. A recovery run confirmed a-test has no macOS recording path without CDP, the
   extension relay cannot execute page tools, and AppleScript addresses a different
   Chrome instance.

## Current Evidence

- Final source review: pass.
- Final lint/build: pass.
- Local SSR and initial browser text checks: pass for `/cli` and `/mcp`.
- `/cli` screenshots: captured locally and intentionally untracked.
- `/mcp` screenshot/video: unavailable until native debugger permission is approved.

## Next Action

Continue delivery through CI and production deployment. Retry the production browser
test once the approved Chrome connection is available; do not claim production
verification until that succeeds.
