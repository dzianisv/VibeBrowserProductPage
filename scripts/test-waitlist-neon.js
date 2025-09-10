const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  console.error('❌ No database connection string found in environment variables');
  process.exit(1);
}

async function testWaitlist() {
  const pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('🔄 Connecting to Neon database...');
    
    // Test connection
    const client = await pool.connect();
    console.log('✅ Connected to Neon database');
    
    // Create table if it doesn't exist
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
    console.log('✅ Table vibebrowser_waitlist exists or was created');
    
    // Test insert
    const testEmail = `test-${Date.now()}@example.com`;
    const insertResult = await client.query(
      `INSERT INTO vibebrowser_waitlist (email, tier, source, metadata, confirmed)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email) DO NOTHING
       RETURNING *`,
      [
        testEmail,
        'free',
        'test-script',
        JSON.stringify({ timestamp: new Date().toISOString() }),
        false
      ]
    );
    
    if (insertResult.rows.length > 0) {
      console.log('✅ Test email inserted:', testEmail);
    }
    
    // Query test
    const queryResult = await client.query(
      'SELECT COUNT(*) as count FROM vibebrowser_waitlist'
    );
    console.log(`✅ Total waitlist signups: ${queryResult.rows[0].count}`);
    
    // Clean up test email
    await client.query(
      'DELETE FROM vibebrowser_waitlist WHERE email = $1',
      [testEmail]
    );
    console.log('✅ Test email cleaned up');
    
    client.release();
    console.log('\n🎉 All tests passed! Waitlist is working with Neon database.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.detail) console.error('Details:', error.detail);
  } finally {
    await pool.end();
  }
}

testWaitlist();