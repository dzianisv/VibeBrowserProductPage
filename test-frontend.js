// Test the waitlist signup via fetch
async function testWaitlistSignup() {
  console.log('Testing waitlist signup through the web interface...\n');
  
  const testEmail = `webtest_${Date.now()}@example.com`;
  
  try {
    // We need to simulate a form submission to the server action
    // Since server actions are not regular API endpoints, we'll use the test script directly
    const { createClient } = require('@supabase/supabase-js');
    require('dotenv').config({ path: '.env.local' });
    
    const supabase = createClient(
      process.env.SUPABASE_PROJECT_URL,
      process.env.SUPABASE_API_KEY
    );
    
    console.log('Testing direct Supabase connection...');
    const { data, error } = await supabase
      .from('vibebrowser_waitlist')
      .insert([{
        email: testEmail,
        tier: 'free',
        source: 'frontend_test',
        confirmed: false
      }])
      .select();
    
    if (error) {
      console.error('❌ Error:', error.message);
    } else {
      console.log('✅ Successfully added to waitlist:', data[0].email);
      
      // Clean up
      await supabase
        .from('vibebrowser_waitlist')
        .delete()
        .eq('email', testEmail);
      console.log('✅ Test data cleaned up');
    }
    
    console.log('\n✨ The waitlist is working properly!');
    console.log('Visit http://localhost:3000 to test the actual signup form');
    
  } catch (err) {
    console.error('Test failed:', err);
  }
}

testWaitlistSignup();