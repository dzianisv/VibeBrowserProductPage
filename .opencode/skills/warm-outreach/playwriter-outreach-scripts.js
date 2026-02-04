// Playwriter Outreach Automation Scripts
// Usage: Copy individual functions and execute via Playwriter MCP

// =============================================================================
// LINKEDIN AUTOMATION SCRIPTS
// =============================================================================

/**
 * Script 1: LinkedIn Profile Research
 * Extracts comprehensive profile data for personalization
 * 
 * Usage:
 * 1. Navigate to target's LinkedIn profile manually first
 * 2. Execute this script via Playwriter
 * 3. Review extracted data in state.linkedinTargets
 */
async function linkedinProfileResearch(username) {
  // Initialize state storage
  state.linkedinTargets = state.linkedinTargets || [];
  
  // Navigate to profile
  await page.goto(`https://www.linkedin.com/in/${username}/`, { 
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
      about: getText('.display-flex.ph5.pv3 .inline-show-more-text'),
      connectionDegree: getText('.dist-value'),
      // Try to find mutual connections
      mutualConnections: getText('.pvs-header__optional-link')
    };
  });
  
  console.log('✅ Profile Data Extracted:');
  console.log(JSON.stringify(profileData, null, 2));
  
  // Navigate to recent activity
  const activityUrl = `https://www.linkedin.com/in/${username}/recent-activity/all/`;
  await page.goto(activityUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle');
  
  // Extract recent posts
  const recentPosts = await page.evaluate(() => {
    const posts = [];
    const postElements = document.querySelectorAll('.feed-shared-update-v2');
    
    postElements.forEach((post, idx) => {
      if (idx < 5) { // Get top 5 posts
        const textEl = post.querySelector('.feed-shared-text');
        const timeEl = post.querySelector('.feed-shared-actor__sub-description');
        const likesEl = post.querySelector('.social-details-social-counts__reactions-count');
        const commentsEl = post.querySelector('.social-details-social-counts__comments');
        
        posts.push({
          text: textEl ? textEl.innerText.trim() : '',
          timestamp: timeEl ? timeEl.innerText.trim() : '',
          likes: likesEl ? likesEl.innerText.trim() : '0',
          comments: commentsEl ? commentsEl.innerText.trim() : '0',
          url: post.querySelector('a')?.href || ''
        });
      }
    });
    
    return posts;
  });
  
  console.log('✅ Recent Posts Extracted:', recentPosts.length);
  console.log(JSON.stringify(recentPosts, null, 2));
  
  // Take screenshot for reference
  await page.screenshot({ 
    path: `/tmp/linkedin-${username}-profile.png`, 
    scale: 'css',
    fullPage: true 
  });
  
  // Store in state
  const targetData = {
    username,
    profileData,
    recentPosts,
    engagementStatus: 'researched',
    timestamp: new Date().toISOString()
  };
  
  state.linkedinTargets.push(targetData);
  
  console.log(`\n✅ Research complete for ${username}`);
  console.log(`📊 Total targets researched: ${state.linkedinTargets.length}`);
  
  return targetData;
}

/**
 * Script 2: LinkedIn Post Engagement (Like)
 * Likes recent posts from target profile
 * 
 * @param {string} username - LinkedIn username
 * @param {number} numPosts - Number of posts to like (default: 3)
 */
async function linkedinEngagePosts(username, numPosts = 3) {
  // Navigate to activity feed
  await page.goto(`https://www.linkedin.com/in/${username}/recent-activity/all/`, {
    waitUntil: 'domcontentloaded'
  });
  await page.waitForLoadState('networkidle');
  
  // Get all post elements
  const posts = await page.locator('.feed-shared-update-v2').all();
  const postsToLike = Math.min(numPosts, posts.length);
  
  console.log(`📝 Found ${posts.length} posts, will like ${postsToLike}`);
  
  let likedCount = 0;
  
  for (let i = 0; i < postsToLike; i++) {
    try {
      const post = posts[i];
      
      // Find like button in this post
      const likeButton = post.locator('button[aria-label*="Like"]').first();
      
      // Check if already liked
      const ariaPressed = await likeButton.getAttribute('aria-pressed');
      
      if (ariaPressed !== 'true') {
        await likeButton.click();
        likedCount++;
        console.log(`✅ Liked post ${i + 1}`);
        
        // Human-like delay between likes
        await page.waitForTimeout(2000 + Math.random() * 2000);
      } else {
        console.log(`ℹ️ Post ${i + 1} already liked`);
      }
    } catch (error) {
      console.log(`⚠️ Could not like post ${i + 1}:`, error.message);
    }
  }
  
  console.log(`\n✅ Engagement complete: ${likedCount} posts liked`);
  
  // Update state
  const target = state.linkedinTargets?.find(t => t.username === username);
  if (target) {
    target.engagementStatus = 'engaged';
    target.lastEngagement = new Date().toISOString();
    target.postsLiked = likedCount;
  }
  
  return { username, postsLiked: likedCount };
}

/**
 * Script 3: LinkedIn Connection Request with Note
 * Sends personalized connection request
 * 
 * @param {string} username - LinkedIn username
 * @param {string} message - Personalized note (max 300 chars)
 */
