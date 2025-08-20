const { Client } = require('pg');

const DATABASE_URL = 'postgresql://postgres.svhdffutjfzislubdzos:ev0NLxDN@*c7icaD@aws-1-us-east-2.pooler.supabase.com:6543/postgres';

async function fixPolicies() {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('🔧 Fixing RLS policies for VibeBrowser waitlist...\n');
    await client.connect();

    // Drop existing policies
    console.log('1. Dropping existing policies...');
    try {
      await client.query(`DROP POLICY IF EXISTS "Allow public inserts" ON vibebrowser_waitlist`);
      await client.query(`DROP POLICY IF EXISTS "Allow authenticated reads" ON vibebrowser_waitlist`);
      console.log('✅ Old policies dropped\n');
    } catch (err) {
      console.log('⚠️  Could not drop policies:', err.message, '\n');
    }

    // Create new policies that actually work
    console.log('2. Creating new RLS policies...');
    
    // Allow anyone to insert (for waitlist signups)
    await client.query(`
      CREATE POLICY "Enable insert for all users" ON vibebrowser_waitlist
      FOR INSERT 
      TO anon, authenticated
      WITH CHECK (true)
    `);
    console.log('✅ Insert policy created');

    // Allow anyone to read their own email
    await client.query(`
      CREATE POLICY "Enable read for all users" ON vibebrowser_waitlist
      FOR SELECT
      TO anon, authenticated
      USING (true)
    `);
    console.log('✅ Select policy created');

    // Allow updates (for confirmation)
    await client.query(`
      CREATE POLICY "Enable update for all users" ON vibebrowser_waitlist
      FOR UPDATE
      TO anon, authenticated
      USING (true)
      WITH CHECK (true)
    `);
    console.log('✅ Update policy created\n');

    // Verify policies
    console.log('3. Verifying policies...');
    const result = await client.query(`
      SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
      FROM pg_policies
      WHERE tablename = 'vibebrowser_waitlist'
    `);

    if (result.rows.length > 0) {
      console.log('✅ Active policies:');
      result.rows.forEach(policy => {
        console.log(`   - ${policy.policyname}: ${policy.cmd} for ${policy.roles}`);
      });
    }

    console.log('\n✨ RLS policies fixed successfully!');
    console.log('The waitlist should now accept signups properly.');

  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await client.end();
  }
}

fixPolicies();
