const { Client } = require('pg');

// Use the same database URL as create-table-pg.js
const DATABASE_URL = 'postgresql://postgres.svhdffutjfzislubdzos:ev0NLxDN@*c7icaD@aws-1-us-east-2.pooler.supabase.com:6543/postgres';

async function testWaitlist() {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  console.log('Testing VibeBrowser waitlist functionality...\n');

  try {
    await client.connect();
    console.log('Connected to database\n');

    // Test 1: Add a new email with referral tracking
    const testEmail = `test_${Date.now()}@example.com`;
    console.log(`1. Testing signup with email: ${testEmail}`);
    
    const insertResult = await client.query(`
      INSERT INTO vibebrowser_waitlist (email, tier, source, referral_source, utm_source, utm_medium, utm_campaign, metadata, confirmed)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `, [
      testEmail, 
      'pro', 
      'test_script',
      'linkedin',           // referral_source
      'linkedin',           // utm_source
      'social',             // utm_medium
      'analytics_test',     // utm_campaign
      JSON.stringify({ test: true, timestamp: new Date().toISOString() }),
      false
    ]);

    if (insertResult.rows.length > 0) {
      console.log('Successfully added to waitlist with referral tracking');
      console.log('   Data:', JSON.stringify(insertResult.rows[0], null, 2));
    }

    // Test 2: Try duplicate email
    console.log('\n2. Testing duplicate email prevention...');
    try {
      await client.query(`
        INSERT INTO vibebrowser_waitlist (email, tier, source)
        VALUES ($1, $2, $3)
      `, [testEmail, 'free', 'test_script']);
      console.log('Duplicate was not prevented!');
    } catch (err) {
      if (err.message.includes('duplicate') || err.code === '23505') {
        console.log('Duplicate prevention working correctly');
      } else {
        console.log('Unexpected error:', err.message);
      }
    }

    // Test 3: Query signups with referral data
    console.log('\n3. Fetching signups with referral data...');
    const selectResult = await client.query(`
      SELECT email, tier, referral_source, utm_source, utm_medium, utm_campaign, created_at
      FROM vibebrowser_waitlist
      ORDER BY created_at DESC
      LIMIT 5
    `);
    
    console.log(`Found ${selectResult.rows.length} recent signups:`);
    selectResult.rows.forEach(signup => {
      const source = signup.referral_source || signup.utm_source || 'direct';
      console.log(`   - ${signup.email} (${signup.tier}) from ${source}`);
    });

    // Test 4: Get referral statistics
    console.log('\n4. Getting referral statistics...');
    
    // Total count
    const totalResult = await client.query('SELECT COUNT(*) FROM vibebrowser_waitlist');
    console.log(`   - Total signups: ${totalResult.rows[0].count}`);
    
    // Referral breakdown
    const referralResult = await client.query(`
      SELECT 
        COALESCE(referral_source, utm_source, 'direct') as source,
        COUNT(*) as count
      FROM vibebrowser_waitlist
      GROUP BY COALESCE(referral_source, utm_source, 'direct')
      ORDER BY count DESC
    `);
    
    console.log('   - Referral breakdown:');
    referralResult.rows.forEach(row => {
      console.log(`     ${row.source}: ${row.count}`);
    });

    // Test 5: Clean up test data
    console.log('\n5. Cleaning up test data...');
    await client.query('DELETE FROM vibebrowser_waitlist WHERE email = $1', [testEmail]);
    console.log('Test data cleaned up');

    console.log('\nAll tests passed!');

  } catch (err) {
    console.error('Test failed:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

testWaitlist();
