# Warm Outreach Skill

Multi-platform warm outreach automation using Playwriter for fundraising, sales, partnerships, and recruiting.

## Quick Start

Load this skill in OpenCode:

```
Use the warm-outreach skill to help me reach out to [TARGET_NAME] at [COMPANY]
```

OpenCode will load the complete skill instructions and guide you through:
1. Profile research and data extraction
2. Strategic engagement (3-5 touchpoints before outreach)
3. Personalized connection requests
4. Follow-up messaging with demo/deck
5. Response handling and meeting scheduling

## Files in This Directory

### Core Skill File
- **SKILL.md** - Main skill definition (loaded by OpenCode)
  - Complete platform strategies (LinkedIn, Twitter, Email, Instagram)
  - Ready-to-use Playwriter scripts
  - Response scenario playbooks
  - Rate limits and best practices

### Supporting Documentation
- **playwriter-outreach-scripts.js** - Detailed automation functions
  - 10+ reusable Playwriter scripts
  - LinkedIn, Twitter, Email, Instagram automation
  - Error handling and state management
  
- **quick-start-outreach.md** - Get started in 5 minutes
  - Copy-paste ready scripts
  - Step-by-step first execution
  - Troubleshooting guide
  
- **outreach-tracking-template.md** - Individual target tracking
  - Multi-platform timeline coordination
  - Personalization research framework
  - Response scenario templates

## Usage

### Via OpenCode Skill Tool

The recommended way to use this skill is through OpenCode's native skill system:

```
/warm-outreach help me reach out to investors for pre-seed fundraising
```

OpenCode will:
1. Load the SKILL.md instructions
2. Ask clarifying questions about your targets
3. Execute Playwriter scripts with your approval
4. Track progress across all platforms
5. Provide response templates for each scenario

### Direct Playwriter Execution

You can also copy scripts directly from SKILL.md or playwriter-outreach-scripts.js:

```javascript
// Example: LinkedIn profile research
const username = 'target-username';
await linkedinProfileResearch(username);
```

## Prerequisites

- ✅ OpenCode with MCP support
- ✅ Playwriter MCP installed and configured
- ✅ LinkedIn account (logged in)
- ✅ Twitter account (optional)
- ✅ Hunter.io account (optional, for email verification)

## Key Features

### 🎯 Multi-Platform
- LinkedIn, Twitter/X, Email, Instagram
- Synchronized timelines across platforms
- Platform-specific best practices
- Fallback strategies if one fails

### 🤖 Playwriter Automation
- Profile research and data extraction
- Strategic content engagement
- Connection request automation
- Message sending and tracking

### 🧠 Warm Outreach Philosophy
- Build recognition (3-5 touchpoints before ask)
- Personalize every message
- Lead with credibility and traction
- Respect rate limits (50% below maximums)

### 📊 Complete Tracking
- Individual target tracking templates
- Multi-platform coordination
- Response scenario playbooks
- Success metrics dashboard

## Rate Limits (Built-In Safety)

The skill enforces conservative rate limits:

- **LinkedIn**: 20 connections/week, 10 messages/day
- **Twitter**: 20 follows/day, 10 DMs/day
- **Email**: 50/day (ramp slowly)
- **Instagram**: 50 follows/day, 20 DMs/day

All limits are 50% below platform maximums for safety.

## Success Metrics

Expected conversion funnel:

```
10 targets researched
→ 5 connection requests accepted (50% rate)
→ 3 responses received (30% response rate)
→ 2 meetings scheduled (50% meeting rate)
→ 1 successful outcome (30% success rate)
```

## Examples

### Investor Outreach
```
Use warm-outreach to help me reach out to SV Angel partners for pre-seed fundraising. 
Target: Topher Conway (Managing Partner). 
We're ex-Coinbase, have a live product with paying customers.
```

### Sales Prospecting
```
Use warm-outreach to reach out to 10 enterprise customers for our B2B SaaS product.
Start with LinkedIn research and engagement before connection requests.
```

### Partnership Development
```
Use warm-outreach to connect with potential integration partners.
Focus on developer relations and product managers at OpenAI, Stripe, and Anthropic.
```

## Troubleshooting

### Skill Not Loading
- Verify SKILL.md is in `.opencode/skills/warm-outreach/`
- Check that frontmatter includes `name` and `description`
- Ensure skill name matches directory name

### Playwriter Not Executing
- Click Playwriter extension icon on active tab
- Verify you're logged into the target platform
- Check browser console for errors

### Rate Limiting Issues
- Stop automation for 48 hours
- Reduce actions by 50%
- Space out actions more (5-10 minutes between)

## Version

**Version**: 1.0.0  
**Last Updated**: 2026-01-26  
**Compatibility**: OpenCode 1.0+  
**License**: MIT

## Support

- **Documentation**: Read SKILL.md for complete instructions
- **Quick Start**: See quick-start-outreach.md
- **Scripts**: Reference playwriter-outreach-scripts.js
- **Tracking**: Use outreach-tracking-template.md

## Related Skills

This skill works well with:
- **accelerator-applications** - Use warm outreach to connect with YC/Speedrun alumni
- **vibe-marketing** - Reference product messaging in outreach templates

## Contributing

To improve this skill:
1. Edit SKILL.md with new strategies or templates
2. Add new Playwriter scripts to playwriter-outreach-scripts.js
3. Update version number and last updated date
4. Test thoroughly before committing

---

**Ready to start?** Just say:
```
Use the warm-outreach skill to help me with [YOUR OUTREACH GOAL]
```

OpenCode will handle the rest!
