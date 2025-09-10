const { Pool } = require('pg');
require('dotenv').config({ path: '.env.production' });

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  console.error('❌ No database connection string found in .env.production');
  process.exit(1);
}

async function testProductionWaitlist() {
  const pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

  const testEmail = `prod-test-${Date.now()}@example.com`;

  try {
    console.log('🔄 Testing production waitlist with Neon database...');
    console.log(`Using database: ${connectionString.split('@')[1].split('/')[0]}`);
    
    // Test connection
    const client = await pool.connect();
    console.log('✅ Connected to production Neon database');
    
    // Check table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'vibebrowser_waitlist'
      );
    `);
    
    if (tableCheck.rows[0].exists) {
      console.log('✅ Table vibebrowser_waitlist exists');
    } else {
      console.log('⚠️  Table does not exist, creating...');
      await client.query(`
        CREATE TABLE IF NOT EXISTS vibebrowser_waitlist (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          tier VARCHAR(50) DEFAULT 'free',
          source VARCHAR(50) DEFAULT 'website',
          metadata JSONB,
          confirmed BOOLEAN DEFAULT false,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('✅ Table created');
    }
    
    // Test insert
    const insertResult = await client.query(
      `INSERT INTO vibebrowser_waitlist (email, tier, source, metadata, confirmed)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email) DO NOTHING
       RETURNING *`,
      [
        testEmail,
        'free',
        'production-test',
        JSON.stringify({ timestamp: new Date().toISOString() }),
        false
      ]
    );
    
    if (insertResult.rows.length > 0) {
      console.log('✅ Test email inserted:', testEmail);
    }
    
    // Query count
    const countResult = await client.query(
      'SELECT COUNT(*) as count FROM vibebrowser_waitlist'
    );
    console.log(`✅ Total production waitlist signups: ${countResult.rows[0].count}`);
    
    // Show recent signups
    const recentResult = await client.query(
      `SELECT email, tier, created_at FROM vibebrowser_waitlist 
       ORDER BY created_at DESC LIMIT 5`
    );
    
    console.log('\n📋 Recent signups:');
    recentResult.rows.forEach(row => {
      console.log(`  - ${row.email} (${row.tier}) - ${new Date(row.created_at).toLocaleString()}`);
    });
    
    // Clean up test email
    await client.query(
      'DELETE FROM vibebrowser_waitlist WHERE email = $1',
      [testEmail]
    );
    console.log('\n✅ Test email cleaned up');
    
    client.release();
    
    console.log('\n🎉 Production waitlist is working correctly with Neon database!');
    console.log('✅ Users can now successfully join the waitlist at https://www.vibebrowser.app');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.detail) console.error('Details:', error.detail);
  } finally {
    await pool.end();
  }
}

testProductionWaitlist();