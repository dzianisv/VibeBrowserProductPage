const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  console.log('🚀 Setting up VibeBrowser waitlist table in Supabase...\n');

  try {
    // Create the table
    console.log('Creating vibebrowser_waitlist table...');
    const { error: createTableError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS vibebrowser_waitlist (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          tier VARCHAR(10) DEFAULT 'free',
          source VARCHAR(50) DEFAULT 'website',
          metadata JSONB DEFAULT '{}',
          confirmed BOOLEAN DEFAULT false,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    }).single();

    if (createTableError && !createTableError.message?.includes('already exists')) {
      // Table might already exist or RPC might not be available, try direct insert to test
      console.log('Note: Could not create table via RPC (this is normal if table exists or RPC is not enabled)');
    } else {
      console.log('✅ Table created successfully');
    }

    // Test if table exists by trying to query it
    console.log('\nVerifying table exists...');
    const { data: testQuery, error: testError } = await supabase
      .from('vibebrowser_waitlist')
      .select('count')
      .limit(1);

    if (testError) {
      if (testError.message?.includes('relation') && testError.message?.includes('does not exist')) {
        console.log('\n❌ Table does not exist. Please run the following SQL in your Supabase SQL Editor:');
        console.log('\n----------------------------------------');
        console.log(`
-- Create waitlist table for VibeBrowser in Supabase
CREATE TABLE IF NOT EXISTS vibebrowser_waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  tier VARCHAR(10) DEFAULT 'free',
  source VARCHAR(50) DEFAULT 'website',
  metadata JSONB DEFAULT '{}',
  confirmed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_vibebrowser_waitlist_email ON vibebrowser_waitlist(email);
CREATE INDEX IF NOT EXISTS idx_vibebrowser_waitlist_created_at ON vibebrowser_waitlist(created_at);
CREATE INDEX IF NOT EXISTS idx_vibebrowser_waitlist_tier ON vibebrowser_waitlist(tier);

-- Enable RLS
ALTER TABLE vibebrowser_waitlist ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow public inserts" ON vibebrowser_waitlist
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated reads" ON vibebrowser_waitlist
  FOR SELECT USING (auth.role() = 'authenticated');

-- Update trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_vibebrowser_waitlist_updated_at 
  BEFORE UPDATE ON vibebrowser_waitlist 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
        `);
        console.log('----------------------------------------\n');
        console.log('Go to: https://supabase.com/dashboard/project/' + supabaseUrl.split('.')[0].split('//')[1] + '/sql/new');
        return;
      } else {
        console.log('⚠️  Warning:', testError.message);
      }
    } else {
      console.log('✅ Table exists and is accessible');
    }

    // Test insert capability
    console.log('\nTesting insert capability...');
    const testEmail = `test_${Date.now()}@example.com`;
    const { data: insertData, error: insertError } = await supabase
      .from('vibebrowser_waitlist')
      .insert([
        {
          email: testEmail,
          tier: 'free',
          source: 'setup_script',
          metadata: { test: true },
          confirmed: false
        }
      ])
      .select();

    if (insertError) {
      console.log('⚠️  Insert test failed:', insertError.message);
      console.log('You may need to configure RLS policies in Supabase dashboard');
    } else {
      console.log('✅ Insert test successful');
      
      // Clean up test data
      const { error: deleteError } = await supabase
        .from('vibebrowser_waitlist')
        .delete()
        .eq('email', testEmail);
      
      if (!deleteError) {
        console.log('✅ Test data cleaned up');
      }
    }

    // Get current stats
    console.log('\nChecking current waitlist stats...');
    const { count, error: countError } = await supabase
      .from('vibebrowser_waitlist')
      .select('*', { count: 'exact', head: true });

    if (!countError) {
      console.log(`📊 Current waitlist size: ${count || 0} signups`);
    }

    console.log('\n✨ Setup complete! The VibeBrowser waitlist is ready to use.');
    console.log('\nYou can now:');
    console.log('1. Visit the website and test the waitlist signup');
    console.log('2. Check the admin dashboard at /admin/waitlist');
    console.log('3. Start collecting signups!\n');

  } catch (error) {
    console.error('❌ Setup failed:', error);
    console.log('\nPlease manually run the SQL script in your Supabase dashboard:');
    console.log('File: scripts/create-supabase-waitlist-table.sql');
  }
}

setupDatabase();
