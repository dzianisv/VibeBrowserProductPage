const { Client } = require('pg');

const DATABASE_URL = 'postgresql://postgres.svhdffutjfzislubdzos:ev0NLxDN@*c7icaD@aws-1-us-east-2.pooler.supabase.com:6543/postgres';

async function cleanupTestData() {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('🧹 Cleaning up test data from VibeBrowser waitlist...\n');
    await client.connect();

    // Delete test emails
    const result = await client.query(`
      DELETE FROM vibebrowser_waitlist 
      WHERE email LIKE 'user_%@example.com' 
        OR email LIKE 'test_%@example.com'
        OR source = 'test_script'
      RETURNING email
    `);

    if (result.rows.length > 0) {
      console.log(`✅ Deleted ${result.rows.length} test entries:`);
      result.rows.forEach(row => {
        console.log(`   - ${row.email}`);
      });
    } else {
      console.log('✅ No test data found to clean up');
    }

    // Show current count
    const countResult = await client.query('SELECT COUNT(*) FROM vibebrowser_waitlist');
    console.log(`\n📊 Current real signups in waitlist: ${countResult.rows[0].count}`);

  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await client.end();
    console.log('\n✨ Cleanup complete!');
  }
}

cleanupTestData();
