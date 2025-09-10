import { test, expect } from '@playwright/test';
import { Client } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const SUPABASE_PROJECT_URL = process.env.SUPABASE_PROJECT_URL;
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY;

if (!SUPABASE_PROJECT_URL || !SUPABASE_API_KEY) {
  throw new Error('Supabase environment variables are not set. Check .env.local');
}

// Extract database connection details from Supabase URL
const supabaseHost = SUPABASE_PROJECT_URL.replace('https://', '').split('.')[0];
const dbHost = `db.${supabaseHost}.supabase.co`;
const dbPassword = 'Zf!W3bBr0ws3r2024!';  // Using the password from test scripts
const dbName = 'postgres';
const dbUser = 'postgres';

async function querySupabaseDatabase(email: string): Promise<boolean> {
  const client = new Client({
    host: dbHost,
    port: 5432,
    database: dbName,
    user: dbUser,
    password: dbPassword,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    const query = 'SELECT * FROM vibebrowser_waitlist WHERE email = $1';
    const result = await client.query(query, [email.toLowerCase()]);
    return result.rows.length > 0;
  } catch (error) {
    console.error('Database query error:', error);
    return false;
  } finally {
    await client.end();
  }
}

async function deleteTestEmail(email: string): Promise<void> {
  const client = new Client({
    host: dbHost,
    port: 5432,
    database: dbName,
    user: dbUser,
    password: dbPassword,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    const query = 'DELETE FROM vibebrowser_waitlist WHERE email = $1';
    await client.query(query, [email.toLowerCase()]);
    console.log(`Cleaned up test email: ${email}`);
  } catch (error) {
    console.error('Database cleanup error:', error);
  } finally {
    await client.end();
  }
}

test.describe('Waitlist Functionality', () => {
  const testEmail = `test-${Date.now()}@example.com`;

  test.beforeEach(async ({ page }) => {
    // Clean up any existing test email before test
    await deleteTestEmail(testEmail);
  });

  test.afterEach(async () => {
    // Clean up test email after test
    await deleteTestEmail(testEmail);
  });

  test('should successfully submit email to waitlist and verify in database', async ({ page }) => {
    // Navigate to the landing page
    await page.goto('/');
    
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
    await page.waitForTimeout(2000);

    // Verify the email exists in the database
    const emailExists = await querySupabaseDatabase(testEmail);
    expect(emailExists).toBe(true);
  });

  test('should prevent duplicate email submissions', async ({ page }) => {
    // First, add the email to the database
    await page.goto('/');
    await page.click('button:has-text("Join Waitlist")');
    await page.waitForSelector('[role="dialog"]');
    
    const emailInput = page.locator('input[type="email"], input[placeholder*="email" i]');
    await emailInput.fill(testEmail);
    
    const submitButton = page.locator('[role="dialog"] button:has-text("Join"), [role="dialog"] button:has-text("Submit")');
    await submitButton.click();
    
    // Wait for initial submission to complete
    await page.waitForTimeout(3000);
    
    // Try to submit the same email again
    await page.reload();
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

  test('should validate email format', async ({ page }) => {
    await page.goto('/');
    await page.click('button:has-text("Join Waitlist")');
    await page.waitForSelector('[role="dialog"]');
    
    // Try invalid email
    const emailInput = page.locator('input[type="email"], input[placeholder*="email" i]');
    await emailInput.fill('invalid-email');
    
    const submitButton = page.locator('[role="dialog"] button:has-text("Join"), [role="dialog"] button:has-text("Submit")');
    await submitButton.click();
    
    // Check for validation error or that form didn't submit
    const errorMessage = page.locator('text=/invalid|enter.*valid.*email|please.*valid/i').first();
    const stillInDialog = page.locator('[role="dialog"]');
    
    // Either an error message should appear or the dialog should still be open
    await expect(async () => {
      const hasError = await errorMessage.isVisible().catch(() => false);
      const dialogOpen = await stillInDialog.isVisible().catch(() => false);
      expect(hasError || dialogOpen).toBe(true);
    }).toPass({ timeout: 5000 });
  });
});

test.describe('Waitlist API Diagnostics', () => {
  test('should verify Supabase connection and table exists', async () => {
    const client = new Client({
      host: dbHost,
      port: 5432,
      database: dbName,
      user: dbUser,
      password: dbPassword,
      ssl: { rejectUnauthorized: false }
    });

    try {
      await client.connect();
      
      // Check if table exists
      const tableQuery = `
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'vibebrowser_waitlist'
        );
      `;
      
      const result = await client.query(tableQuery);
      expect(result.rows[0].exists).toBe(true);
      
      // Check table structure
      const columnsQuery = `
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_schema = 'public' 
        AND table_name = 'vibebrowser_waitlist'
        ORDER BY ordinal_position;
      `;
      
      const columnsResult = await client.query(columnsQuery);
      console.log('Table columns:', columnsResult.rows);
      
      // Verify essential columns exist
      const columnNames = columnsResult.rows.map(row => row.column_name);
      expect(columnNames).toContain('email');
      expect(columnNames).toContain('created_at');
      
    } finally {
      await client.end();
    }
  });
});