async function linkedinSendConnectionRequest(username, message) {
  // Validate message length
  if (message.length > 300) {
    throw new Error(`Message too long: ${message.length} chars (max 300)`);
  }
  
  // Navigate to profile
  await page.goto(`https://www.linkedin.com/in/${username}/`, {
    waitUntil: 'domcontentloaded'
  });
  await page.waitForLoadState('networkidle');
  
  // Find and click "Connect" button
  const connectButton = page.locator('button:has-text("Connect")').first();
  await connectButton.click();
  
  console.log('✅ Clicked Connect button');
  
  // Wait for modal to appear
  await page.waitForSelector('button[aria-label*="Add a note"]', { timeout: 5000 });
  
  // Click "Add a note"
  await page.click('button[aria-label*="Add a note"]');
  
  console.log('✅ Clicked Add a note');
  
  // Wait for textarea
  await page.waitForSelector('textarea[name="message"]', { timeout: 5000 });
  
  // Fill in message
  await page.fill('textarea[name="message"]', message);
  
  console.log('✅ Message entered:', message.substring(0, 50) + '...');
  
  // Click "Send"
  await page.click('button[aria-label="Send now"]');
  
  console.log('✅ Connection request sent!');
  
  // Wait for confirmation
  await page.waitForTimeout(2000);
  
  // Take screenshot
  await page.screenshot({ 
    path: `/tmp/linkedin-${username}-connection-sent.png`, 
    scale: 'css' 
  });
  
  // Update state
  const target = state.linkedinTargets?.find(t => t.username === username);
  if (target) {
    target.connectionRequestSent = true;
    target.connectionRequestDate = new Date().toISOString();
    target.connectionMessage = message;
  }
  
  return { username, message, sent: true };
}

/**
 * Script 4: LinkedIn Message Send (After Connected)
 * Sends follow-up message after connection accepted
 * 
 * @param {string} username - LinkedIn username
 * @param {string} message - Follow-up message
 */
async function linkedinSendMessage(username, message) {
  // Navigate to messaging
  await page.goto(`https://www.linkedin.com/messaging/`, {
    waitUntil: 'domcontentloaded'
  });
  await page.waitForLoadState('networkidle');
  
  // Click "New message"
  await page.click('button[aria-label*="new message"]');
  
  // Wait for search input
  await page.waitForSelector('input[placeholder*="Type a name"]', { timeout: 5000 });
  
  // Search for user
  await page.fill('input[placeholder*="Type a name"]', username);
  
  // Wait for search results
  await page.waitForTimeout(2000);
  
  // Click first result
  await page.click('.msg-connections-typeahead-result__link');
  
  console.log(`✅ Selected ${username}`);
  
  // Wait for message input
  await page.waitForSelector('.msg-form__contenteditable', { timeout: 5000 });
  
  // Click into message box and type
  await page.click('.msg-form__contenteditable');
  await page.keyboard.type(message);
  
  console.log('✅ Message typed');
  
  // Click send button
  await page.click('button[type="submit"]');
  
  console.log('✅ Message sent!');
  
  // Update state
  const target = state.linkedinTargets?.find(t => t.username === username);
  if (target) {
    target.messageSent = true;
    target.messageDate = new Date().toISOString();
    target.messageContent = message;
  }
  
  return { username, message, sent: true };
}

// =============================================================================
// TWITTER/X AUTOMATION SCRIPTS
// =============================================================================

/**
 * Script 5: Twitter Profile Discovery
 * Extracts profile data and recent tweets
 * 
 * @param {string} username - Twitter handle (without @)
 */
async function twitterProfileResearch(username) {
  // Initialize state
  state.twitterTargets = state.twitterTargets || [];
  
  // Navigate to profile
  await page.goto(`https://twitter.com/${username}`, {
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
      name: getText('[data-testid="UserName"]'),
      bio: getText('[data-testid="UserDescription"]'),
      location: getText('[data-testid="UserLocation"]'),
      website: document.querySelector('[data-testid="UserUrl"] a')?.href || '',
      followers: getText('a[href$="/verified_followers"] span'),
      following: getText('a[href$="/following"] span'),
      joined: getText('[data-testid="UserJoinDate"]')
    };
  });
  
  console.log('✅ Twitter Profile Extracted:');
  console.log(JSON.stringify(profileData, null, 2));
  
  // Extract recent tweets
  const recentTweets = await page.evaluate(() => {
    const tweets = [];
    const tweetElements = document.querySelectorAll('[data-testid="tweet"]');
    
    tweetElements.forEach((tweet, idx) => {
      if (idx < 10) { // Get top 10 tweets
        const textEl = tweet.querySelector('[data-testid="tweetText"]');
        const timeEl = tweet.querySelector('time');
        const likesEl = tweet.querySelector('[data-testid="like"]');
        const retweetsEl = tweet.querySelector('[data-testid="retweet"]');
        
        tweets.push({
          text: textEl ? textEl.innerText.trim() : '',
          timestamp: timeEl ? timeEl.getAttribute('datetime') : '',
          url: tweet.querySelector('a[href*="/status/"]')?.href || ''
        });
      }
    });
    
    return tweets;
  });
  
  console.log('✅ Recent Tweets Extracted:', recentTweets.length);
  
  // Take screenshot
  await page.screenshot({ 
    path: `/tmp/twitter-${username}-profile.png`, 
    scale: 'css',
    fullPage: true 
  });
  
  // Store in state
  const targetData = {
    username,
    profile: profileData,
    recentTweets,
    researchedAt: new Date().toISOString()
  };
  
  state.twitterTargets.push(targetData);
  
  console.log(`\n✅ Research complete for @${username}`);
  
  return targetData;
}

