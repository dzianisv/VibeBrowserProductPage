# Warm Outreach Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites Checklist
- [ ] Playwriter MCP installed and connected
- [ ] LinkedIn account logged in
- [ ] Twitter account logged in (optional)
- [ ] Hunter.io account created (free tier)
- [ ] Demo video ready: https://www.vibebrowser.app/linkedin-warm-outreach-demo.mp4
- [ ] Pitch deck ready: https://pitch.vibebrowser.app/pitch.pdf

---

## Step 1: Choose Your First Target

**For Vibe Browser Pre-Seed:**
Start with **Topher Conway** (SV Angel Managing Partner)

**Why:**
- Works with OpenAI, Stripe, Coinbase (perfect fit)
- Active on LinkedIn and Twitter
- Highest priority investor

**Details:**
- LinkedIn: linkedin.com/in/topherc
- Twitter: @topherc
- Company: SV Angel
- Email: topher@svangel.com (predicted, verify with Hunter.io)

---

## Step 2: Run Your First Playwriter Script

### Open Playwriter

1. Click Playwriter extension in Chrome
2. Open the tab where you want to automate (LinkedIn/Twitter)
3. Make sure you're logged in

### Execute LinkedIn Research Script

Copy and paste into Playwriter:

```javascript
// Initialize state storage
state.linkedinTargets = state.linkedinTargets || [];

// Navigate to Topher's profile
await page.goto('https://www.linkedin.com/in/topherc/', { 
  waitUntil: 'domcontentloaded' 
});
await page.waitForLoadState('networkidle');

// Extract profile data
const profileData = await page.evaluate(() => {
  const getText = (selector) => {
    const el = document.querySelector(selector);
    return el ? el.innerText.trim() : '';
  };
  
  return {
    name: getText('h1.text-heading-xlarge'),
    headline: getText('.text-body-medium.break-words'),
    company: getText('.inline-show-more-text--CAREER-COMPANY-NAME'),
    location: getText('.text-body-small.inline.t-black--light'),
    connectionDegree: getText('.dist-value')
  };
});

console.log('✅ Profile Data:', JSON.stringify(profileData, null, 2));

// Store in state
state.linkedinTargets.push({
  username: 'topherc',
  profileData,
  timestamp: new Date().toISOString()
});

console.log('✅ Research complete for Topher Conway');
```

**Expected Output:**
```json
{
  "name": "Topher Conway",
  "headline": "Managing Partner at SV Angel",
  "company": "SV Angel",
  "location": "San Francisco, California",
  "connectionDegree": "2nd"
}
```

---

## Step 3: Engage with Recent Posts

### Like 3 Recent LinkedIn Posts

```javascript
// Navigate to Topher's activity
await page.goto('https://www.linkedin.com/in/topherc/recent-activity/all/', {
  waitUntil: 'domcontentloaded'
});
await page.waitForLoadState('networkidle');

// Like top 3 posts
const posts = await page.locator('.feed-shared-update-v2').all();
const numPosts = Math.min(3, posts.length);

for (let i = 0; i < numPosts; i++) {
  const post = posts[i];
  const likeButton = post.locator('button[aria-label*="Like"]').first();
  const ariaPressed = await likeButton.getAttribute('aria-pressed');
  
  if (ariaPressed !== 'true') {
    await likeButton.click();
    console.log(`✅ Liked post ${i + 1}`);
    await page.waitForTimeout(3000); // Wait 3 seconds between likes
  }
}

console.log('✅ Engagement complete: liked 3 posts');
```

---

## Step 4: Send Connection Request (Day 5)

**Wait 2-3 days after engagement before sending connection request!**

### Personalized Connection Message for Topher

```javascript
const message = `Hi Topher - ex-Coinbase engineer here, saw you work with OpenAI, Stripe, and Coinbase. Built Vibe Browser: AI automation for any website. Live on Chrome Store with paying customers. Would love to connect and get your thoughts on the space.`;

// Navigate to profile
await page.goto('https://www.linkedin.com/in/topherc/', {
  waitUntil: 'domcontentloaded'
});
await page.waitForLoadState('networkidle');

// Click Connect
await page.click('button:has-text("Connect")');

// Wait for modal
await page.waitForSelector('button[aria-label*="Add a note"]');

// Click Add a note
await page.click('button[aria-label*="Add a note"]');

// Wait for textarea
await page.waitForSelector('textarea[name="message"]');

// Fill message
await page.fill('textarea[name="message"]', message);

console.log('✅ Message length:', message.length, '/ 300 chars');

// Click Send
await page.click('button[aria-label="Send now"]');

console.log('✅ Connection request sent to Topher Conway!');
```

