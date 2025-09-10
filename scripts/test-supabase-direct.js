const { createClient } = require('@supabase/supabase-js');
const { Pool } = require('pg');
require('dotenv').config({ path: '.env' });

async function testSupabase() {
  const projectId = process.env.SUPABASE_PROJECT_ID;
  const dbPassword = process.env.SUPABASE_DB_PASSWORD;
  const apiKey = process.env.SUPABASE_API_KEY;
  
  console.log('Testing Supabase Project:', projectId);
  console.log('=====================================\n');

  // Test 1: Try different Supabase URL formats
  const urlVariants = [
    `https://${projectId}.supabase.co`,
    `https://${projectId}.supabase.io`,  // Older Supabase projects used .io
    `https://${projectId}.supabase.in`,  // India region
    `https://${projectId}.supabase.net`, // Alternative domain
  ];

  for (const url of urlVariants) {
    console.log(`Testing URL: ${url}`);
    try {
      const supabase = createClient(url, apiKey);
      
      // Try a simple health check
      const { data, error } = await supabase
        .from('vibebrowser_waitlist')
        .select('count')
        .maybeSingle();
      
      if (!error || error.code === 'PGRST116') {
        console.log(`✅ Found working URL: ${url}`);
        if (error?.code === 'PGRST116') {
          console.log('   Note: Table needs to be created');
        }
        
        // Update the .env file with working URL
        console.log('\n📝 Update your .env with:');
        console.log(`SUPABASE_PROJECT_URL=${url}`);
        break;
      } else {
        console.log(`❌ Failed: ${error.message}`);
      }
    } catch (err) {
      console.log(`❌ Error: ${err.message}`);
    }
  }

  // Test 2: Try direct PostgreSQL connections
  console.log('\n\nTesting Direct PostgreSQL Connections:');
  console.log('======================================\n');
  
  const pgConnections = [
    {
      name: 'Pooler Connection (Transaction)',
      host: `aws-0-us-east-2.pooler.supabase.com`,
      port: 5432,
      database: 'postgres',
      user: `postgres.${projectId}`,
      password: dbPassword,
    },
    {
      name: 'Pooler Connection (Session)',  
      host: `aws-0-us-east-2.pooler.supabase.com`,
      port: 6543,
      database: 'postgres',
      user: `postgres.${projectId}`,
      password: dbPassword,
    },
    {
      name: 'Direct Connection',
      host: `db.${projectId}.supabase.co`,
      port: 5432,
      database: 'postgres', 
      user: 'postgres',
      password: dbPassword,
    },
    {
      name: 'Alternative Region (US West)',
      host: `aws-0-us-west-1.pooler.supabase.com`,
      port: 6543,
      database: 'postgres',
      user: `postgres.${projectId}`,
      password: dbPassword,
    }
  ];

  for (const config of pgConnections) {
    console.log(`Testing: ${config.name}`);
    console.log(`Host: ${config.host}`);
    
    const pool = new Pool({
      ...config,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 5000,
    });

    try {
      const client = await pool.connect();
      const result = await client.query('SELECT NOW()');
      console.log(`✅ SUCCESS! Connection works!`);
      console.log(`   Time: ${result.rows[0].now}`);
      
      // Check if table exists
      const tableCheck = await client.query(`
        SELECT EXISTS (
          SELECT FROM pg_tables 
          WHERE schemaname = 'public' 
          AND tablename = 'vibebrowser_waitlist'
        );
      `);
      
      if (!tableCheck.rows[0].exists) {
        console.log('   Creating waitlist table...');
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
        console.log('   ✅ Table created!');
      } else {
        console.log('   ✅ Table exists');
      }
      
      console.log('\n📝 Working connection string:');
      console.log(`postgresql://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}?sslmode=require`);
      
      client.release();
      await pool.end();
      return; // Exit on first success
      
    } catch (err) {
      console.log(`❌ Failed: ${err.message}\n`);
    } finally {
      await pool.end().catch(() => {});
    }
  }

  console.log('\n❗ All connection attempts failed.');
  console.log('The Supabase project may need to be recreated or credentials are incorrect.');
}

testSupabase().catch(console.error);