/**
 * Script 6: Twitter Follow & Engage
 * Follows user and likes recent tweets
 * 
 * @param {string} username - Twitter handle (without @)
 * @param {number} numTweets - Number of tweets to like (default: 5)
 */
async function twitterFollowAndEngage(username, numTweets = 5) {
  // Navigate to profile
  await page.goto(`https://twitter.com/${username}`, {
    waitUntil: 'domcontentloaded'
  });
  await page.waitForLoadState('networkidle');
  
  // Click "Follow" button
  try {
    const followButton = page.locator('[data-testid*="follow"]').first();
    await followButton.click();
    console.log(`✅ Followed @${username}`);
  } catch (error) {
    console.log('ℹ️ Already following or button not found');
  }
  
  // Wait a bit
  await page.waitForTimeout(2000);
  
  // Like recent tweets
  const tweets = await page.locator('[data-testid="tweet"]').all();
  const tweetsToLike = Math.min(numTweets, tweets.length);
  
  console.log(`📝 Found ${tweets.length} tweets, will like ${tweetsToLike}`);
  
  let likedCount = 0;
  
  for (let i = 0; i < tweetsToLike; i++) {
    try {
      const tweet = tweets[i];
      const likeButton = tweet.locator('[data-testid="like"]').first();
      
      await likeButton.click();
      likedCount++;
      console.log(`✅ Liked tweet ${i + 1}`);
      
      // Human-like delay
      await page.waitForTimeout(2000 + Math.random() * 2000);
    } catch (error) {
      console.log(`⚠️ Could not like tweet ${i + 1}:`, error.message);
    }
  }
  
  console.log(`\n✅ Engagement complete: ${likedCount} tweets liked`);
  
  // Update state
  const target = state.twitterTargets?.find(t => t.username === username);
  if (target) {
    target.followed = true;
    target.tweetsLiked = likedCount;
    target.lastEngagement = new Date().toISOString();
  }
  
  return { username, followed: true, tweetsLiked: likedCount };
}

/**
 * Script 7: Twitter Send DM
 * Sends direct message to user
 * 
 * @param {string} username - Twitter handle (without @)
 * @param {string} message - DM message (max 280 chars recommended)
 */
async function twitterSendDM(username, message) {
  // Navigate to messages
  await page.goto('https://twitter.com/messages', {
    waitUntil: 'domcontentloaded'
  });
  await page.waitForLoadState('networkidle');
  
  // Click "New message"
  await page.click('[data-testid="NewDM_Button"]');
  
  console.log('✅ Clicked New Message');
  
  // Wait for search input
  await page.waitForSelector('input[data-testid="searchInput"]', { timeout: 5000 });
  
  // Search for user
  await page.fill('input[data-testid="searchInput"]', username);
  
  // Wait for results
  await page.waitForTimeout(2000);
  
  // Click on first result
  await page.click('[data-testid="TypeaheadUser"]');
  
  console.log(`✅ Selected @${username}`);
  
  // Click "Next"
  await page.click('[data-testid="nextButton"]');
  
  // Wait for message input
  await page.waitForSelector('[data-testid="dmComposerTextInput"]', { timeout: 5000 });
  
  // Type message
  await page.fill('[data-testid="dmComposerTextInput"]', message);
  
  console.log('✅ Message entered');
  
  // Click "Send"
  await page.click('[data-testid="dmComposerSendButton"]');
  
  console.log('✅ DM sent!');
  
  // Take screenshot
  await page.screenshot({ 
    path: `/tmp/twitter-${username}-dm-sent.png`, 
    scale: 'css' 
  });
  
  // Update state
  const target = state.twitterTargets?.find(t => t.username === username);
  if (target) {
    target.dmSent = true;
    target.dmDate = new Date().toISOString();
    target.dmMessage = message;
  }
  
  return { username, message, sent: true };
}

// =============================================================================
// EMAIL VERIFICATION SCRIPTS
// =============================================================================

/**
 * Script 8: Hunter.io Email Finder
 * Finds and verifies email addresses
 * 
 * @param {string} firstName - First name
 * @param {string} lastName - Last name
 * @param {string} domain - Company domain (e.g., "svangel.com")
 */
