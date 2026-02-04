---
name: warm-outreach
description: Execute warm, personalized outreach across LinkedIn, Twitter/X, Email, and Instagram using Playwriter browser automation for fundraising, sales, partnerships, and recruiting
license: MIT
compatibility: opencode
metadata:
  version: "1.0.0"
  author: "Vibe Browser Team"
  platforms: "linkedin,twitter,email,instagram"
  requires: "playwriter-mcp"
  use-case: "fundraising,sales,partnerships,recruiting"
---

# Warm Outreach Skill

## What I do

- Automate multi-platform outreach across LinkedIn, Twitter/X, Email, and Instagram
- Build recognition through strategic engagement before direct outreach (3-5 touchpoints)
- Execute personalized connection requests and messages with proven templates
- Track progress systematically across all platforms
- Respect rate limits and platform guidelines (50% below maximums for safety)
- Provide response scenario playbooks for every situation

## When to use me

Use this skill when you need to:
- **Raise funding**: Reach out to investors (VCs, angels) with warm introductions
- **Close sales**: B2B prospecting with personalized multi-touch campaigns
- **Build partnerships**: Connect with potential partners through mutual interests
- **Recruit talent**: Engage candidates with thoughtful, professional outreach
- **Grow community**: Build relationships with influencers and thought leaders

**Do NOT use this skill for**:
- Mass cold emailing or spam campaigns
- Aggressive sales tactics without personalization
- Bypassing platform terms of service
- Any outreach that violates recipient privacy

## Core Strategy: Warm Before Ask

### The 3-Phase Approach

**Phase 1: Research (Day 1)**
- Extract profile data (background, interests, recent activity)
- Identify common ground (mutual connections, shared experiences)
- Find personalization angles (recent posts, work, achievements)
- Take notes for genuine personalization

**Phase 2: Build Recognition (Days 2-5)**
- Like 3-5 recent posts/tweets (spaced out, not all at once)
- Comment thoughtfully on 1-2 posts (add value, not "Great post!")
- Retweet with insightful commentary (Twitter)
- Share their content with your network
- Become recognizable before direct outreach

**Phase 3: Direct Outreach (Days 5-8)**
- Send personalized connection request (LinkedIn: 300 chars, Twitter: 280 chars)
- Reference specific common ground or recent activity
- Lead with credibility (ex-Company, live product, traction)
- Make ask clear and low-friction (15-min demo, not 1-hour commitment)
- Include demo link or relevant resource

**Phase 4: Follow-Up (Days 10-15)**
- If connected: Send thoughtful follow-up with demo/deck
- If no response: ONE follow-up with new milestone/update
- If rejected: Thank graciously, ask for intro to someone else
- If meeting scheduled: Prepare demo, send calendar invite

## Platform-Specific Workflows

### LinkedIn Outreach

**Timeline:**
- Day 1: Profile research → Extract name, headline, company, recent posts
- Day 2-3: Like 3 recent posts → Space out over 2 days, not all at once
- Day 4: Comment on 1 post → Thoughtful insight, not generic praise
- Day 5: Send connection request → 300-char personalized note
- Day 7: Check if accepted → Wait 48 hours for response
- Day 8: Send follow-up message → Include demo link and deck

**Playwriter Scripts:**

```javascript
// 1. Research profile
state.linkedinTargets = state.linkedinTargets || [];
const username = 'LINKEDIN_USERNAME';

await page.goto(`https://www.linkedin.com/in/${username}/`, { 
  waitUntil: 'domcontentloaded' 
});
await page.waitForLoadState('networkidle');

const profileData = await page.evaluate(() => {
  const getText = (selector) => {
    const el = document.querySelector(selector);
    return el ? el.innerText.trim() : '';
  };
  return {
    name: getText('h1.text-heading-xlarge'),
    headline: getText('.text-body-medium.break-words'),
    company: getText('.inline-show-more-text--CAREER-COMPANY-NAME'),
    location: getText('.text-body-small.inline.t-black--light')
  };
});

console.log('Profile:', JSON.stringify(profileData, null, 2));
state.linkedinTargets.push({ username, profileData, timestamp: new Date().toISOString() });

