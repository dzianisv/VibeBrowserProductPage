const { createClient } = require('@supabase/supabase-js');
const { Pool } = require('pg');
require('dotenv').config({ path: '.env' });

async function testSupabaseConnection() {
  console.log('Testing Supabase connections...\n');

  // Test 1: Direct Supabase Client
  const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
  const supabaseKey = process.env.SUPABASE_API_KEY;
  
  console.log('1. Testing Supabase REST API:');
  console.log(`   URL: ${supabaseUrl}`);
  
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Try to query or create table
    const { error: tableError } = await supabase.rpc('create_table_if_not_exists', {
      table_sql: `
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
    }).timeout(5000);

    if (tableError) {
      // Try a simple query instead
      const { data, error, status } = await supabase
        .from('vibebrowser_waitlist')
        .select('count')
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          console.log('   ❌ Table does not exist (needs to be created)');
        } else {
          console.log(`   ❌ Error: ${error.message}`);
        }
      } else {
        console.log('   ✅ Supabase REST API is working!');
      }
    }
  } catch (err) {
    console.log(`   ❌ Failed: ${err.message}`);
  }

  // Test 2: Direct PostgreSQL Connection via Pooler
  console.log('\n2. Testing PostgreSQL Pooler Connection:');
  const dbUrl = process.env.DATABASE_URL;
  console.log(`   URL: ${dbUrl ? dbUrl.split('@')[1].split('/')[0] : 'Not set'}`);
  
  if (dbUrl) {
    const pool = new Pool({
      connectionString: dbUrl,
      ssl: { rejectUnauthorized: false }
    });

    try {
      const client = await pool.connect();
      await client.query('SELECT NOW()');
      console.log('   ✅ PostgreSQL connection works!');
      
      // Check if table exists
      const tableCheck = await client.query(`
        SELECT EXISTS (
          SELECT FROM pg_tables 
          WHERE schemaname = 'public' 
          AND tablename = 'vibebrowser_waitlist'
        );
      `);
      
      if (tableCheck.rows[0].exists) {
        console.log('   ✅ Table vibebrowser_waitlist exists');
      } else {
        console.log('   ⚠️  Table vibebrowser_waitlist does not exist');
        
        // Try to create it
        try {
          await client.query(`
            CREATE TABLE vibebrowser_waitlist (
              id SERIAL PRIMARY KEY,
              email VARCHAR(255) UNIQUE NOT NULL,
              tier VARCHAR(50) DEFAULT 'free',
              source VARCHAR(50) DEFAULT 'website',
              metadata JSONB,
              confirmed BOOLEAN DEFAULT false,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
          `);
          console.log('   ✅ Table created successfully');
        } catch (createErr) {
          console.log('   ❌ Could not create table:', createErr.message);
        }
      }
      
      client.release();
    } catch (err) {
      console.log(`   ❌ Failed: ${err.message}`);
    } finally {
      await pool.end();
    }
  }

  // Test 3: Alternative connection methods
  console.log('\n3. Testing alternative Supabase endpoints:');
  
  // Try the auth endpoint
  try {
    const response = await fetch(`${supabaseUrl}/auth/v1/health`, {
      headers: {
        'apikey': supabaseKey
      }
    });
    
    if (response.ok) {
      console.log('   ✅ Supabase Auth endpoint is reachable');
    } else {
      console.log(`   ❌ Auth endpoint returned: ${response.status}`);
    }
  } catch (err) {
    console.log(`   ❌ Cannot reach Supabase Auth: ${err.message}`);
  }

  console.log('\n📋 Summary:');
  console.log('If all tests fail, the Supabase project may not exist or credentials are incorrect.');
  console.log('You may need to create a new Supabase project at https://supabase.com');
}

testSupabaseConnection();