async function hunterFindEmail(firstName, lastName, domain) {
  // Initialize state
  state.verifiedEmails = state.verifiedEmails || [];
  
  // Navigate to Hunter.io
  await page.goto('https://hunter.io/email-finder', {
    waitUntil: 'domcontentloaded'
  });
  await page.waitForLoadState('networkidle');
  
  // Fill in form
  await page.fill('input[name="first_name"]', firstName);
  await page.fill('input[name="last_name"]', lastName);
  await page.fill('input[name="domain"]', domain);
  
  console.log(`🔍 Searching for ${firstName} ${lastName} @ ${domain}`);
  
  // Click "Find email address"
  await page.click('button:has-text("Find email address")');
  
  // Wait for results
  await page.waitForSelector('.email-result', { timeout: 15000 });
  
  // Extract email data
  const emailData = await page.evaluate(() => {
    const gettext = (selector) => {
      const el = document.querySelector(selector);
      return el ? el.innerText.trim() : '';
    };
    
    return {
      email: gettext('.email-result'),
      confidence: gettext('.confidence-score'),
      sources: gettext('.sources-count'),
      status: gettext('.email-status')
    };
  });
  
  console.log('✅ Email Found:');
  console.log(JSON.stringify(emailData, null, 2));
  
  // Take screenshot
  await page.screenshot({ 
    path: `/tmp/hunter-${firstName}-${lastName}.png`, 
    scale: 'css' 
  });
  
  // Store in state
  const emailRecord = {
    name: `${firstName} ${lastName}`,
    firstName,
    lastName,
    domain,
    email: emailData.email,
    confidence: emailData.confidence,
    sources: emailData.sources,
    status: emailData.status,
    verifiedAt: new Date().toISOString()
  };
  
  state.verifiedEmails.push(emailRecord);
  
  console.log(`\n✅ Email verification complete`);
  console.log(`📧 ${emailData.email} (${emailData.confidence} confidence)`);
  
  return emailRecord;
}

// =============================================================================
// INSTAGRAM AUTOMATION SCRIPTS
// =============================================================================

/**
 * Script 9: Instagram Profile Research
 * Extracts profile data and recent posts
 * 
 * @param {string} username - Instagram username
 */
async function instagramProfileResearch(username) {
  // Initialize state
  state.instagramTargets = state.instagramTargets || [];
  
  // Navigate to profile
  await page.goto(`https://www.instagram.com/${username}/`, {
    waitUntil: 'domcontentloaded'
  });
  await page.waitForLoadState('networkidle');
  
  // Extract profile data
  const profileData = await page.evaluate(() => {
    const getText = (selector) => {
      const el = document.querySelector(selector);
      return el ? el.innerText.trim() : '';
    };
    
    // Instagram uses different selectors, may need adjustment
    return {
      name: document.querySelector('header h2')?.innerText || '',
      bio: document.querySelector('header section > div')?.innerText || '',
      posts: getText('header ul li:nth-child(1) span'),
      followers: getText('header ul li:nth-child(2) span'),
      following: getText('header ul li:nth-child(3) span'),
      website: document.querySelector('header a[href]')?.href || ''
    };
  });
  
  console.log('✅ Instagram Profile Extracted:');
  console.log(JSON.stringify(profileData, null, 2));
  
  // Take screenshot
  await page.screenshot({ 
    path: `/tmp/instagram-${username}-profile.png`, 
    scale: 'css',
    fullPage: true 
  });
  
  // Store in state
  const targetData = {
    username,
    profile: profileData,
    researchedAt: new Date().toISOString()
  };
  
  state.instagramTargets.push(targetData);
  
  console.log(`\n✅ Research complete for @${username}`);
  
  return targetData;
}

/**
 * Script 10: Instagram Follow & Like Posts
 * Follows user and likes recent posts
 * 
 * @param {string} username - Instagram username
 * @param {number} numPosts - Number of posts to like (default: 3)
 */
async function instagramFollowAndEngage(username, numPosts = 3) {
  // Navigate to profile
  await page.goto(`https://www.instagram.com/${username}/`, {
    waitUntil: 'domcontentloaded'
  });
  await page.waitForLoadState('networkidle');
  
  // Click "Follow" button
  try {
    const followButton = page.locator('button:has-text("Follow")').first();
    await followButton.click();
    console.log(`✅ Followed @${username}`);
    await page.waitForTimeout(2000);
  } catch (error) {
    console.log('ℹ️ Already following or button not found');
  }
  
  // Get recent post thumbnails
  const posts = await page.locator('article img').all();
  const postsToLike = Math.min(numPosts, posts.length);
  
  console.log(`📝 Found ${posts.length} posts, will like ${postsToLike}`);
  
  let likedCount = 0;
  
  for (let i = 0; i < postsToLike; i++) {
    try {
      // Click post thumbnail
      await posts[i].click();
      await page.waitForTimeout(2000);
      
      // Like the post
      const likeButton = page.locator('button[aria-label*="Like"]').first();
      await likeButton.click();
      likedCount++;
      console.log(`✅ Liked post ${i + 1}`);
      
      // Close post modal (click X or press Escape)
      await page.keyboard.press('Escape');
      await page.waitForTimeout(2000);
      
    } catch (error) {
      console.log(`⚠️ Could not like post ${i + 1}:`, error.message);
      // Try to close modal anyway
      await page.keyboard.press('Escape');
    }
  }
  
  console.log(`\n✅ Engagement complete: ${likedCount} posts liked`);
  
  // Update state
  const target = state.instagramTargets?.find(t => t.username === username);
  if (target) {
    target.followed = true;
    target.postsLiked = likedCount;
    target.lastEngagement = new Date().toISOString();
  }
  
  return { username, followed: true, postsLiked: likedCount };
}

// =============================================================================
// GMAIL AUTOMATION SCRIPTS
// =============================================================================

/**
 * Script 11: Gmail Compose and Send Email
 * Composes and sends an email via Gmail web interface
 * 
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} body - Email body (can include line breaks)
 * @param {string} cc - Optional CC recipients (comma-separated)
 */