// 2. Like recent posts (Days 2-4)
await page.goto(`https://www.linkedin.com/in/${username}/recent-activity/all/`, {
  waitUntil: 'domcontentloaded'
});
await page.waitForLoadState('networkidle');

const posts = await page.locator('.feed-shared-update-v2').all();
for (let i = 0; i < Math.min(3, posts.length); i++) {
  const likeButton = posts[i].locator('button[aria-label*="Like"]').first();
  const ariaPressed = await likeButton.getAttribute('aria-pressed');
  if (ariaPressed !== 'true') {
    await likeButton.click();
    console.log(`✅ Liked post ${i + 1}`);
    await page.waitForTimeout(3000); // Human-like delay
  }
}

// 3. Send connection request (Day 5)
const message = `Hi [Name] - [CREDIBILITY]. [PRODUCT ONE-LINER]. [TRACTION]. Would love to connect and [ASK].`;

await page.goto(`https://www.linkedin.com/in/${username}/`, {
  waitUntil: 'domcontentloaded'
});
await page.waitForLoadState('networkidle');

await page.click('button:has-text("Connect")');
await page.waitForSelector('button[aria-label*="Add a note"]');
await page.click('button[aria-label*="Add a note"]');
await page.waitForSelector('textarea[name="message"]');
await page.fill('textarea[name="message"]', message);
await page.click('button[aria-label="Send now"]');

console.log('✅ Connection request sent');
```

**Connection Request Template (300 chars max):**
```
Hi [First Name] - [COMMON GROUND: ex-Coinbase, mutual connection, saw your post about X]. 

[PRODUCT]: [ONE-SENTENCE DESCRIPTION]. [TRACTION: Live with paying customers]. 

Would love to connect and [ASK: get your thoughts / learn from your experience].
```

**Follow-Up Message Template:**
```
Thanks for connecting, [First Name]!

[REFERENCE SPECIFIC POST/WORK - shows you did research]

[2-3 SENTENCES ABOUT PRODUCT]:
• [Key differentiator 1]
• [Key differentiator 2]  
• [Key differentiator 3]

[TRACTION]: Live on Chrome Store, early paying customers, ex-[Company] team.

[MARKET VALIDATION]: [Competitor] → [Acquirer] for $XB validates space.

[FUNDRAISING STATUS]: Raising $X-Y pre-seed. [PORTFOLIO FIT].

Would you be open to a 15-min demo?

Demo: [LINK]
Deck: [LINK]
```

### Twitter/X Outreach

**Timeline:**
- Day 1: Follow → Research profile, follow account
- Day 1-2: Like 5 tweets → Space out over 2 days
- Day 3: Retweet with commentary → Add thoughtful insight
- Day 4: Reply to 1-2 tweets → Provide value, not salesy
- Day 5: Send DM → Under 280 chars, concise and compelling
- Day 12: Follow-up DM → If no response, add milestone

**Playwriter Scripts:**

```javascript
// 1. Follow and research
const username = 'TWITTER_USERNAME'; // without @

await page.goto(`https://twitter.com/${username}`, {
  waitUntil: 'domcontentloaded'
});
await page.waitForLoadState('networkidle');

// Click Follow
try {
  await page.click('[data-testid*="follow"]');
  console.log(`✅ Followed @${username}`);
} catch (e) {
  console.log('Already following');
}

// 2. Like tweets (Days 1-2)
const tweets = await page.locator('[data-testid="tweet"]').all();
for (let i = 0; i < Math.min(5, tweets.length); i++) {
  try {
    await tweets[i].locator('[data-testid="like"]').click();
    console.log(`✅ Liked tweet ${i + 1}`);
    await page.waitForTimeout(3000);
  } catch (e) {
    console.log(`Tweet ${i + 1} already liked`);
  }
}

// 3. Send DM (Day 5)
await page.goto('https://twitter.com/messages', {
  waitUntil: 'domcontentloaded'
});
await page.click('[data-testid="NewDM_Button"]');
await page.waitForSelector('input[data-testid="searchInput"]');
await page.fill('input[data-testid="searchInput"]', username);
await page.waitForTimeout(2000);
await page.click('[data-testid="TypeaheadUser"]');
await page.click('[data-testid="nextButton"]');
await page.waitForSelector('[data-testid="dmComposerTextInput"]');

