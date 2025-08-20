const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.SUPABASE_PROJECT_URL,
  process.env.SUPABASE_API_KEY
);

async function testWaitlist() {
  console.log('🧪 Testing VibeBrowser waitlist functionality...\n');

  // Test 1: Add a new email
  const testEmail = `user_${Date.now()}@example.com`;
  console.log(`1. Testing signup with email: ${testEmail}`);
  
  try {
    const { data, error } = await supabase
      .from('vibebrowser_waitlist')
      .insert([
        {
          email: testEmail,
          tier: 'pro',
          source: 'test_script',
          metadata: { 
            test: true,
            timestamp: new Date().toISOString()
          },
          confirmed: false
        }
      ])
      .select();

    if (error) {
      console.log('❌ Insert failed:', error.message);
    } else {
      console.log('✅ Successfully added to waitlist');
      console.log('   Data:', JSON.stringify(data[0], null, 2));
    }
  } catch (err) {
    console.log('❌ Error:', err.message);
  }

  // Test 2: Try duplicate email
  console.log('\n2. Testing duplicate email prevention...');
  try {
    const { error } = await supabase
      .from('vibebrowser_waitlist')
      .insert([
        {
          email: testEmail,
          tier: 'free',
          source: 'test_script'
        }
      ]);

    if (error) {
      if (error.message.includes('duplicate') || error.code === '23505') {
        console.log('✅ Duplicate prevention working correctly');
      } else {
        console.log('❌ Unexpected error:', error.message);
      }
    } else {
      console.log('❌ Duplicate was not prevented!');
    }
  } catch (err) {
    console.log('❌ Error:', err.message);
  }

  // Test 3: Query all signups
  console.log('\n3. Fetching all signups...');
  try {
    const { data, error, count } = await supabase
      .from('vibebrowser_waitlist')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
      console.log('❌ Query failed:', error.message);
    } else {
      console.log(`✅ Found ${count || data.length} total signups`);
      if (data.length > 0) {
        console.log('   Latest signups:');
        data.forEach(signup => {
          console.log(`   - ${signup.email} (${signup.tier}) - ${new Date(signup.created_at).toLocaleString()}`);
        });
      }
    }
  } catch (err) {
    console.log('❌ Error:', err.message);
  }

  // Test 4: Get statistics
  console.log('\n4. Getting statistics...');
  try {
    // Total count
    const { count: totalCount } = await supabase
      .from('vibebrowser_waitlist')
      .select('*', { count: 'exact', head: true });

    // Today's signups
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const { count: todayCount } = await supabase
      .from('vibebrowser_waitlist')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today.toISOString());

    // Tier breakdown
    const { data: tierData } = await supabase
      .from('vibebrowser_waitlist')
      .select('tier');

    const tierBreakdown = tierData?.reduce((acc, item) => {
      acc[item.tier || 'free'] = (acc[item.tier || 'free'] || 0) + 1;
      return acc;
    }, {}) || {};

    console.log('✅ Statistics:');
    console.log(`   - Total signups: ${totalCount || 0}`);
    console.log(`   - Today's signups: ${todayCount || 0}`);
    console.log(`   - Tier breakdown:`, tierBreakdown);
  } catch (err) {
    console.log('❌ Error:', err.message);
  }

  console.log('\n✨ Testing complete!');
  console.log('\nYou can now:');
  console.log('1. Visit http://localhost:3000 to test the signup form');
  console.log('2. Visit http://localhost:3000/admin/waitlist to see the admin dashboard');
}

testWaitlist();