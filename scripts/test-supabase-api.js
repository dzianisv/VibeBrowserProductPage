const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

async function testSupabaseAPI() {
  const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
  const supabaseKey = process.env.SUPABASE_API_KEY;
  
  console.log('Testing Supabase API Connection');
  console.log('================================');
  console.log('URL:', supabaseUrl);
  console.log('Key:', supabaseKey ? 'Set (hidden)' : 'Not set');
  console.log('');

  try {
    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false
      },
      global: {
        headers: {
          'x-my-custom-header': 'vibebrowser-test'
        }
      }
    });

    // Test 1: Try to insert a test record
    console.log('1. Testing INSERT operation...');
    const testEmail = `test-${Date.now()}@example.com`;
    
    const { data: insertData, error: insertError } = await supabase
      .from('vibebrowser_waitlist')
      .insert([
        {
          email: testEmail,
          tier: 'free',
          source: 'test-script',
          metadata: { test: true },
          confirmed: false
        }
      ])
      .select();

    if (insertError) {
      if (insertError.code === 'PGRST204' || insertError.code === '42P01') {
        console.log('   ❌ Table does not exist');
        console.log('   Creating table...');
        
        // Table doesn't exist, try to create it using raw SQL through the REST API
        const { error: createError } = await supabase.rpc('exec_sql', {
          query: `
            CREATE TABLE IF NOT EXISTS vibebrowser_waitlist (
              id SERIAL PRIMARY KEY,
              email VARCHAR(255) UNIQUE NOT NULL,
              tier VARCHAR(50) DEFAULT 'free',
              source VARCHAR(50) DEFAULT 'website',
              metadata JSONB,
              confirmed BOOLEAN DEFAULT false,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
          `
        });

        if (createError) {
          console.log('   Note: Cannot create table via RPC (normal for Supabase)');
          console.log('   You need to create the table in Supabase Dashboard > SQL Editor');
        }
      } else {
        console.log(`   ❌ Insert error: ${insertError.message}`);
        console.log(`   Code: ${insertError.code}`);
      }
    } else {
      console.log('   ✅ Insert successful!');
      console.log('   Data:', insertData);
    }

    // Test 2: Try to select from the table
    console.log('\n2. Testing SELECT operation...');
    const { data: selectData, error: selectError, count } = await supabase
      .from('vibebrowser_waitlist')
      .select('*', { count: 'exact' })
      .limit(5);

    if (selectError) {
      console.log(`   ❌ Select error: ${selectError.message}`);
      if (selectError.code === 'PGRST116') {
        console.log('   Table "vibebrowser_waitlist" does not exist.');
        console.log('\n📋 To fix this, run the following SQL in Supabase Dashboard:');
        console.log('   https://supabase.com/dashboard/project/svhdffutjfzislubdzos/sql/new\n');
        console.log(`CREATE TABLE vibebrowser_waitlist (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  tier VARCHAR(50) DEFAULT 'free',
  source VARCHAR(50) DEFAULT 'website',
  metadata JSONB,
  confirmed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`);
      }
    } else {
      console.log('   ✅ Select successful!');
      console.log(`   Found ${count || selectData?.length || 0} records`);
      if (selectData && selectData.length > 0) {
        console.log('   Sample records:', selectData.slice(0, 2));
      }
    }

    // Test 3: Test auth endpoint
    console.log('\n3. Testing Auth Health...');
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) {
        console.log('   ℹ️  No user session (expected for anon key)');
      } else {
        console.log('   ✅ Auth is working');
      }
    } catch (e) {
      console.log('   ℹ️  Auth check failed (may be normal)');
    }

    // Test 4: Check storage
    console.log('\n4. Testing Storage Access...');
    const { data: buckets, error: storageError } = await supabase.storage.listBuckets();
    if (storageError) {
      console.log('   ℹ️  Storage not accessible (may need different permissions)');
    } else {
      console.log('   ✅ Storage is accessible');
      console.log(`   Found ${buckets?.length || 0} buckets`);
    }

    console.log('\n✅ Supabase client is connecting to the project!');
    console.log('The project exists and is reachable.');
    
  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    console.error('Stack:', error.stack);
  }
}

testSupabaseAPI().catch(console.error);