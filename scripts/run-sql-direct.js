const https = require('https');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Extract project ID from the URL
const projectUrl = process.env.SUPABASE_PROJECT_URL;
const projectId = projectUrl.split('.')[0].split('//')[1]; // Extract 'svhdffutjfzislubdzos' from URL
const apiKey = process.env.SUPABASE_API_KEY;

console.log('🚀 Running SQL script to create VibeBrowser waitlist table...\n');
console.log('Project ID:', projectId);

// Read the SQL file
const sqlScript = fs.readFileSync(
  path.join(__dirname, 'create-supabase-waitlist-table.sql'),
  'utf8'
);

// Since we can't directly execute SQL via the API without service role key,
// let's create a simpler version using the JS client
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(projectUrl, apiKey);

async function createTableDirectly() {
  console.log('\n📋 Instructions to create the table:\n');
  console.log('Since we need service role access to create tables, please follow these steps:\n');
  console.log('1. Go to your Supabase Dashboard:');
  console.log(`   https://supabase.com/dashboard/project/${projectId}/sql/new\n`);
  console.log('2. Copy and paste the following SQL script:\n');
  console.log('================== COPY FROM HERE ==================\n');
  console.log(sqlScript);
  console.log('\n================== COPY UNTIL HERE ==================\n');
  console.log('3. Click "Run" to execute the script\n');
  console.log('4. You should see "Success. No rows returned" message\n');
  console.log('5. The vibebrowser_waitlist table is now ready!\n');
  
  // Test if we can at least query
  console.log('Testing current connection...');
  try {
    const { data, error } = await supabase
      .from('vibebrowser_waitlist')
      .select('count')
      .limit(1);
    
    if (error) {
      if (error.message?.includes('does not exist')) {
        console.log('⚠️  Table does not exist yet. Please create it using the steps above.');
      } else {
        console.log('⚠️  Connection test:', error.message);
      }
    } else {
      console.log('✅ Table already exists! The waitlist is ready to use.');
    }
  } catch (e) {
    console.log('Connection test failed:', e.message);
  }
}

createTableDirectly();