---

## Step 5: Track Your Progress

### Create Tracking Spreadsheet

Copy this table to a new file: `/product/docs/topher-conway-outreach.md`

```markdown
# Topher Conway - SV Angel Outreach Tracking

## Target Details
- **Name**: Topher Conway
- **Company**: SV Angel
- **Role**: Managing Partner
- **LinkedIn**: linkedin.com/in/topherc
- **Twitter**: @topherc
- **Email**: topher@svangel.com (to verify)
- **Priority**: ⭐⭐⭐ HIGHEST

## Timeline

| Date | Action | Status | Notes |
|------|--------|--------|-------|
| 2026-01-26 | LinkedIn profile research | ✅ | Works with OpenAI, Stripe, Coinbase |
| 2026-01-26 | Liked 3 recent posts | ✅ | Posts about AI agents, portfolio companies |
| 2026-01-27 | Comment on AI agents post | ⬜ | Draft: "Great point about agentic AI..." |
| 2026-01-28 | Like 2 more posts | ⬜ | Space out engagement |
| 2026-01-29 | Connection request sent | ⬜ | Message: "Hi Topher - ex-Coinbase..." |
| 2026-01-31 | Connection accepted | ⬜ | Wait for acceptance |
| 2026-02-01 | Follow-up message sent | ⬜ | Include demo link |
| 2026-02-03 | Follow-up if no response | ⬜ | Keep short, add milestone |

## Personalization Notes

**Common Ground:**
- Ex-Coinbase engineer (SV Angel invested in Coinbase!)
- He works with OpenAI, Stripe, Coinbase portfolio companies
- Vibe Browser sits at intersection of all three

**Recent Activity:**
- Posted about agentic AI trends (Jan 20)
- Shared OpenAI Operator launch news (Jan 15)
- Discussed Stripe's developer tools (Jan 10)

**Connection Message (300 chars):**
```
Hi Topher - ex-Coinbase engineer here, saw you work with OpenAI, Stripe, and Coinbase. Built Vibe Browser: AI automation for any website. Live on Chrome Store with paying customers. Would love to connect and get your thoughts on the space.
```

**Follow-Up Message (after connection):**
```
Thanks for connecting, Topher!

Saw your recent post about agentic AI - couldn't agree more. We're seeing the shift from chatbots to autonomous execution accelerating faster than expected.

I'm building Vibe Browser: AI-powered browser automation. Think "ChatGPT meets Selenium" - natural language → autonomous web actions. Key differentiators:
• Privacy-first: Gemini Nano runs 100% on-device
• Model-agnostic: GPT, Claude, Gemini, Grok (no vendor lock-in)
• MCP multi-agent: Unique capability, no competitor has this

Traction: Live on Chrome Store, early paying customers (month 1), ex-Coinbase team.

Market validation: Manus → Meta $2B. OpenAI Operator validates category.

We're raising $100-200k pre-seed. Portfolio fit: OpenAI (AI infra) + Stripe (dev tools) + Coinbase (alumni).

Would you be open to a 15-min demo?

Demo: https://www.vibebrowser.app/linkedin-warm-outreach-demo.mp4
Deck: https://pitch.vibebrowser.app/pitch.pdf

Best,
Dzianis
```

## Twitter Outreach (Parallel)

| Date | Action | Status | Notes |
|------|--------|--------|-------|
| 2026-01-26 | Follow @topherc | ⬜ | |
| 2026-01-26 | Like 5 tweets | ⬜ | |
| 2026-01-27 | Retweet with commentary | ⬜ | |
| 2026-01-28 | Reply to AI tweet | ⬜ | |
| 2026-01-29 | Send DM | ⬜ | |
| 2026-02-05 | Follow-up DM | ⬜ | If no response |

**Twitter DM (280 chars):**
```
Hi Topher - Dzianis here, ex-Coinbase. Built Vibe Browser: AI automation for any website. Live w/ paying customers. Privacy-first local AI, model-agnostic. Raising $100-200k pre-seed. Portfolio fit: OpenAI+Stripe+Coinbase. Quick demo? vibebrowser.app
```

## Email Outreach

| Date | Action | Status | Notes |
|------|--------|--------|-------|
| 2026-01-26 | Verify email with Hunter.io | ⬜ | topher@svangel.com |
| 2026-01-29 | Send email | ⬜ | After LinkedIn/Twitter |
| 2026-02-03 | Follow-up email | ⬜ | If no response |

**Email Subject:**
```
Ex-Coinbase building AI browser automation
```

**Email Body:**
```
Hi Topher,

