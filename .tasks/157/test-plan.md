# Real Feature Test Plan

## Modality

Build validation followed by Chrome testing against the public documentation routes.

## Local Checks

1. Run lint and production build from the assembled delivery branch.
2. Serve the production build locally and use the existing Chrome session to open
   `/cli` and `/mcp`.
3. Confirm visible settings path, endpoint/relay command blocks, and no rendered
   credential beyond placeholders.

## Production Checks

1. Merge only after GitHub Actions deployment passes.
2. In a fresh browser tab open `https://www.vibebrowser.app/cli` and verify the
   remote relay diagram, actual extension-control path, and safe remote command.
3. Open `https://www.vibebrowser.app/mcp` and verify the direct endpoint,
   `X-Remote-Session` configuration, local-vs-remote distinction, and current UI path.
4. Capture video and screenshots of the full visible check.

## Pass Criterion

Both live routes visibly provide the copyable, accurate setup flows specified by
`success.md`; neither route exposes a real relay credential.
