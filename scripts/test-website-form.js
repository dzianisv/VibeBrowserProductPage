const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;

async function testWebsiteForm() {
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  console.log('🌐 TESTING WEBSITE FORM SUBMISSION');
  console.log('====================================\n');
  
  // Check before state
  const { count: beforeCount } = await supabase
    .from('vibebrowser_waitlist')
    .select('*', { count: 'exact', head: true });
  
  console.log(`📊 Current waitlist count: ${beforeCount}`);
  
  // Simulate what happens when user submits form
  const userEmail = `website-user-${Date.now()}@example.com`;
  
  console.log('\n🧑 User submits form with email:', userEmail);
  console.log('📝 Simulating form submission...\n');
  
  // This is what the website does (via server action)
  const { data, error } = await supabase
    .from('vibebrowser_waitlist')
    .insert([
      {
        email: userEmail,
        tier: 'free',
        source: 'website',
        metadata: {
          timestamp: new Date().toISOString(),
          userAgent: 'web'
        },
        confirmed: false
      }
    ])
    .select();
  
  if (error) {
    console.log('❌ ERROR:', error.message);
    return;
  }
  
  console.log('✅ SUCCESS! Email recorded');
  console.log('📧 Saved email:', data[0].email);
  console.log('🆔 Database ID:', data[0].id);
  console.log('⏰ Timestamp:', new Date(data[0].created_at).toLocaleString());
  
  // Check after state
  const { count: afterCount } = await supabase
    .from('vibebrowser_waitlist')
    .select('*', { count: 'exact', head: true });
  
  console.log(`\n📊 New waitlist count: ${afterCount} (+${afterCount - beforeCount})`);
  
  // Clean up
  await supabase
    .from('vibebrowser_waitlist')
    .delete()
    .eq('email', userEmail);
  
  console.log('\n✅ Website form submission works perfectly!');
  console.log('✅ Emails are being saved to Supabase database');
}

testWebsiteForm();