Ex-Coinbase engineer here - saw you work with OpenAI, Stripe, and Coinbase portfolio companies.

Built Vibe Browser: AI-powered browser automation for any website. Live on Chrome Store with early paying customers. Privacy-first (local AI), model-agnostic (GPT/Claude/Gemini).

Manus → Meta $2B and OpenAI Operator validate the space - we're the model-agnostic, privacy-first alternative.

Raising $100-200k pre-seed. Would you be open to a 15-min demo?

Demo: https://www.vibebrowser.app/linkedin-warm-outreach-demo.mp4
Deck: https://pitch.vibebrowser.app/pitch.pdf

Best,
Dzianis Vashchuk
Founder, Vibe Browser
https://www.linkedin.com/in/dzianisv/
```

## Success Metrics

- [ ] Connection request sent (LinkedIn)
- [ ] Connection accepted
- [ ] Follow-up message sent
- [ ] DM sent (Twitter)
- [ ] Email sent
- [ ] Response received (any platform)
- [ ] Meeting scheduled
- [ ] Demo completed
- [ ] Follow-up meeting
- [ ] Term sheet discussion

## Notes & Learnings

**What Worked:**
- [Track what gets responses]

**What Didn't Work:**
- [Track what to avoid]

**Key Insights:**
- [Document learnings for future outreach]
```

---

## Parallel Outreach: Scale to 4 Targets

### Repeat for All SV Angel Partners

**Priority Order:**
1. ⭐⭐⭐ **Topher Conway** (Managing Partner) - START HERE
2. ⭐⭐ **Mike Sho Liu** (General Partner, co-founded Malibu → OpenAI)
3. ⭐ **Andrea Wang** (General Partner, ex-General Catalyst)
4. ⭐ **Ronny Conway** (Managing Partner, Co-founder)

### Create Individual Tracking Files

```bash
/product/docs/outreach/
  ├── topher-conway-tracking.md
  ├── mike-sho-liu-tracking.md
  ├── andrea-wang-tracking.md
  └── ronny-conway-tracking.md
```

**Use the template above for each person.**

---

## Quick Copy-Paste Scripts

### Script 1: LinkedIn Research (Any Target)

```javascript
// Replace USERNAME with target's LinkedIn username
const username = 'USERNAME';

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

state.linkedinTargets.push({
  username,
  profileData,
  timestamp: new Date().toISOString()
});
```

### Script 2: LinkedIn Like Posts (Any Target)

```javascript
// Replace USERNAME with target's LinkedIn username
const username = 'USERNAME';

await page.goto(`https://www.linkedin.com/in/${username}/recent-activity/all/`, {
  waitUntil: 'domcontentloaded'
});
await page.waitForLoadState('networkidle');

const posts = await page.locator('.feed-shared-update-v2').all();
const numPosts = Math.min(3, posts.length);

for (let i = 0; i < numPosts; i++) {
  const post = posts[i];
  const likeButton = post.locator('button[aria-label*="Like"]').first();
  const ariaPressed = await likeButton.getAttribute('aria-pressed');
  
  if (ariaPressed !== 'true') {
    await likeButton.click();
    console.log(`✅ Liked post ${i + 1}`);
    await page.waitForTimeout(3000);
  }
}

console.log('✅ Done');
```

### Script 3: Twitter Follow & Like (Any Target)

```javascript
// Replace USERNAME with Twitter handle (without @)
const username = 'USERNAME';

await page.goto(`https://twitter.com/${username}`, {
  waitUntil: 'domcontentloaded'
});
await page.waitForLoadState('networkidle');

// Follow
try {
  await page.click('[data-testid*="follow"]');
  console.log(`✅ Followed @${username}`);
} catch (e) {
  console.log('Already following');
}

await page.waitForTimeout(2000);

// Like tweets
const tweets = await page.locator('[data-testid="tweet"]').all();
for (let i = 0; i < Math.min(5, tweets.length); i++) {
  try {
    await tweets[i].locator('[data-testid="like"]').click();
    console.log(`✅ Liked tweet ${i + 1}`);
    await page.waitForTimeout(3000);
  } catch (e) {
    console.log(`Tweet ${i + 1} already liked or error`);
  }
}

console.log('✅ Done');
```

### Script 4: Hunter.io Email Verification

```javascript
// Replace with actual details
const firstName = 'FIRST_NAME';
const lastName = 'LAST_NAME';
const domain = 'COMPANY.com';

await page.goto('https://hunter.io/email-finder', {
  waitUntil: 'domcontentloaded'
});
await page.waitForLoadState('networkidle');

