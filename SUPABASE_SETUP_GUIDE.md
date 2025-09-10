# Supabase Setup Guide for VibeBrowser Waitlist

## Problem
The current Supabase project URL (`svhdffutjfzislubdzos.supabase.co`) doesn't exist. You need to create a new Supabase project or provide correct credentials.

## Steps to Fix

### Option 1: Create New Supabase Project (Recommended)

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com
   - Sign in or create account

2. **Create New Project**
   - Click "New Project"
   - Name: `vibebrowser-waitlist` (or any name)
   - Database Password: Create a strong password
   - Region: Choose closest to your users
   - Click "Create Project"

3. **Get Your Credentials**
   After project creation, go to Settings > API:
   - **Project URL**: `https://YOUR_PROJECT_REF.supabase.co`
   - **Anon/Public Key**: `eyJhbGc...` (long JWT token)

4. **Create Waitlist Table**
   Go to SQL Editor and run:
   ```sql
   CREATE TABLE vibebrowser_waitlist (
     id SERIAL PRIMARY KEY,
     email VARCHAR(255) UNIQUE NOT NULL,
     tier VARCHAR(50) DEFAULT 'free',
     source VARCHAR(50) DEFAULT 'website',
     metadata JSONB,
     confirmed BOOLEAN DEFAULT false,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Create index for faster queries
   CREATE INDEX idx_waitlist_email ON vibebrowser_waitlist(email);
   CREATE INDEX idx_waitlist_created_at ON vibebrowser_waitlist(created_at DESC);
   ```

5. **Update Environment Variables**
   
   In `.env.local`:
   ```env
   SUPABASE_PROJECT_URL=https://YOUR_PROJECT_REF.supabase.co
   SUPABASE_API_KEY=your_anon_key_here
   ```

   In Vercel Dashboard (vercel.com):
   - Go to your project settings
   - Navigate to Environment Variables
   - Update:
     - `SUPABASE_PROJECT_URL` = Your new project URL
     - `SUPABASE_API_KEY` = Your new anon key

### Option 2: Use Existing Supabase Project

If you already have a Supabase project:

1. **Find Your Project**
   - Go to: https://supabase.com/dashboard
   - Select your project

2. **Get Credentials**
   - Settings > API
   - Copy the Project URL and anon key

3. **Update Environment Variables**
   - Update `.env.local` and Vercel with correct values

## Test Script

After setup, test with this script:

```javascript
// test-supabase.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase
    .from('vibebrowser_waitlist')
    .select('count');
  
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Success! Connected to Supabase');
  }
}

test();
```

## Current Status
❌ Supabase not working - invalid project URL
✅ Code is ready - just needs valid Supabase credentials

## Action Required
You need to either:
1. Create a new Supabase project (free at supabase.com)
2. Provide correct Supabase credentials if you have an existing project

Once you have the credentials, update:
- `.env.local` file
- Vercel environment variables
- Then redeploy