async function gmailComposeAndSend(to, subject, body, cc = '') {
  // Navigate to Gmail compose
  await page.goto('https://mail.google.com/mail/u/0/#inbox', {
    waitUntil: 'domcontentloaded'
  });
  await waitForPageLoad({ page, timeout: 10000 });
  
  console.log('✅ Gmail loaded');
  
  // Click "Compose" button
  await page.click('div[role="button"]:has-text("Compose")');
  await page.waitForTimeout(2000);
  
  console.log('✅ Compose window opened');
  
  // Fill in "To" field
  await page.fill('input[name="to"], textarea[name="to"]', to);
  await page.waitForTimeout(500);
  
  // Fill in CC if provided
  if (cc) {
    // Click "Cc" link to expand CC field
    await page.click('span:has-text("Cc")');
    await page.waitForTimeout(500);
    await page.fill('input[name="cc"], textarea[name="cc"]', cc);
  }
  
  // Fill in subject
  await page.fill('input[name="subjectbox"]', subject);
  await page.waitForTimeout(500);
  
  console.log(`✅ To: ${to}, Subject: ${subject}`);
  
  // Fill in body - Gmail uses a contenteditable div
  const bodySelector = 'div[aria-label="Message Body"]';
  await page.click(bodySelector);
  await page.keyboard.type(body);
  
  console.log('✅ Body entered');
  
  // Take screenshot before sending
  await page.screenshot({ 
    path: `/tmp/gmail-compose-${Date.now()}.png`, 
    scale: 'css' 
  });
  
  // Click "Send" button
  await page.click('div[role="button"][aria-label*="Send"]');
  
  console.log('✅ Email sent!');
  
  // Wait for send confirmation
  await page.waitForTimeout(3000);
  
  // Store in state for tracking
  state.emailsSent = state.emailsSent || [];
  state.emailsSent.push({
    to,
    subject,
    cc,
    sentAt: new Date().toISOString()
  });
  
  return { to, subject, sent: true };
}

/**
 * Script 12: Gmail Create Draft (Review Before Sending)
 * Creates a draft email for review before sending
 * 
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} body - Email body
 * @param {string} cc - Optional CC recipients
 */
async function gmailCreateDraft(to, subject, body, cc = '') {
  // Navigate to Gmail compose
  await page.goto('https://mail.google.com/mail/u/0/#inbox', {
    waitUntil: 'domcontentloaded'
  });
  await waitForPageLoad({ page, timeout: 10000 });
  
  // Click "Compose" button
  await page.click('div[role="button"]:has-text("Compose")');
  await page.waitForTimeout(2000);
  
  // Fill in fields
  await page.fill('input[name="to"], textarea[name="to"]', to);
  await page.waitForTimeout(500);
  
  if (cc) {
    await page.click('span:has-text("Cc")');
    await page.waitForTimeout(500);
    await page.fill('input[name="cc"], textarea[name="cc"]', cc);
  }
  
  await page.fill('input[name="subjectbox"]', subject);
  await page.waitForTimeout(500);
  
  const bodySelector = 'div[aria-label="Message Body"]';
  await page.click(bodySelector);
  await page.keyboard.type(body);
  
  console.log('✅ Draft created');
  
  // Close compose window (saves as draft automatically)
  await page.click('img[aria-label="Save & close"]');
  
  console.log('✅ Draft saved! Find it in your Drafts folder.');
  
  // Store in state
  state.emailDrafts = state.emailDrafts || [];
  state.emailDrafts.push({
    to,
    subject,
    cc,
    createdAt: new Date().toISOString()
  });
  
  return { to, subject, drafted: true };
}

/**
 * Script 13: Gmail Search Emails
 * Searches for emails matching a query
 * 
 * @param {string} query - Gmail search query (e.g., "from:investor@vc.com" or "subject:meeting")
 */
async function gmailSearch(query) {
  // Navigate to Gmail
  await page.goto(`https://mail.google.com/mail/u/0/#search/${encodeURIComponent(query)}`, {
    waitUntil: 'domcontentloaded'
  });
  await waitForPageLoad({ page, timeout: 10000 });
  
  console.log(`🔍 Searching for: ${query}`);
  
  // Wait for results
  await page.waitForTimeout(3000);
  
  // Extract email list
  const emails = await page.evaluate(() => {
    const rows = document.querySelectorAll('tr.zA');
    const results = [];
    
    rows.forEach((row, idx) => {
      if (idx < 20) { // Get top 20
        const from = row.querySelector('.yX span[email]')?.getAttribute('email') || '';
        const subject = row.querySelector('.bog span')?.innerText || '';
        const snippet = row.querySelector('.y2')?.innerText || '';
        const date = row.querySelector('.xW span')?.innerText || '';
        const isUnread = row.classList.contains('zE');
        
        results.push({ from, subject, snippet, date, isUnread });
      }
    });
    
    return results;
  });
  
  console.log(`✅ Found ${emails.length} emails`);
  console.log(JSON.stringify(emails, null, 2));
  
  return emails;
}

/**
 * Script 14: Gmail Read Email Thread
 * Opens and reads an email thread
 * 
 * @param {number} index - Index of email in search results (0-based)
 */
