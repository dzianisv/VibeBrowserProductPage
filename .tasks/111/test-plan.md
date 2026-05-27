## Modality
Real feature test against running production builds for both apps (no mocks).

## Setup
1. Build root app: `npm run build`
2. Build AgentLabs app: `npm run build` in `apps/agentlabs`
3. Start root app on `http://127.0.0.1:3400`
4. Start AgentLabs app on `http://127.0.0.1:3401`

## Steps
1. Request root `/aboutus`, `/blog`, and one known blog slug route; assert `200` and expected markers in HTML.
2. Request AgentLabs `/`, `/blog`, and same blog slug route; assert `200` and expected markers in HTML.
3. Request root `/` and assert curated `#ainativecompany` section text exists.
4. Verify docs/reference updates by checking file content for Spaceship + domain zone and AGENTS link to doc.

## Pass criterion
- Both apps serve About + Blog routes successfully with expected content markers.
- Main page renders AI-native links block.
- Domain docs/reference changes are present.
