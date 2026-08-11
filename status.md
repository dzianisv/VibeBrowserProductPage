ROADMAP  ████████████████████  5/5 done
 [x] 1. Grep site for ChatGPT OAuth over-claim (found 2: /mcp, /integrations)
 [x] 2. Correct wording + single-source it via ConnectorStatus in lib/integrations.ts
 [x] 3. Audit sibling claims (relay OAuth scopes, npm versions, domain-verification) — all true
 [x] 4. Guard test wired into npm test / root-site CI; proved it fails on regression
 [x] 5. PR #228 merged, Vercel deploy green, live grep verified

WHY SLOW
 - not slow; single pass, CI ~1m40s

NEXT
 - none; founder can post the launch announcement