async function gmailReadEmail(index = 0) {
  // Click on email row
  const rows = await page.locator('tr.zA').all();
  
  if (index >= rows.length) {
    console.log(`⚠️ Only ${rows.length} emails found`);
    return null;
  }
  
  await rows[index].click();
  await page.waitForTimeout(2000);
  
  // Extract email content
  const emailContent = await page.evaluate(() => {
    const subject = document.querySelector('h2.hP')?.innerText || '';
    const from = document.querySelector('.gD')?.getAttribute('email') || '';
    const date = document.querySelector('.g3')?.innerText || '';
    const body = document.querySelector('.a3s.aiL')?.innerText || '';
    
    return { subject, from, date, body };
  });
  
  console.log('📧 Email Content:');
  console.log(JSON.stringify(emailContent, null, 2));
  
  return emailContent;
}

// =============================================================================
// GOOGLE CALENDAR AUTOMATION SCRIPTS
// =============================================================================

/**
 * Script 15: Google Calendar Create Event
 * Creates a new calendar event
 * 
 * @param {string} title - Event title
 * @param {string} date - Date in YYYY-MM-DD format
 * @param {string} startTime - Start time in HH:MM format (24h)
 * @param {string} endTime - End time in HH:MM format (24h)
 * @param {string} description - Event description
 * @param {string} guests - Comma-separated email addresses
 * @param {string} location - Event location or video call link
 */
async function gcalCreateEvent(title, date, startTime, endTime, description = '', guests = '', location = '') {
  // Navigate to Google Calendar
  await page.goto('https://calendar.google.com/calendar/u/0/r', {
    waitUntil: 'domcontentloaded'
  });
  await waitForPageLoad({ page, timeout: 10000 });
  
  console.log('✅ Google Calendar loaded');
  
  // Click "Create" button
  await page.click('button[aria-label="Create"]');
  await page.waitForTimeout(1000);
  
  // Click "Event" option
  await page.click('span:has-text("Event")');
  await page.waitForTimeout(2000);
  
  console.log('✅ Event creation dialog opened');
  
  // Fill in title
  await page.fill('input[aria-label="Add title"]', title);
  await page.waitForTimeout(500);
  
  // Click on date field and set date
  await page.click('input[aria-label*="Start date"]');
  await page.waitForTimeout(500);
  // Clear and type new date
  await page.keyboard.press('Control+a');
  await page.keyboard.type(date);
  await page.keyboard.press('Enter');
  
  // Set start time
  await page.click('input[aria-label*="Start time"]');
  await page.waitForTimeout(500);
  await page.keyboard.press('Control+a');
  await page.keyboard.type(startTime);
  await page.keyboard.press('Enter');
  
  // Set end time
  await page.click('input[aria-label*="End time"]');
  await page.waitForTimeout(500);
  await page.keyboard.press('Control+a');
  await page.keyboard.type(endTime);
  await page.keyboard.press('Enter');
  
  console.log(`✅ Date/Time set: ${date} ${startTime}-${endTime}`);
  
  // Add guests if provided
  if (guests) {
    await page.click('div[data-key="chips"]'); // Click guests section
    await page.waitForTimeout(500);
    
    const guestList = guests.split(',').map(g => g.trim());
    for (const guest of guestList) {
      await page.keyboard.type(guest);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(500);
    }
    console.log(`✅ Guests added: ${guests}`);
  }
  
  // Add location if provided
  if (location) {
    await page.click('button[aria-label="Add location"]');
    await page.waitForTimeout(500);
    await page.fill('input[placeholder*="location"]', location);
    console.log(`✅ Location set: ${location}`);
  }
  
  // Add description if provided
  if (description) {
    await page.click('div[aria-label="Add description"]');
    await page.waitForTimeout(500);
    await page.keyboard.type(description);
    console.log('✅ Description added');
  }
  
  // Take screenshot before saving
  await page.screenshot({ 
    path: `/tmp/gcal-event-${Date.now()}.png`, 
    scale: 'css' 
  });
  
  // Click "Save" button
  await page.click('button[aria-label="Save"]');
  await page.waitForTimeout(2000);
  
  console.log('✅ Event created!');
  
  // Store in state
  state.calendarEvents = state.calendarEvents || [];
  state.calendarEvents.push({
    title,
    date,
    startTime,
    endTime,
    guests,
    location,
    createdAt: new Date().toISOString()
  });
  
  return { title, date, startTime, endTime, created: true };
}

/**
 * Script 16: Google Calendar Quick Event (Natural Language)
 * Creates an event using Google's natural language parser
 * 
 * @param {string} quickText - Natural language event (e.g., "Meeting with John tomorrow at 2pm for 1 hour")
 */
async function gcalQuickEvent(quickText) {
  // Navigate to Google Calendar
  await page.goto('https://calendar.google.com/calendar/u/0/r', {
    waitUntil: 'domcontentloaded'
  });
  await waitForPageLoad({ page, timeout: 10000 });
  
  // Press "c" to open quick create (keyboard shortcut)
  await page.keyboard.press('c');
  await page.waitForTimeout(1000);
  
  // Type in the quick add box
  await page.keyboard.type(quickText);
  await page.waitForTimeout(500);
  
  // Press Enter to create
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000);
  
  console.log(`✅ Quick event created: "${quickText}"`);
  
  return { quickText, created: true };
}