await page.fill('input[name="first_name"]', firstName);
await page.fill('input[name="last_name"]', lastName);
await page.fill('input[name="domain"]', domain);

await page.click('button:has-text("Find email address")');

await page.waitForSelector('.email-result', { timeout: 15000 });

const emailData = await page.evaluate(() => {
  const gettext = (selector) => {
    const el = document.querySelector(selector);
    return el ? el.innerText.trim() : '';
  };
  
  return {
    email: gettext('.email-result'),
    confidence: gettext('.confidence-score')
  };
});

console.log('✅ Email Found:', emailData.email);
console.log('Confidence:', emailData.confidence);
```

---

## Troubleshooting

### LinkedIn Playwriter Issues

**Issue: "Element not found"**
- LinkedIn updates selectors frequently
- Use `accessibilitySnapshot()` to find current selectors
- Update scripts with new selectors

**Issue: "Rate limited"**
- Wait 24 hours before resuming
- Reduce actions per day (max 10 connections/day)
- Space out actions (3-5 minutes between each)

**Issue: "Login required"**
- Make sure you're logged into LinkedIn in the browser
- Playwriter uses your active session
- Try navigating manually first

### Twitter Playwriter Issues

**Issue: "Cannot find DM button"**
- Make sure you're following the person first
- Some accounts have DMs disabled
- Try engaging more before DMing

**Issue: "Suspended account"**
- Stop all automation for 72 hours
- Reduce actions to 5/day after reinstatement
- Focus on manual engagement

### General Playwriter Issues

**Issue: "No browser tabs connected"**
- Click Playwriter extension icon on the tab
- Make sure tab is active (not background)
- Refresh page if needed

**Issue: "Script timeout"**
- Increase timeout in script
- Break into smaller scripts
- Check internet connection

---

## Next Steps After First Success

### After Getting First Meeting:

1. **Prepare Demo**
   - Practice 15-min demo flow
   - Have backup examples ready
   - Test all features work

2. **Send Calendar Invite**
   - Include Zoom/Google Meet link
   - Attach pitch deck
   - Include agenda

3. **Follow-Up Email**
   - Thank them for their time
   - Send recording if they want
   - Ask for feedback

### After First Response:

1. **Respond Within 4 Hours**
   - Shows you're engaged
   - Maintains momentum
   - Professional impression

2. **Move Fast**
   - Offer meeting times immediately
   - Send deck proactively
   - Be available for calls

3. **Track Everything**
   - Update tracking spreadsheet
   - Note what worked
   - Replicate success

---

## Weekly Goals

### Week 1: Research & Engagement
- [ ] 4 LinkedIn profiles researched
- [ ] 12 LinkedIn posts liked (3 per person)
- [ ] 4 Twitter profiles followed
- [ ] 20 tweets liked (5 per person)
- [ ] 4 emails verified

### Week 2: Direct Outreach
- [ ] 4 LinkedIn connection requests sent
- [ ] 2-3 connection requests accepted
- [ ] 4 Twitter DMs sent
- [ ] 4 emails sent
- [ ] 1-2 responses received

### Week 3: Meetings
- [ ] 1-2 intro calls scheduled
- [ ] Demos completed
- [ ] Follow-up emails sent
- [ ] Second meetings scheduled

### Week 4: Close
- [ ] Term sheet discussions
- [ ] Due diligence materials prepared
- [ ] Pre-seed round closed

---

## Resources

### Documentation
- Full outreach skill: `/product/docs/skills/warm-outreach-skill.md`
- Playwriter scripts: `/product/docs/skills/playwriter-outreach-scripts.js`
- Pre-seed action plan: `/product/docs/pre-seed-complete-action-plan.md`

### Tools
- Playwriter MCP: Browser automation
- Hunter.io: Email verification (free 25/month)
- LinkedIn Sales Navigator: Advanced search ($79.99/month, optional)
- Notion/Airtable: CRM tracking

### Templates
- Connection messages: See tracking files above
- Follow-up emails: See pre-seed docs
- Twitter DMs: See tracking files above

---

## Ready to Start?

### Right Now:
1. ✅ Open Chrome
2. ✅ Go to linkedin.com/in/topherc
3. ✅ Click Playwriter extension icon
4. ✅ Copy Script 1 (LinkedIn Research) above
5. ✅ Paste into Playwriter
6. ✅ Execute

### See Results in 30 Seconds:
- Profile data extracted
- Saved to state.linkedinTargets
- Ready for engagement

**You're now executing warm outreach with automation! 🚀**
