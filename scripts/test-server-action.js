const fetch = require('node-fetch');

async function testWaitlistAPI() {
  const testEmail = `test-${Date.now()}@example.com`;
  const url = 'http://localhost:3002';
  
  try {
    console.log('🔄 Testing waitlist submission via server action...');
    console.log(`Test email: ${testEmail}`);
    
    // Test the API endpoint
    const response = await fetch(`${url}/api/waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testEmail,
        tier: 'free'
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Response:', data);
    } else {
      console.log('❌ Response status:', response.status);
      const text = await response.text();
      console.log('Response body:', text);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\nNote: The waitlist uses server actions, not API endpoints.');
    console.log('To test it properly, use the web interface or Playwright tests.');
  }
}

testWaitlistAPI();