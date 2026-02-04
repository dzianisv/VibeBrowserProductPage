# OpenCode Skills

Custom skills for Vibe Browser development and operations.

## Available Skills

### 1. warm-outreach

**Status**: ✅ Production Ready  
**Version**: 1.0.0

Multi-platform warm outreach automation using Playwriter for fundraising, sales, partnerships, and recruiting.

**Usage:**
```
Use the warm-outreach skill to help me reach out to [TARGET] for [PURPOSE]
```

**What it does:**
- Automates LinkedIn, Twitter, Email, and Instagram outreach
- Builds recognition through strategic engagement (3-5 touchpoints)
- Executes personalized connection requests and messages
- Tracks progress systematically across all platforms
- Respects rate limits (50% below maximums for safety)

**When to use:**
- Fundraising (investor outreach)
- Sales prospecting (B2B)
- Partnership development
- Recruiting talent
- Community building

**Documentation:** [.opencode/skills/warm-outreach/](./warm-outreach/)

---

## Using Skills

### Load a Skill

OpenCode will automatically discover skills in this directory. To use a skill:

```
Use the [skill-name] skill to [what you want to do]
```

Example:
```
Use the warm-outreach skill to help me reach out to SV Angel partners for pre-seed fundraising
```

### Skill Discovery

OpenCode searches for skills in:
- `.opencode/skills/*/SKILL.md` (project-local)
- `~/.config/opencode/skills/*/SKILL.md` (global)

Each skill must:
1. Be in its own directory (e.g., `warm-outreach/`)
2. Have a `SKILL.md` file with valid frontmatter
3. Have a unique name (lowercase alphanumeric with hyphens)

### Skill Permissions

Control skill access in `.opencode/config.json`:

```json
{
  "permission": {
    "skill": {
      "*": "allow",
      "warm-outreach": "allow",
      "experimental-*": "ask"
    }
  }
}
```

- `allow` - Skill loads immediately
- `deny` - Skill hidden from agent
- `ask` - User prompted before loading

---

## Creating New Skills

### 1. Create Skill Directory

```bash
mkdir -p .opencode/skills/my-skill
```

### 2. Create SKILL.md

```markdown
---
name: my-skill
description: Brief description of what this skill does (1-1024 chars)
license: MIT
compatibility: opencode
metadata:
  version: "1.0.0"
  author: "Your Name"
---

# My Skill

## What I do

- [Key capability 1]
- [Key capability 2]
- [Key capability 3]

## When to use me

Use this skill when you need to [describe use case].

[Detailed instructions, scripts, templates, examples...]
```

### 3. Add Supporting Files

```
.opencode/skills/my-skill/
├── SKILL.md           # Main skill definition (required)
├── README.md          # Skill documentation
├── scripts.js         # Automation scripts
└── templates/         # Templates and examples
```

### 4. Test the Skill

```
Use the my-skill skill to [test scenario]
```

---

## Skill Best Practices

### Naming
- Use lowercase alphanumeric with hyphens
- 1-64 characters
- No leading/trailing hyphens
- No consecutive hyphens (`--`)
- Match directory name exactly

**Good:** `warm-outreach`, `git-release`, `pr-review`  
**Bad:** `WarmOutreach`, `warm_outreach`, `warm--outreach`

### Description
- 1-1024 characters
- Specific enough for agent to choose correctly
- Focus on what the skill does, not how

**Good:** "Execute warm, personalized outreach across LinkedIn, Twitter/X, Email, and Instagram"  
**Bad:** "Help with social media stuff"

### Frontmatter
Required fields:
- `name` - Skill identifier (matches directory)
- `description` - What the skill does

Optional fields:
- `license` - Software license (MIT, Apache-2.0, etc.)
- `compatibility` - Platform compatibility (opencode, claude, etc.)
- `metadata` - String-to-string map for custom data

### Content Structure
Organize SKILL.md with clear sections:

1. **What I do** - Key capabilities (bullet list)
2. **When to use me** - Use cases and scenarios
3. **How I work** - Step-by-step workflows
4. **Examples** - Real-world usage examples
5. **Templates** - Copy-paste ready code/text
6. **Troubleshooting** - Common issues and fixes

---

## Skill Development Workflow

### 1. Plan
- Define clear use case
- Identify prerequisites
- List success metrics

### 2. Document
- Write SKILL.md with frontmatter
- Include step-by-step instructions
- Add copy-paste ready examples

### 3. Test
- Load skill via OpenCode
- Test on real scenarios
- Verify agent can follow instructions

### 4. Iterate
- Gather feedback
- Refine instructions
- Add more examples

### 5. Share
- Document in this README
- Add to project skills directory
- Create pull request if team skill

---

## Troubleshooting

### Skill Not Loading

**Check:**
1. SKILL.md is spelled in all caps
2. Frontmatter includes `name` and `description`
3. Skill name matches directory name
4. Skill name is unique across all locations
5. No permission set to `deny`

**Debug:**
```bash
# Verify file exists
ls -la .opencode/skills/*/SKILL.md

# Check frontmatter
head -n 10 .opencode/skills/warm-outreach/SKILL.md
```

### Skill Loads But Doesn't Work

**Check:**
1. Instructions are clear and specific
2. Examples are copy-paste ready
3. Prerequisites are met (tools, accounts, etc.)
4. Agent has necessary permissions

**Debug:**
- Ask agent to explain what the skill should do
- Test individual script snippets manually
- Verify external tools are working (Playwriter, etc.)

### Permission Denied

**Check:**
```json
// In .opencode/config.json
{
  "permission": {
    "skill": {
      "my-skill": "allow"  // or "ask"
    }
  }
}
```

---

## Planned Skills

Future skills for Vibe Browser:

- [ ] **accelerator-applications** - YC/Speedrun application automation
- [ ] **competitor-research** - Automated competitive analysis
- [ ] **content-marketing** - Multi-platform content distribution
- [ ] **customer-support** - Ticket triage and response automation
- [ ] **social-media** - Cross-platform posting and engagement

**Suggest a skill:** Open GitHub issue with "skill-request" label

---

## Resources

### Documentation
- [OpenCode Skills Docs](https://opencode.ai/docs/skills/)
- [Skill Permissions](https://opencode.ai/docs/permissions/)
- [Custom Tools](https://opencode.ai/docs/custom-tools/)

### Examples
- [warm-outreach](./warm-outreach/SKILL.md) - Multi-platform outreach automation
- [OpenCode GitHub](https://github.com/anomalyco/opencode) - Community examples

### Tools
- [Playwriter MCP](https://playwriter.dev) - Browser automation
- [MCP Documentation](https://modelcontextprotocol.io) - Model Context Protocol

---

## Version History

### v1.0.0 (2026-01-26)
- Added warm-outreach skill (v1.0.0)
- Created skills directory structure
- Documented skill creation process

---

## Support

**Issues:** Open GitHub issue or contact team  
**Requests:** Suggest new skills via GitHub  
**Contributing:** Fork, create skill, submit PR

---

**Total Skills:** 1 production-ready, 5+ planned

**Last Updated:** 2026-01-26
