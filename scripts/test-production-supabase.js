const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;

async function testProductionWaitlist() {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const testEmail = `prod-test-${Date.now()}@example.com`;

  try {
    console.log('🔄 Testing production waitlist with Supabase...');
    console.log(`URL: ${supabaseUrl}`);
    console.log(`Test email: ${testEmail}`);
    
    // Test insert
    const { data: insertData, error: insertError } = await supabase
      .from('vibebrowser_waitlist')
      .insert([
        {
          email: testEmail,
          tier: 'free',
          source: 'production-test',
          metadata: { test: true, timestamp: new Date().toISOString() },
          confirmed: false
        }
      ])
      .select();

    if (insertError) {
      console.error('❌ Insert failed:', insertError.message);
      return;
    }

    console.log('✅ Email added to waitlist successfully!');
    
    // Get recent signups
    const { data: recentSignups, error: queryError } = await supabase
      .from('vibebrowser_waitlist')
      .select('email, tier, created_at')
      .order('created_at', { ascending: false })
      .limit(5);
    
    if (!queryError) {
      console.log('\n📋 Recent signups:');
      recentSignups.forEach(signup => {
        console.log(`  - ${signup.email} (${signup.tier}) - ${new Date(signup.created_at).toLocaleString()}`);
      });
    }
    
    // Get total count
    const { count } = await supabase
      .from('vibebrowser_waitlist')
      .select('*', { count: 'exact', head: true });
    
    console.log(`\n✅ Total waitlist signups: ${count}`);
    
    // Clean up test email
    const { error: deleteError } = await supabase
      .from('vibebrowser_waitlist')
      .delete()
      .eq('email', testEmail);
    
    if (!deleteError) {
      console.log('✅ Test email cleaned up');
    }
    
    console.log('\n🎉 Production waitlist is working with Supabase!');
    console.log('✅ Users can sign up at https://www.vibebrowser.app');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testProductionWaitlist();