const dmMessage = `Hi [Name] - [CREDIBILITY]. Built [PRODUCT] - [ONE-LINER]. [TRACTION]. [COMMON GROUND]. [ASK]? [LINK]`;
await page.fill('[data-testid="dmComposerTextInput"]', dmMessage);
await page.click('[data-testid="dmComposerSendButton"]');

console.log('✅ Twitter DM sent');
```

**Twitter DM Template (280 chars max):**
```
Hi [Name] - [CREDIBILITY]. 

Built [PRODUCT]: [ONE-LINER]. [TRACTION]. 

[COMMON GROUND]. [ASK]? 

[LINK]
```

**Example:**
```
Hi Topher - ex-Coinbase engineer. Built Vibe Browser: AI automation for any website. Live w/ paying customers. Portfolio fit: OpenAI+Stripe+Coinbase. Quick demo? vibebrowser.app
```

### Email Outreach

**Timeline:**
- Day 1: Verify email → Use Hunter.io or similar tool
- Day 3: Send email → After LinkedIn/Twitter engagement
- Day 8: Follow-up → If no response, add milestone
- Day 15: Final follow-up → Last attempt, then move on

**Gmail Browser Automation (Recommended):**

Use Playwriter to send emails directly via Gmail web interface - no OAuth required!

```javascript
// 1. Send email directly via Gmail
const to = 'investor@vc.com';
const subject = 'Ex-Coinbase building AI browser automation';
const body = `Hi [Name],

Ex-Coinbase engineer here - saw you work with OpenAI and Stripe portfolio companies.

Built Vibe Browser: AI-powered browser automation for any website. Live on Chrome Store with early paying customers. Privacy-first (local AI), model-agnostic (GPT/Claude/Gemini).

Manus → Meta $2B and OpenAI Operator validate the space - we're the model-agnostic alternative.

Raising $100-200k pre-seed. Would you be open to a 15-min demo?

Demo: vibebrowser.app/demo.mp4
Deck: vibebrowser.app/deck

Best,
[Your Name]`;

await gmailComposeAndSend(to, subject, body);

// 2. Create draft for review before sending
await gmailCreateDraft(to, subject, body, 'cofounder@vibebrowser.com');

// 3. Search for investor emails
const emails = await gmailSearch('from:investor@vc.com');

// 4. Read specific email
await gmailReadEmail(0); // First email in results
```

**Email Verification (Hunter.io):**

```javascript
// Navigate to Hunter.io
await page.goto('https://hunter.io/email-finder', {
  waitUntil: 'domcontentloaded'
});

await page.fill('input[name="first_name"]', 'FIRST_NAME');
await page.fill('input[name="last_name"]', 'LAST_NAME');
await page.fill('input[name="domain"]', 'COMPANY.com');
await page.click('button:has-text("Find email address")');
await page.waitForSelector('.email-result', { timeout: 15000 });

const emailData = await page.evaluate(() => ({
  email: document.querySelector('.email-result')?.innerText.trim(),
  confidence: document.querySelector('.confidence-score')?.innerText.trim()
}));

console.log('Email:', emailData.email, 'Confidence:', emailData.confidence);
```

**Email Template:**

```
Subject: [CREDIBILITY HOOK - e.g., "Ex-Coinbase building AI browser automation"]

Hi [First Name],

[PARAGRAPH 1: Credibility + Common Ground - 1 sentence]
Ex-Coinbase engineer here - saw you work with OpenAI and Stripe portfolio companies.

