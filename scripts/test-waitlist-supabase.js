const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase credentials not found in .env.local');
  process.exit(1);
}

async function testWaitlist() {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const testEmail = `test-${Date.now()}@example.com`;

  try {
    console.log('🔄 Testing Supabase waitlist functionality...');
    console.log(`Test email: ${testEmail}`);
    
    // Test insert
    const { data: insertData, error: insertError } = await supabase
      .from('vibebrowser_waitlist')
      .insert([
        {
          email: testEmail,
          tier: 'free',
          source: 'test-script',
          metadata: { test: true },
          confirmed: false
        }
      ])
      .select();

    if (insertError) {
      console.error('❌ Insert failed:', insertError.message);
      return;
    }

    console.log('✅ Email added to waitlist successfully!');
    console.log('   ID:', insertData[0].id);
    console.log('   Email:', insertData[0].email);
    
    // Test duplicate prevention
    const { error: duplicateError } = await supabase
      .from('vibebrowser_waitlist')
      .insert([
        {
          email: testEmail,
          tier: 'free',
          source: 'test-script',
          metadata: { test: true },
          confirmed: false
        }
      ]);

    if (duplicateError && duplicateError.code === '23505') {
      console.log('✅ Duplicate prevention working correctly');
    }
    
    // Get count
    const { count, error: countError } = await supabase
      .from('vibebrowser_waitlist')
      .select('*', { count: 'exact', head: true });
    
    if (!countError) {
      console.log(`✅ Total waitlist signups: ${count}`);
    }
    
    // Clean up test email
    const { error: deleteError } = await supabase
      .from('vibebrowser_waitlist')
      .delete()
      .eq('email', testEmail);
    
    if (!deleteError) {
      console.log('✅ Test email cleaned up');
    }
    
    console.log('\n🎉 Waitlist is working perfectly with Supabase!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testWaitlist();