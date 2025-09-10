import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const SUPABASE_PROJECT_URL = process.env.SUPABASE_PROJECT_URL;
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY;

if (!SUPABASE_PROJECT_URL || !SUPABASE_API_KEY) {
  throw new Error('Supabase environment variables are not set. Check .env.local');
}

async function querySupabaseViaAPI(email: string): Promise<boolean> {
  const url = `${SUPABASE_PROJECT_URL}/rest/v1/vibebrowser_waitlist?email=eq.${encodeURIComponent(email.toLowerCase())}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'apikey': SUPABASE_API_KEY,
        'Authorization': `Bearer ${SUPABASE_API_KEY}`,
      },
    });
    
    if (!response.ok) {
      console.error('Supabase API error:', response.status, await response.text());
      return false;
    }
    
    const data = await response.json();
    return Array.isArray(data) && data.length > 0;
  } catch (error) {
    console.error('Failed to query Supabase:', error);
    return false;
  }
}

async function deleteTestEmailViaAPI(email: string): Promise<void> {
  const url = `${SUPABASE_PROJECT_URL}/rest/v1/vibebrowser_waitlist?email=eq.${encodeURIComponent(email.toLowerCase())}`;
  
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_API_KEY,
        'Authorization': `Bearer ${SUPABASE_API_KEY}`,
      },
    });
    
    if (!response.ok) {
      console.error('Failed to delete test email:', response.status);
    } else {
      console.log(`Cleaned up test email: ${email}`);
    }
  } catch (error) {
    console.error('Failed to delete test email:', error);
  }
}

test.describe('Waitlist Functionality (API)', () => {
  const testEmail = `test-${Date.now()}@example.com`;

  test.beforeEach(async () => {
    // Clean up any existing test email before test
    await deleteTestEmailViaAPI(testEmail);
  });

  test.afterEach(async () => {
    // Clean up test email after test
    await deleteTestEmailViaAPI(testEmail);
  });

  test('should successfully submit email to waitlist and verify via API', async ({ page }) => {
    // Navigate to the landing page
    const baseURL = process.env.PLAYWRIGHT_TEST_URL || 'http://localhost:3001';
    await page.goto(baseURL);
    
    // Wait for the page to load
    await page.waitForSelector('button:has-text("Join Waitlist")', { timeout: 10000 });

    // Click the Join Waitlist button to open the modal
    await page.click('button:has-text("Join Waitlist")');

    // Wait for the modal to appear
    await page.waitForSelector('[role="dialog"]', { timeout: 5000 });

    // Find and fill the email input
    const emailInput = page.locator('input[type="email"], input[placeholder*="email" i]');
    await expect(emailInput).toBeVisible();
    await emailInput.fill(testEmail);

    // Submit the form
    const submitButton = page.locator('[role="dialog"] button:has-text("Join"), [role="dialog"] button:has-text("Submit")');
    await submitButton.click();

    // Wait for success message or confirmation
    const successIndicator = page.locator('text=/success|thank|joined|you\'re in|confirmed/i').first();
    await expect(successIndicator).toBeVisible({ timeout: 10000 });

    // Wait a bit for the database write to complete
    await page.waitForTimeout(3000);

    // Verify the email exists via Supabase API
    const emailExists = await querySupabaseViaAPI(testEmail);
    expect(emailExists).toBe(true);
  });

  test('should handle server errors gracefully', async ({ page }) => {
    // Navigate to the landing page
    const baseURL = process.env.PLAYWRIGHT_TEST_URL || 'http://localhost:3001';
    await page.goto(baseURL);
    
    // Wait for the page to load
    await page.waitForSelector('button:has-text("Join Waitlist")', { timeout: 10000 });

    // Click the Join Waitlist button
    await page.click('button:has-text("Join Waitlist")');

    // Wait for the modal
    await page.waitForSelector('[role="dialog"]', { timeout: 5000 });

    // Fill with an invalid email to test validation
    const emailInput = page.locator('input[type="email"], input[placeholder*="email" i]');
    await emailInput.fill('not-an-email');

    // Try to submit
    const submitButton = page.locator('[role="dialog"] button:has-text("Join"), [role="dialog"] button:has-text("Submit")');
    await submitButton.click();

    // The dialog should still be visible (form didn't submit)
    await expect(page.locator('[role="dialog"]')).toBeVisible();
  });
});

test.describe('Verify Supabase Configuration', () => {
  test('should be able to connect to Supabase API', async () => {
    const url = `${SUPABASE_PROJECT_URL}/rest/v1/vibebrowser_waitlist?select=count`;
    
    const response = await fetch(url, {
      method: 'HEAD',
      headers: {
        'apikey': SUPABASE_API_KEY,
        'Authorization': `Bearer ${SUPABASE_API_KEY}`,
      },
    });
    
    // Should get a valid response (200 or 206 for partial content)
    expect(response.ok || response.status === 206).toBe(true);
  });
});