[PARAGRAPH 2: What you're building - 2 sentences with traction]
Built Vibe Browser: AI-powered browser automation for any website. Live on Chrome Store with early paying customers. Privacy-first (local AI), model-agnostic (GPT/Claude/Gemini).

[PARAGRAPH 3: Market validation - 1 sentence]
Manus → Meta $2B and OpenAI Operator validate the space - we're the model-agnostic alternative.

[PARAGRAPH 4: Clear ask - 1 sentence]
Raising $100-200k pre-seed. Would you be open to a 15-min demo?

Demo: [LINK]
Deck: [LINK]

Best,
[Your Name]
[Title]
[LinkedIn URL]
```

**Follow-Up Email (Day 8):**

```
Subject: Re: [Original Subject]

Hi [First Name] - following up on my note about [Product].

Quick update: [NEW MILESTONE - e.g., "Just hit 50 paying customers this week"]

Still raising pre-seed if you're interested. Happy to send deck or schedule quick demo.

Best,
[Your Name]
```

### Instagram Outreach (When Applicable)

**When to Use:**
- Target is active on Instagram (posts regularly)
- Visual product that benefits from screenshots/demos
- Consumer-focused or creator economy targets

**Timeline:**
- Day 1: Research profile
- Day 2-3: Follow and like 3 posts
- Day 4: Comment on 1 post (genuine, not salesy)
- Day 6: Send DM (casual tone)

**Playwriter Script:**

```javascript
const username = 'INSTAGRAM_USERNAME';

// Navigate and follow
await page.goto(`https://www.instagram.com/${username}/`, {
  waitUntil: 'domcontentloaded'
});

try {
  await page.click('button:has-text("Follow")');
  console.log(`✅ Followed @${username}`);
  await page.waitForTimeout(2000);
} catch (e) {
  console.log('Already following');
}

// Like posts (Days 2-3)
const posts = await page.locator('article img').all();
for (let i = 0; i < Math.min(3, posts.length); i++) {
  await posts[i].click();
  await page.waitForTimeout(2000);
  await page.click('button[aria-label*="Like"]');
  console.log(`✅ Liked post ${i + 1}`);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(2000);
}
```

## Response Scenarios

### Positive Response ("Tell me more" / "Interesting")

**Action:**
1. Respond within 4 hours (shows engagement)
2. Send pitch deck immediately
3. Offer 3 specific meeting times
4. Keep response under 5 sentences
5. **Schedule meeting via Google Calendar**

**Google Calendar Automation:**

```javascript
// Schedule investor meeting directly via browser
await gcalScheduleInvestorMeeting(
  'investor@vc.com',      // Email
  'John Smith',           // Name
  '2026-02-03',          // Date
  '14:00',               // Time
  30                     // Duration in minutes
);

// Or use natural language
await gcalQuickEvent('Demo with John Smith tomorrow at 2pm for 30 minutes');

// Check your availability first
await gcalCheckAvailability('2026-02-03');

// List events for a date
await gcalListEvents('2026-02-03');

// Create custom event with details
await gcalCreateEvent(
  'Vibe Browser Demo - SV Angel',
  '2026-02-03',
  '14:00',
  '14:30',
  'Product demo and Q&A about Vibe Browser',
  'investor@svangel.com, cofounder@vibebrowser.com',
  'Google Meet'
);
```

**Template:**
```
Thanks [First Name]!

[1-2 sentences highlighting key differentiators]

Deck: [LINK]

I have these times for a 15-min demo:
• [Option 1]
• [Option 2]
• [Option 3]

Or grab time here: [CALENDAR LINK]
```

### Neutral Response ("Send me your deck")

**Action:**
1. Send deck immediately
2. Highlight 3 key points
3. Still ask for meeting
4. Include demo link

**Template:**
```
Here you go: [DECK LINK]

Key highlights:
• [Traction - e.g., "Live product with paying customers"]
• [Technical moat - e.g., "Privacy-first local AI"]
• [Market validation - e.g., "Manus→$2B validates space"]

Would love 15 min to demo live if interested. Worth a quick call?

Demo: [LINK]
```

### Negative Response ("Not interested" / "Not a fit")

**Action:**
1. Thank them professionally
2. Ask for intro to someone else
3. Keep door open for future
4. Stay gracious

**Template:**
```
No worries, appreciate you taking a look!

Would you be open to introducing us to another investor who might be a better fit? Happy to send a forwardable blurb.

Thanks again, and hope we can stay in touch!
```

### No Response (After 5-7 Days)

**Action:**
1. Send ONE follow-up
2. Add new information (milestone update)
3. Keep shorter than original
4. Make it easy to respond

**Template:**
```
Hi [First Name] - following up!

Quick update: [NEW MILESTONE]

Still raising pre-seed if interested. Demo: [LINK]
```

### No Response After Second Follow-Up

**Action:**
1. Move on to next target
2. Try different platform (LinkedIn → Twitter → Email)
3. Revisit in 30-60 days with major milestone
4. Focus on warm intros instead

## Rate Limits & Safety

### LinkedIn (Safe Limits)
- Connection requests: **20/week** (platform max: 100/week)
- Messages: **10/day** (platform max: 50/day)
- Profile views: **40/day** (platform max: 80/day)
- Timing: Tuesday-Thursday, 9am-11am or 1pm-3pm local time

### Twitter/X
- Follows: **20/day** (platform max: 400/day)
- DMs: **10/day** (platform max: 500/day)
- Likes: **20/day** (platform max: 2,400/day)
- Timing: Tuesday-Friday, 10am-2pm PT

### Email
- Cold emails: **50/day** (ramp slowly: 10/day week 1, 20/day week 2, etc.)
- Bounce rate: Keep under **5%** (critical for domain reputation)
- Timing: Tuesday-Thursday, 10am-2pm recipient's timezone

### Instagram
- Follows: **50/day** (platform max: 200/day)
- Likes: **100/day** (platform max: 350/day)
- DMs: **20/day** (platform max: 50-80/day)
- Timing: 11am-1pm or 7pm-9pm local time

**Human-like delays:**
- Between actions: 2-5 seconds
- Between targets: 3-5 minutes
- Between days: Vary timing by 30-60 minutes

## Tracking System

### Create Individual Target Tracking

For each target, create `/product/docs/outreach/[name]-tracking.md`:

```markdown
# [Name] - [Company] Outreach Tracking

**Company:** [COMPANY]
**Role:** [TITLE]
**Priority:** ⭐⭐⭐ [HIGH/MEDIUM/LOW]

## Contact Information
- LinkedIn: linkedin.com/in/[username]
- Twitter: @[username]
- Email: [email] (verified: YES/NO)

## Personalization Research
- Background: [Key career history]
- Recent activity: [Recent posts/tweets]
- Common ground: [Shared connections, experiences]

## LinkedIn Timeline
| Date | Action | Status | Notes |
|------|--------|--------|-------|
| Day 1 | Profile research | ⬜ | |
| Day 2-3 | Liked 3 posts | ⬜ | |
| Day 4 | Commented on post | ⬜ | |
| Day 5 | Connection request | ⬜ | |
| Day 8 | Follow-up message | ⬜ | |

## Twitter Timeline
| Date | Action | Status | Notes |
|------|--------|--------|-------|
| Day 1 | Followed | ⬜ | |
| Day 1-2 | Liked 5 tweets | ⬜ | |
| Day 5 | DM sent | ⬜ | |

## Success Metrics
- [ ] Connection request accepted
- [ ] Response received
- [ ] Meeting scheduled
- [ ] Demo completed
```

### Weekly Goals

**Week 1:**
- 10 profiles researched
- 30-50 engagement actions (likes, comments)
- 10 connection requests sent
- 5-10 emails verified

**Week 2:**
- 5 connections accepted
- 3 DM responses
- 2 email responses
- 1-2 meetings scheduled

**Week 3-4:**
- 3-5 meetings completed
- 1-2 second meetings
- 1 successful outcome (funding, partnership, hire)

## Best Practices

### DO:
✅ Research before outreach (10-15 min per person)
✅ Engage 3-5 times before direct outreach
✅ Personalize every message (reference specific posts/work)
✅ Lead with credibility and traction
✅ Make asks clear and low-friction
✅ Follow up once (5-7 days), then move on
✅ Track everything systematically
✅ Test multiple platforms
✅ Respect rate limits

### DON'T:
❌ Send cold messages without engagement
❌ Use generic templates without personalization
❌ Spam multiple messages simultaneously
❌ Send long messages (respect character limits)
❌ Follow up more than once per platform
❌ Give up after one channel
❌ Be pushy or aggressive
❌ Ignore responses (reply within 4 hours)

## Troubleshooting

### LinkedIn Account Restricted
**Cause:** Too many connections/messages
**Solution:**
1. Stop automation for 48 hours
2. Reduce to 5 connections/day when resumed
3. Focus on Twitter and email

### Twitter Account Suspended
**Cause:** Rapid follows/DMs flagged as spam
**Solution:**
1. Appeal suspension immediately
2. Reduce to 5 actions/day after reinstatement
3. Wait 72 hours between DMs

### Emails Bouncing (>5% rate)
**Cause:** Invalid emails or poor domain reputation
**Solution:**
1. Stop sending immediately
2. Re-verify all addresses (Hunter.io)
3. Warm up domain with personal emails

### No Responses After 2 Weeks
**Cause:** Message not compelling or wrong timing
**Solution:**
1. Review and improve templates
2. Test different hooks/subject lines
3. Seek warm intros instead
4. Pivot to different targets

## Real-World Example: Investor Outreach

### Target: SV Angel Managing Partner

**Day 1 - Research:**
```javascript
await linkedinProfileResearch('topherc');
// Output: Managing Partner at SV Angel, works with OpenAI/Stripe/Coinbase
```

**Day 2-4 - Engage:**
```javascript
await linkedinEngagePosts('topherc', 3);
// Liked 3 posts about AI agents, portfolio companies
```

**Day 5 - Connect:**
```javascript
const message = "Hi Topher - ex-Coinbase engineer here, saw you work with OpenAI, Stripe, and Coinbase. Built Vibe Browser: AI automation for any website. Live on Chrome Store with paying customers. Would love to connect and get your thoughts on the space.";
await linkedinSendConnectionRequest('topherc', message);
```

**Day 8 - Follow Up:**
```javascript
const followUp = "Thanks for connecting, Topher! Saw your post about agentic AI. Building Vibe Browser - AI-powered browser automation. Live with paying customers, ex-Coinbase team. Raising $100-200k pre-seed. 15-min demo? vibebrowser.app/demo.mp4";
await linkedinSendMessage('topherc', followUp);
```

**Result:** Meeting scheduled within 2 weeks

## Quick Start

### 5-Minute Setup

1. **Choose target** (investor, partner, customer)
2. **Open Playwriter** in Chrome
3. **Navigate to LinkedIn** profile
4. **Copy research script** from above
5. **Execute** and review extracted data

### Day 1 Script (Copy-Paste Ready)

```javascript
// Replace with your target's LinkedIn username
const username = 'TARGET_USERNAME';

state.linkedinTargets = state.linkedinTargets || [];

await page.goto(`https://www.linkedin.com/in/${username}/`, { 
  waitUntil: 'domcontentloaded' 
});
await page.waitForLoadState('networkidle');

const profileData = await page.evaluate(() => {
  const getText = (selector) => {
    const el = document.querySelector(selector);
    return el ? el.innerText.trim() : '';
  };
  return {
    name: getText('h1.text-heading-xlarge'),
    headline: getText('.text-body-medium.break-words'),
    company: getText('.inline-show-more-text--CAREER-COMPANY-NAME')
  };
});

console.log('✅ Profile Data:', JSON.stringify(profileData, null, 2));
state.linkedinTargets.push({ username, profileData, timestamp: new Date().toISOString() });
```

## Success Metrics

Track these metrics to measure effectiveness:

- **Engagement Rate**: % of targets engaged with (should be 100% before outreach)
- **Connection Rate**: % of connection requests accepted (target: 50%+)
- **Response Rate**: % of messages that get responses (target: 30%+)
- **Meeting Rate**: % of responses that convert to meetings (target: 50%+)
- **Success Rate**: % of meetings that convert to outcome (target: 30%+)

**Overall Success Formula:**
```
10 targets → 5 connections → 3 responses → 2 meetings → 1 success
```

## Additional Resources

**Full Documentation:**
- Complete scripts: `/product/docs/skills/playwriter-outreach-scripts.js`
- Tracking templates: `/product/docs/skills/outreach-tracking-template.md`
- Quick start guide: `/product/docs/skills/quick-start-outreach.md`

**Prerequisites:**
- Playwriter MCP installed
- LinkedIn account (Premium recommended)
- Twitter account (optional)
- Hunter.io account (free tier)

**Support:**
- Documentation: `/product/docs/skills/`
- Issues: GitHub or internal channels
