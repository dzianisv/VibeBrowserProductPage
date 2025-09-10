import { test, expect } from '@playwright/test';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error('Database connection string not found in environment variables');
}

async function queryNeonDatabase(email: string): Promise<boolean> {
  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const result = await pool.query(
      'SELECT * FROM vibebrowser_waitlist WHERE email = $1',
      [email.toLowerCase()]
    );
    return result.rows.length > 0;
  } catch (error) {
    console.error('Database query error:', error);
    return false;
  } finally {
    await pool.end();
  }
}

async function deleteTestEmail(email: string): Promise<void> {
  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await pool.query(
      'DELETE FROM vibebrowser_waitlist WHERE email = $1',
      [email.toLowerCase()]
    );
    console.log(`Cleaned up test email: ${email}`);
  } catch (error) {
    console.error('Database cleanup error:', error);
  } finally {
    await pool.end();
  }
}

test.describe('Waitlist Functionality (Neon)', () => {
  const testEmail = `test-${Date.now()}@example.com`;

  test.beforeEach(async () => {
    // Clean up any existing test email before test
    await deleteTestEmail(testEmail);
  });

  test.afterEach(async () => {
    // Clean up test email after test
    await deleteTestEmail(testEmail);
  });

  test('should successfully submit email to waitlist and verify in Neon database', async ({ page }) => {
    // Navigate to the landing page
    const baseURL = process.env.PLAYWRIGHT_TEST_URL || 'http://localhost:3002';
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
    const successIndicator = page.locator('text=/success|thank|joined|you\'re in|confirmed|you\'re on the list/i').first();
    await expect(successIndicator).toBeVisible({ timeout: 10000 });

    // Wait a bit for the database write to complete
    await page.waitForTimeout(2000);

    // Verify the email exists in the database
    const emailExists = await queryNeonDatabase(testEmail);
    expect(emailExists).toBe(true);
  });

  test('should prevent duplicate email submissions', async ({ page }) => {
    // First, add the email to the database
    const baseURL = process.env.PLAYWRIGHT_TEST_URL || 'http://localhost:3002';
    await page.goto(baseURL);
    await page.click('button:has-text("Join Waitlist")');
    await page.waitForSelector('[role="dialog"]');
    
    const emailInput = page.locator('input[type="email"], input[placeholder*="email" i]');
    await emailInput.fill(testEmail);
    
    const submitButton = page.locator('[role="dialog"] button:has-text("Join"), [role="dialog"] button:has-text("Submit")');
    await submitButton.click();
    
    // Wait for initial submission to complete
    await page.waitForTimeout(3000);
    
    // Close dialog and reopen
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
    
    // Try to submit the same email again
    await page.click('button:has-text("Join Waitlist")');
    await page.waitForSelector('[role="dialog"]');
    
    const emailInput2 = page.locator('input[type="email"], input[placeholder*="email" i]');
    await emailInput2.fill(testEmail);
    
    const submitButton2 = page.locator('[role="dialog"] button:has-text("Join"), [role="dialog"] button:has-text("Submit")');
    await submitButton2.click();
    
    // Should show error message about duplicate email
    const errorMessage = page.locator('text=/already|duplicate|registered/i').first();
    await expect(errorMessage).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Verify Neon Database Configuration', () => {
  test('should be able to connect to Neon database and table exists', async () => {
    const pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false }
    });

    try {
      // Check connection and table exists
      const result = await pool.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'vibebrowser_waitlist'
        );
      `);
      
      expect(result.rows[0].exists).toBe(true);
      console.log('✅ Neon database connected and table exists');
      
    } finally {
      await pool.end();
    }
  });
});