/**
 * Script 17: Google Calendar List Events
 * Lists upcoming events for a specific date range
 * 
 * @param {string} startDate - Start date in YYYY-MM-DD format
 * @param {string} endDate - End date in YYYY-MM-DD format (optional, defaults to startDate)
 */
async function gcalListEvents(startDate, endDate = '') {
  const targetDate = startDate || new Date().toISOString().split('T')[0];
  
  // Navigate to specific date
  await page.goto(`https://calendar.google.com/calendar/u/0/r/day/${targetDate.replace(/-/g, '/')}`, {
    waitUntil: 'domcontentloaded'
  });
  await waitForPageLoad({ page, timeout: 10000 });
  
  console.log(`📅 Viewing events for ${targetDate}`);
  
  await page.waitForTimeout(2000);
  
  // Extract events from the day view
  const events = await page.evaluate(() => {
    const eventElements = document.querySelectorAll('[data-eventid]');
    const results = [];
    
    eventElements.forEach(el => {
      const title = el.innerText.trim();
      const timeEl = el.closest('[data-eventchip]');
      
      results.push({
        title: title,
        element: el.getAttribute('data-eventid')
      });
    });
    
    return results;
  });
  
  console.log(`✅ Found ${events.length} events:`);
  events.forEach((e, i) => console.log(`  ${i + 1}. ${e.title}`));
  
  return events;
}

/**
 * Script 18: Google Calendar Check Free/Busy
 * Checks availability for scheduling
 * 
 * @param {string} date - Date to check in YYYY-MM-DD format
 */
async function gcalCheckAvailability(date) {
  // Navigate to schedule view for the date
  await page.goto(`https://calendar.google.com/calendar/u/0/r/day/${date.replace(/-/g, '/')}`, {
    waitUntil: 'domcontentloaded'
  });
  await waitForPageLoad({ page, timeout: 10000 });
  
  console.log(`📅 Checking availability for ${date}`);
  
  await page.waitForTimeout(2000);
  
  // Take screenshot of day view
  await page.screenshot({ 
    path: `/tmp/gcal-availability-${date}.png`, 
    scale: 'css',
    fullPage: true
  });
  
  // Extract busy times
  const busyTimes = await page.evaluate(() => {
    const events = document.querySelectorAll('[data-eventid]');
    const times = [];
    
    events.forEach(el => {
      const text = el.innerText;
      // Try to extract time from event chip
      const timeMatch = text.match(/\d{1,2}:\d{2}/);
      if (timeMatch) {
        times.push({
          event: text,
          time: timeMatch[0]
        });
      }
    });
    
    return times;
  });
  
  console.log('🔴 Busy times:');
  busyTimes.forEach(t => console.log(`  - ${t.time}: ${t.event}`));
  
  // Suggest available slots (simple logic)
  const busyHours = new Set(busyTimes.map(t => parseInt(t.time.split(':')[0])));
  const workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  const freeHours = workHours.filter(h => !busyHours.has(h));
  
  console.log('🟢 Available hours:', freeHours.map(h => `${h}:00`).join(', '));
  
  return { date, busyTimes, freeHours };
}

/**
 * Script 19: Google Calendar Schedule Meeting with Investor
 * Complete workflow to schedule a meeting with an investor
 * 
 * @param {string} investorEmail - Investor's email
 * @param {string} investorName - Investor's name
 * @param {string} date - Meeting date YYYY-MM-DD
 * @param {string} time - Meeting time HH:MM
 * @param {number} durationMinutes - Meeting duration (default: 30)
 */
