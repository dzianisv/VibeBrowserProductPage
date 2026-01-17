/Users/engineer/workspace/vibebrowser/src/chrome/browser/resources/vibe
https://www.youtube.com/watch?v=nkJa4WdfdVU

# Chrome Web Store Publishing Guide

Required descriptions and assets for publishing Vibe AI extension on Chrome Web Store.

## Store Listing Tab

### Extension Name
**Field:** Name (max 45 characters)
```
Vibe AI - Browser Co-Pilot
```

### Short Description
**Field:** Short description (max 132 characters)
```
AI browser co-pilot that automates workflows: research, outreach, data entry. Works with your logged-in accounts.
```

### Detailed Description
**Field:** Detailed description (max 4,000 characters)
```
Vibe AI is an autonomous browser co-pilot that completes entire tasks for you. Unlike chatbots that just answer questions, Vibe takes action - navigating sites, filling forms, and executing multi-step workflows across your logged-in services.

Key Features:
- Autonomous Task Execution: Describe what you need in plain English. Vibe plans, executes, and completes workflows without your intervention
- Multi-Site Workflows: Seamlessly works across multiple tabs and websites in a single task
- Works With Your Accounts: Operates in your live browser with your logged-in services (Gmail, LinkedIn, calendars, etc.)
- Privacy First: Choose 100% local AI with Gemini Nano, or use cloud models (GPT-4, Claude) when needed
- Model Flexibility: Bring your own API key or switch between providers

Use Cases:
- Sales: Lead research, CRM updates, prospect analysis across LinkedIn and company sites
- Recruiting: Candidate sourcing, screening, automated outreach
- Research: Market analysis, competitor tracking, multi-source data collection
- Data Entry: Form filling, data enrichment, validation across platforms
- Personal: Email summaries, calendar management, price comparisons

How It Works:
1. Click the Vibe icon or use the side panel to describe your task
2. Vibe autonomously navigates, researches, and executes across multiple sites
3. Review results and approve critical actions (like purchases or sends)

Privacy & Security:
- Local AI option: Gemini Nano runs entirely on your device
- Cloud models: Data sent only to your chosen AI provider's API
- No background data collection when inactive
- You control which sites the agent can access

Vibe AI Browser Co-Pilot - Stop clicking. Start automating.
```

### Category
```
Productivity
```

### Language
```
English (en)
```

## Store Listing - Metadata

### Keywords (max 5, separated by commas)
```
AI agent, browser automation, workflow automation, web co-pilot, autonomous
```

### Support Email
```
info@vibebrowser.app
```

### Support Website
```
https://www.vibebrowser.app
```

### Privacy Policy URL
```
https://www.vibebrowser.app/privacy
```

## Assets

### Icon Requirements
- **Size:** 128x128 pixels (required)
- **Format:** PNG, JPEG, GIF, or WebP
- **Purpose:** Displays on Chrome Web Store listing
- **Recommendation:** Use transparent background, ensure logo is clear at small sizes

### Screenshots
- **Quantity:** 1-5 screenshots (minimum 1 required)
- **Size:** 1280x800 or 640x400 pixels
- **Format:** PNG, JPEG, or WebP
- **Purpose:** Show key features and UI

**Recommended Screenshots:**
1. Side panel with agent executing a workflow (e.g., LinkedIn research)
2. Multi-tab task in progress (price comparison across sites)
3. Email/calendar automation result
4. Agent navigating and filling forms
5. Settings with AI provider selection

### Promotional Image
- **Size:** 1400x560 pixels
- **Format:** PNG, JPEG, or WebP
- **Optional:** Use for featured placement

## Privacy Tab

### Single Purpose Statement
```
Vibe AI is an autonomous browser co-pilot that executes multi-step web workflows on behalf of users. Users describe tasks in natural language (e.g., "research competitors", "summarize my inbox", "find best flight deals"), and the AI agent navigates websites, interacts with pages, and completes workflows across logged-in services. Supports local AI (Gemini Nano) or cloud providers (OpenAI, Google Gemini, Azure).
```

### Data Handling Declaration
```
Vibe AI processes the following data for core functionality:

**Data Processed During Tasks:**
- Current web page content (for task execution and analysis)
- User queries (sent to selected AI provider)
- Browser interactions (clicks, form inputs performed by agent)

**Data Stored Locally:**
- Chat session history (serialized conversations for continuity)
- User preferences (AI provider, model, settings)
- API keys (user-provided keys for AI services)
- OAuth tokens (for authenticated providers like OpenRouter)
- Cached model data (available models from providers)

**Data NOT Stored:**
- Page content is processed in real-time and discarded after task completion
- No user data retained on Vibe servers
- No browsing activity tracked when agent is inactive

**Third-party Sharing:**
- When using cloud AI: queries and page context sent to selected provider's API
- When using local AI (Gemini Nano): no data leaves your device
- No data shared with other third parties

**User Control:**
- Choose 100% local AI for complete privacy
- Disable extension at any time
- Clear all stored data via extension settings
- Configuration stored locally, not synced to external servers
```

## Distribution Tab

### Pricing
```
Free
```

### Countries/Regions
```
Available in all countries where Chrome Web Store is accessible
```

