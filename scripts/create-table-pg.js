const { Client } = require('pg');

// Use the database URL from HomesteadLink's .env
const DATABASE_URL = 'postgresql://postgres.svhdffutjfzislubdzos:ev0NLxDN@*c7icaD@aws-1-us-east-2.pooler.supabase.com:6543/postgres';

async function createTable() {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('🚀 Connecting to Supabase PostgreSQL...\n');
    await client.connect();
    console.log('✅ Connected successfully\n');

    // Execute each SQL statement separately
    const statements = [
      // Create table
      `CREATE TABLE IF NOT EXISTS vibebrowser_waitlist (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        tier VARCHAR(10) DEFAULT 'free',
        source VARCHAR(50) DEFAULT 'website',
        metadata JSONB DEFAULT '{}',
        confirmed BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )`,
      
      // Create indexes
      `CREATE INDEX IF NOT EXISTS idx_vibebrowser_waitlist_email ON vibebrowser_waitlist(email)`,
      `CREATE INDEX IF NOT EXISTS idx_vibebrowser_waitlist_created_at ON vibebrowser_waitlist(created_at)`,
      `CREATE INDEX IF NOT EXISTS idx_vibebrowser_waitlist_tier ON vibebrowser_waitlist(tier)`,
      
      // Enable RLS
      `ALTER TABLE vibebrowser_waitlist ENABLE ROW LEVEL SECURITY`,
      
      // Create policies
      `CREATE POLICY "Allow public inserts" ON vibebrowser_waitlist
        FOR INSERT WITH CHECK (true)`,
      
      `CREATE POLICY "Allow authenticated reads" ON vibebrowser_waitlist
        FOR SELECT USING (auth.role() = 'authenticated')`,
      
      // Create function for updated_at
      `CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql`,
      
      // Create trigger
      `CREATE TRIGGER update_vibebrowser_waitlist_updated_at 
        BEFORE UPDATE ON vibebrowser_waitlist 
        FOR EACH ROW 
        EXECUTE FUNCTION update_updated_at_column()`
    ];

    console.log(`📝 Executing ${statements.length} SQL statements...\n`);

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      const preview = statement.substring(0, 50).replace(/\n/g, ' ');
      
      try {
        console.log(`Statement ${i + 1}/${statements.length}: ${preview}...`);
        await client.query(statement);
        console.log(`✅ Success\n`);
      } catch (err) {
        if (err.message.includes('already exists')) {
          console.log(`⚠️  Already exists (skipping)\n`);
        } else if (err.message.includes('duplicate key value')) {
          console.log(`⚠️  Already exists (skipping)\n`);
        } else {
          console.log(`❌ Error: ${err.message}\n`);
        }
      }
    }

    // Verify the table was created
    console.log('🔍 Verifying table creation...\n');
    const result = await client.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = 'vibebrowser_waitlist'
      ORDER BY ordinal_position;
    `);

    if (result.rows.length > 0) {
      console.log('✅ Table structure:');
      result.rows.forEach(row => {
        console.log(`   - ${row.column_name}: ${row.data_type} ${row.is_nullable === 'NO' ? 'NOT NULL' : ''}`);
      });
      
      // Check if any data exists
      const countResult = await client.query('SELECT COUNT(*) FROM vibebrowser_waitlist');
      console.log(`\n📊 Current records in table: ${countResult.rows[0].count}`);
      
      // Test insert
      console.log('\n🧪 Testing insert capability...');
      const testEmail = `test_${Date.now()}@example.com`;
      try {
        await client.query(`
          INSERT INTO vibebrowser_waitlist (email, tier, source, metadata)
          VALUES ($1, $2, $3, $4)
          RETURNING id
        `, [testEmail, 'free', 'test_script', { test: true }]);
        console.log('✅ Insert test successful');
        
        // Clean up test data
        await client.query('DELETE FROM vibebrowser_waitlist WHERE email = $1', [testEmail]);
        console.log('✅ Test data cleaned up');
      } catch (err) {
        console.log('⚠️  Insert test failed:', err.message);
      }
      
      console.log('\n🎉 VibeBrowser waitlist table created successfully!');
      console.log('\nThe waitlist is now ready to use at:');
      console.log('- Website: https://your-domain.com');
      console.log('- Admin: https://your-domain.com/admin/waitlist');
    } else {
      console.log('❌ Table was not created. Please check the errors above.');
    }

  } catch (err) {
    console.error('❌ Connection error:', err.message);
    console.log('\nPlease ensure your database credentials are correct.');
  } finally {
    await client.end();
    console.log('\n✨ Done!');
  }
}

createTable();
