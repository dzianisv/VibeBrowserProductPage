# Validation Plan

## Local

1. Typecheck, lint, and production build.
2. Open both built routes and confirm route-specific visible copy/config blocks.
3. Confirm no UUID pattern beyond placeholders and no remote credential in output.

## Production

1. `/mcp`: verify endpoint, agent cards, `X-Remote-Session`, privacy link, and no
   local stdio command as the primary setup.
2. `/mcp-stdio`: verify local command/config setup, explicit no-internet-relay message,
   and link back to remote setup.
3. Use real Chrome with a-test evidence for both routes after deployment.

## Pass Criterion

The production route split provides correct, usable remote and local MCP setup without
exposing a real browser-control credential.
