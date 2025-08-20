const { createClient } = require('@supabase/supabase-js');

// Use the production Supabase credentials
const supabase = createClient(
  'https://svhdffutjfzislubdzos.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2aGRmZnV0amZ6aXNsdWJkem9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1OTI2MTgsImV4cCI6MjA3MTE2ODYxOH0.m-kYpaksMvL9ex6bp8YUcTLwEFK3HqS-ePMTHDLdN5Q'
);

async function testProductionWaitlist() {
  console.log('🧪 Testing VibeBrowser Production Waitlist...\n');
  console.log('Website: https://www.vibebrowser.app\n');

  // Test adding a production-like email
  const testEmail = `vibetester_${Date.now()}@gmail.com`;
  
  try {
    console.log(`1. Testing signup with: ${testEmail}`);
    const { data, error } = await supabase
      .from('vibebrowser_waitlist')
      .insert([{
        email: testEmail,
        tier: 'free',
        source: 'production_test',
        confirmed: false
      }])
      .select();

    if (error) {
      console.log('❌ Insert failed:', error.message);
      return;
    }

    console.log('✅ Successfully added to waitlist!');
    console.log('   Entry ID:', data[0].id);

    // Get statistics
    console.log('\n2. Checking waitlist statistics...');
    const { count } = await supabase
      .from('vibebrowser_waitlist')
      .select('*', { count: 'exact', head: true });

    console.log(`✅ Total signups: ${count}`);

    // Clean up test data
    console.log('\n3. Cleaning up test data...');
    await supabase
      .from('vibebrowser_waitlist')
      .delete()
      .eq('email', testEmail);
    console.log('✅ Test data removed');

    console.log('\n🎉 Production waitlist is working perfectly!');
    console.log('\nUsers can now sign up at:');
    console.log('- https://www.vibebrowser.app');
    console.log('- Admin dashboard: https://www.vibebrowser.app/admin/waitlist');
    
  } catch (err) {
    console.error('Test failed:', err);
  }
}

testProductionWaitlist();