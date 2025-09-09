const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://svhdffutjfzislubdzos.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2aGRmZnV0amZ6aXNsdWJkem9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1OTI2MTgsImV4cCI6MjA3MTE2ODYxOH0.m-kYpaksMvL9ex6bp8YUcTLwEFK3HqS-ePMTHDLdN5Q'
);

async function testBisonteSignup() {
  const email = 'bisonte.amigable@gmail.com';
  
  console.log(`Testing signup for: ${email}\n`);
  
  // Check if already exists
  const { data: existing } = await supabase
    .from('vibebrowser_waitlist')
    .select('*')
    .eq('email', email)
    .single();
  
  if (existing) {
    console.log('✅ Email already in waitlist!');
    console.log('Signed up at:', new Date(existing.created_at).toLocaleString());
    return;
  }
  
  // Try to add
  const { data, error } = await supabase
    .from('vibebrowser_waitlist')
    .insert([{
      email: email,
      tier: 'free',
      source: 'website',
      confirmed: false
    }])
    .select();
  
  if (error) {
    console.log('❌ Error:', error.message);
  } else {
    console.log('✅ Successfully added to waitlist!');
  }
  
  // Get current stats
  const { count } = await supabase
    .from('vibebrowser_waitlist')
    .select('*', { count: 'exact', head: true });
  
  console.log(`\n📊 Total signups: ${count}`);
}

testBisonteSignup();