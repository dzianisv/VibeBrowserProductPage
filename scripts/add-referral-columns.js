const { Client } = require('pg');

// Use the database URL from HomesteadLink's .env
const DATABASE_URL = 'postgresql://postgres.svhdffutjfzislubdzos:ev0NLxDN@*c7icaD@aws-1-us-east-2.pooler.supabase.com:6543/postgres';

async function addReferralColumns() {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('Connecting to Supabase PostgreSQL...\n');
    await client.connect();
    console.log('Connected successfully\n');

    const statements = [
      // Add referral_source column for tracking where users came from (linkedin, google, twitter, etc.)
      `ALTER TABLE vibebrowser_waitlist ADD COLUMN IF NOT EXISTS referral_source VARCHAR(100)`,
      
      // Add utm_source column for UTM tracking
      `ALTER TABLE vibebrowser_waitlist ADD COLUMN IF NOT EXISTS utm_source VARCHAR(100)`,
      
      // Add utm_medium column
      `ALTER TABLE vibebrowser_waitlist ADD COLUMN IF NOT EXISTS utm_medium VARCHAR(100)`,
      
      // Add utm_campaign column
      `ALTER TABLE vibebrowser_waitlist ADD COLUMN IF NOT EXISTS utm_campaign VARCHAR(100)`,
      
      // Add landing_page column to track which page they signed up from
      `ALTER TABLE vibebrowser_waitlist ADD COLUMN IF NOT EXISTS landing_page VARCHAR(500)`,
      
      // Create index on referral_source for analytics queries
      `CREATE INDEX IF NOT EXISTS idx_vibebrowser_waitlist_referral_source ON vibebrowser_waitlist(referral_source)`,
      
      // Create index on utm_source for analytics queries
      `CREATE INDEX IF NOT EXISTS idx_vibebrowser_waitlist_utm_source ON vibebrowser_waitlist(utm_source)`
    ];

    console.log(`Executing ${statements.length} SQL statements...\n`);

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      const preview = statement.substring(0, 60).replace(/\n/g, ' ');
      
      try {
        console.log(`Statement ${i + 1}/${statements.length}: ${preview}...`);
        await client.query(statement);
        console.log('Success\n');
      } catch (err) {
        if (err.message.includes('already exists')) {
          console.log('Already exists (skipping)\n');
        } else if (err.message.includes('duplicate')) {
          console.log('Already exists (skipping)\n');
        } else {
          console.log(`Error: ${err.message}\n`);
        }
      }
    }

    // Verify the columns were added
    console.log('Verifying table structure...\n');
    const result = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'vibebrowser_waitlist'
      ORDER BY ordinal_position;
    `);

    console.log('Current table structure:');
    result.rows.forEach(row => {
      console.log(`   - ${row.column_name}: ${row.data_type}`);
    });

    console.log('\nReferral tracking columns added successfully!');

  } catch (err) {
    console.error('Connection error:', err.message);
  } finally {
    await client.end();
    console.log('\nDone!');
  }
}

addReferralColumns();