### Visibility
```
Public - Visible to all users
```

## Test Instructions Tab

### Testing Requirements
```
To test this extension:

1. Install the extension
2. Configure your AI provider in chrome://settings/ai/vibeConfig (or use default)
3. Open any webpage (e.g., amazon.com, linkedin.com)
4. Click the Vibe icon to open the side panel
5. Type a task like "summarize this page" or "find the main product price"
6. Watch the agent execute and return results

Test Scenarios:
- [Test 1] Simple page summary on any article
- [Test 2] Price extraction from a product page
- [Test 3] Multi-step research task (e.g., "compare prices on amazon vs bestbuy")
- [Test 4] Form interaction (e.g., "fill the search box with 'laptop'")
```

### Reviewer Credentials
```
No special credentials required. Extension works on any public website.

Optional: For testing on specific services:
- Test Amazon account available upon request
- Test shopping site: amazon.com, bestbuy.com (public access)
```

## Additional Information

### Permission Justifications (for Chrome Web Store Privacy Tab)

Copy-paste these into the Chrome Web Store developer console privacy tab.

#### Single Purpose Description
```
Autonomous AI browser co-pilot that executes multi-step web workflows. Users describe tasks in natural language via the side panel (e.g., "research competitors on LinkedIn", "summarize my Gmail inbox", "compare prices across sites"). The agent navigates websites, fills forms, and completes workflows across logged-in services.
```

#### alarms
```
Prevents service worker termination while waiting for content script responses. MV3 service workers are killed after ~30s inactivity. Agent tasks require round-trips between background.js and content.js that can exceed this limit. Alarm fires every 30s as heartbeat during active tasks (Chrome minimum interval).
```

#### storage
```
Stores serialized user sessions (chat history, agent state) and user preferences (AI provider, model, API keys). All data local to browser.
```

#### scripting
```
Execute content scripts for agent tools: get_page_content, click, type, scroll, form fill. Injects buildDomTree.js for DOM extraction.
```

#### tabs
```
Query active tab for URL/title context. Create new tabs for multi-site tasks. Send messages to content scripts. Capture visible tab for screenshots.
```

#### sidePanel
```
Primary UI. Opens side panel for chat interface, displays task progress and results.
```

#### history
```
Search user's browsing history when agent needs to find previously visited pages. Used in suggestions and history-related queries.
```

#### webNavigation
```
Listen for onDOMContentLoaded and onErrorOccurred events. Required to know when page is ready for interaction and to detect navigation failures.
```

#### webRequest
```
Listen for onCompleted to check HTTP status codes during navigation. Detect 4xx/5xx errors for retry logic.
```

#### identity
```
OAuth via launchWebAuthFlow for Vibe portal authentication (portal.vibebrowser.app/auth). Used when user connects Vibe account.
```

#### Host Permissions (<all_urls>)
```
Execute agent tasks on any user-directed website. No background access - only when user initiates task via side panel or omnibox.
```

#### Remote Code
Select: **No, I am not using remote code**

#### Data Usage
- Do NOT check "Personally identifiable information"
- Check "Web history" if applicable (for history permission)
- Check "Website content" (for page analysis)

### Compliance Notes
- Complies with Chrome Web Store policies
- No tracking or telemetry data collection
- No modification of user settings without consent
- Clear opt-in for each AI provider configuration

## Publishing Checklist

- [ ] Icon (128x128) prepared
- [ ] At least 1-3 screenshots captured
- [ ] Extension name finalized
- [ ] Short description (under 132 chars)
- [ ] Full description (under 4,000 chars)
- [ ] Privacy policy URL available
- [ ] Support contact established
- [ ] Keywords selected (max 5)
- [ ] All test instructions documented
- [ ] Manifest.json permissions declared
- [ ] Extension tested on multiple websites
- [ ] Version number set in manifest.json
- [ ] Ready for submission to review

## References

- [Chrome Web Store Publishing Guide](https://developer.chrome.com/docs/webstore/publish)
- [Chrome Web Store Requirements](https://developer.chrome.com/docs/webstore/program-policies)
- [Privacy Policy Guidelines](https://developer.chrome.com/docs/webstore/cws-dashboard-privacy)


| Category                            | Collect? | Justification                                                                                                  |
  |-------------------------------------|----------|----------------------------------------------------------------------------------------------------------------|
  | Personally identifiable information | YES      | Email address stored when user signs into Vibe API (vibeAuth.ts stores user email for subscription management) |
  | Health information                  | NO       | Not collected                                                                                                  |
  | Financial and payment information   | NO       | Payments handled by Stripe externally; no financial data stored in extension                                   |
  | Authentication information          | YES      | API keys and OAuth tokens stored locally in chrome.storage for AI provider access                              |
  | Personal communications             | NO       | Agent may read emails during tasks but content is processed transiently, not collected/stored                  |
  | Location                            | NO       | Not collected                                                                                                  |
  | Web history                         | YES      | Extension uses history permission to search previously visited pages for suggestions                           |
  | User activity                       | YES      | Chat history stores user queries and agent actions (clicks, form fills) for session continuity                 |
  | Website content                     | YES      | Page content extracted during task execution for AI analysis                                                   |