async function gcalScheduleInvestorMeeting(investorEmail, investorName, date, time, durationMinutes = 30) {
  // Calculate end time
  const [hours, minutes] = time.split(':').map(Number);
  const endHours = hours + Math.floor((minutes + durationMinutes) / 60);
  const endMinutes = (minutes + durationMinutes) % 60;
  const endTime = `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
  
  const title = `Vibe Browser Demo - ${investorName}`;
  const description = `Meeting with ${investorName} to demo Vibe Browser.

Agenda:
- Quick intro
- Live product demo
- Q&A
- Next steps

Demo: https://vibebrowser.app/demo.mp4
Deck: https://vibebrowser.app/deck`;

  const location = 'Google Meet'; // Will auto-add Meet link
  
  console.log(`📅 Scheduling meeting with ${investorName}`);
  console.log(`   Date: ${date} ${time}-${endTime}`);
  
  await gcalCreateEvent(
    title,
    date,
    time,
    endTime,
    description,
    investorEmail,
    location
  );
  
  console.log(`\n✅ Investor meeting scheduled!`);
  console.log(`   Title: ${title}`);
  console.log(`   Guest: ${investorEmail}`);
  
  return {
    title,
    investorEmail,
    investorName,
    date,
    time: `${time}-${endTime}`,
    scheduled: true
  };
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get all targets from state
 * Shows summary of all outreach activities
 */
function getOutreachSummary() {
  const summary = {
    linkedin: state.linkedinTargets || [],
    twitter: state.twitterTargets || [],
    instagram: state.instagramTargets || [],
    emails: state.verifiedEmails || []
  };
  
  console.log('📊 OUTREACH SUMMARY');
  console.log('='.repeat(50));
  console.log(`LinkedIn Targets: ${summary.linkedin.length}`);
  console.log(`Twitter Targets: ${summary.twitter.length}`);
  console.log(`Instagram Targets: ${summary.instagram.length}`);
  console.log(`Verified Emails: ${summary.emails.length}`);
  console.log('='.repeat(50));
  
  return summary;
}

/**
 * Export state to JSON for tracking
 */
function exportOutreachData() {
  const data = {
    exported: new Date().toISOString(),
    linkedin: state.linkedinTargets || [],
    twitter: state.twitterTargets || [],
    instagram: state.instagramTargets || [],
    emails: state.verifiedEmails || []
  };
  
  const json = JSON.stringify(data, null, 2);
  console.log('📤 OUTREACH DATA EXPORT');
  console.log(json);
  
  return data;
}

// =============================================================================
// EXAMPLE USAGE WORKFLOWS
// =============================================================================

/**
 * Example 1: Full LinkedIn Outreach Workflow
 */
async function linkedinFullWorkflow(username, connectionMessage, followUpMessage) {
  console.log(`🚀 Starting LinkedIn workflow for ${username}`);
  
  // Day 1: Research
  console.log('\n📋 Step 1: Research');
  await linkedinProfileResearch(username);
  
  // Day 2-4: Engagement
  console.log('\n❤️ Step 2: Engagement');
  await linkedinEngagePosts(username, 3);
  
  // Day 5: Connection Request
  console.log('\n🤝 Step 3: Connection Request');
  await linkedinSendConnectionRequest(username, connectionMessage);
  
  console.log('\n⏰ Waiting for connection to be accepted...');
  console.log('(Run linkedinSendMessage after connection accepted)');
  
  // Day 7+: Follow-up (manual trigger after connection accepted)
  // await linkedinSendMessage(username, followUpMessage);
}

/**
 * Example 2: Full Twitter Outreach Workflow
 */
async function twitterFullWorkflow(username, dmMessage) {
  console.log(`🚀 Starting Twitter workflow for @${username}`);
  
  // Day 1: Research & Follow
  console.log('\n📋 Step 1: Research');
  await twitterProfileResearch(username);
  
  console.log('\n👥 Step 2: Follow & Engage');
  await twitterFollowAndEngage(username, 5);
  
  console.log('\n⏰ Waiting 2-3 days before sending DM...');
  console.log('(Run twitterSendDM after engagement period)');
  
  // Day 5: Send DM (manual trigger after engagement)
  // await twitterSendDM(username, dmMessage);
}

// =============================================================================
// EXPORTS
// =============================================================================

// Export all functions for use in Playwriter
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    // LinkedIn
    linkedinProfileResearch,
    linkedinEngagePosts,
    linkedinSendConnectionRequest,
    linkedinSendMessage,
    
    // Twitter
    twitterProfileResearch,
    twitterFollowAndEngage,
    twitterSendDM,
    
    // Email
    hunterFindEmail,
    
    // Gmail (Browser Automation)
    gmailComposeAndSend,
    gmailCreateDraft,
    gmailSearch,
    gmailReadEmail,
    
    // Google Calendar (Browser Automation)
    gcalCreateEvent,
    gcalQuickEvent,
    gcalListEvents,
    gcalCheckAvailability,
    gcalScheduleInvestorMeeting,
    
    // Instagram
    instagramProfileResearch,
    instagramFollowAndEngage,
    
    // Utilities
    getOutreachSummary,
    exportOutreachData,
    
    // Workflows
    linkedinFullWorkflow,
    twitterFullWorkflow
  };
}

console.log('✅ Playwriter Outreach Scripts Loaded');
console.log('📚 Available functions:');
console.log('');
console.log('  LinkedIn:');
console.log('  - linkedinProfileResearch(username)');
console.log('  - linkedinEngagePosts(username, numPosts)');
console.log('  - linkedinSendConnectionRequest(username, message)');
console.log('  - linkedinSendMessage(username, message)');
console.log('');
console.log('  Twitter:');
console.log('  - twitterProfileResearch(username)');
console.log('  - twitterFollowAndEngage(username, numTweets)');
console.log('  - twitterSendDM(username, message)');
console.log('');
console.log('  Gmail (Browser Automation):');
console.log('  - gmailComposeAndSend(to, subject, body, cc)');
console.log('  - gmailCreateDraft(to, subject, body, cc)');
console.log('  - gmailSearch(query)');
console.log('  - gmailReadEmail(index)');
console.log('');
console.log('  Google Calendar (Browser Automation):');
console.log('  - gcalCreateEvent(title, date, startTime, endTime, description, guests, location)');
console.log('  - gcalQuickEvent(quickText)');
console.log('  - gcalListEvents(startDate)');
console.log('  - gcalCheckAvailability(date)');
console.log('  - gcalScheduleInvestorMeeting(investorEmail, investorName, date, time, durationMinutes)');
console.log('');
console.log('  Email Verification:');
console.log('  - hunterFindEmail(firstName, lastName, domain)');
console.log('');
console.log('  Instagram:');
console.log('  - instagramProfileResearch(username)');
console.log('  - instagramFollowAndEngage(username, numPosts)');
console.log('');
console.log('  Utilities:');
console.log('  - getOutreachSummary()');
console.log('  - exportOutreachData()');
