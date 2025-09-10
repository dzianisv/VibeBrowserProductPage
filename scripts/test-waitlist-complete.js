const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;

async function testWaitlistComplete() {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const testEmail = `subscription-test-${Date.now()}@example.com`;

  console.log('🧪 COMPREHENSIVE WAITLIST TEST');
  console.log('================================\n');

  try {
    // 1. Test subscription (add email)
    console.log('1️⃣  Testing email subscription...');
    console.log(`   Email: ${testEmail}`);
    
    const { data: insertData, error: insertError } = await supabase
      .from('vibebrowser_waitlist')
      .insert([
        {
          email: testEmail,
          tier: 'free',
          source: 'website',
          metadata: { test: true, timestamp: new Date().toISOString() },
          confirmed: false
        }
      ])
      .select();

    if (insertError) {
      console.error('   ❌ FAILED to add email:', insertError.message);
      return false;
    }

    console.log('   ✅ Email successfully added to waitlist!');
    console.log(`   Record ID: ${insertData[0].id}`);

    // 2. Verify email was recorded
    console.log('\n2️⃣  Verifying email was recorded...');
    
    const { data: verifyData, error: verifyError } = await supabase
      .from('vibebrowser_waitlist')
      .select('*')
      .eq('email', testEmail)
      .single();

    if (verifyError || !verifyData) {
      console.error('   ❌ FAILED to find email in database');
      return false;
    }

    console.log('   ✅ Email found in database!');
    console.log('   📧 Email:', verifyData.email);
    console.log('   📅 Created:', new Date(verifyData.created_at).toLocaleString());
    console.log('   🏷️  Tier:', verifyData.tier);
    console.log('   📍 Source:', verifyData.source);

    // 3. Test duplicate prevention
    console.log('\n3️⃣  Testing duplicate prevention...');
    
    const { error: dupError } = await supabase
      .from('vibebrowser_waitlist')
      .insert([
        {
          email: testEmail,
          tier: 'pro',
          source: 'test',
          confirmed: false
        }
      ]);

    if (dupError && dupError.code === '23505') {
      console.log('   ✅ Duplicate prevention working (email rejected)');
    } else if (!dupError) {
      console.error('   ❌ FAILED: Duplicate email was accepted!');
      return false;
    }

    // 4. Check total count
    console.log('\n4️⃣  Checking total subscriptions...');
    
    const { count, error: countError } = await supabase
      .from('vibebrowser_waitlist')
      .select('*', { count: 'exact', head: true });

    if (!countError) {
      console.log(`   ✅ Total emails in waitlist: ${count}`);
    }

    // 5. Get recent subscriptions
    console.log('\n5️⃣  Recent subscriptions:');
    
    const { data: recentData, error: recentError } = await supabase
      .from('vibebrowser_waitlist')
      .select('email, tier, created_at')
      .order('created_at', { ascending: false })
      .limit(5);

    if (!recentError && recentData) {
      recentData.forEach((sub, i) => {
        console.log(`   ${i + 1}. ${sub.email} (${sub.tier}) - ${new Date(sub.created_at).toLocaleString()}`);
      });
    }

    // 6. Clean up test email
    console.log('\n6️⃣  Cleaning up test email...');
    
    const { error: deleteError } = await supabase
      .from('vibebrowser_waitlist')
      .delete()
      .eq('email', testEmail);

    if (!deleteError) {
      console.log('   ✅ Test email removed');
    }

    // Final result
    console.log('\n' + '='.repeat(50));
    console.log('✅ ALL TESTS PASSED!');
    console.log('✅ Waitlist subscription is working correctly');
    console.log('✅ Emails are being recorded in Supabase');
    console.log('✅ Duplicate prevention is active');
    console.log('='.repeat(50));
    
    return true;

  } catch (error) {
    console.error('\n❌ CRITICAL ERROR:', error.message);
    return false;
  }
}

// Run the test
testWaitlistComplete().then(success => {
  process.exit(success ? 0 : 1);
});