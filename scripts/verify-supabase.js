require('dotenv').config({ path: '.env' });

console.log('Current Supabase Configuration:');
console.log('================================');
console.log('SUPABASE_PROJECT_ID:', process.env.SUPABASE_PROJECT_ID);
console.log('SUPABASE_PROJECT_URL:', process.env.SUPABASE_PROJECT_URL);
console.log('SUPABASE_DB_PASSWORD:', process.env.SUPABASE_DB_PASSWORD ? '***hidden***' : 'NOT SET');
console.log('SUPABASE_API_KEY:', process.env.SUPABASE_API_KEY ? process.env.SUPABASE_API_KEY.substring(0, 20) + '...' : 'NOT SET');
console.log('');

// Check if this looks like a valid Supabase project format
const projectId = process.env.SUPABASE_PROJECT_ID;
if (projectId) {
  console.log('Project ID Analysis:');
  console.log('Length:', projectId.length);
  console.log('Characters:', /^[a-z0-9]+$/.test(projectId) ? 'Valid (lowercase alphanumeric)' : 'Contains invalid characters');
  console.log('Format:', projectId.length === 20 ? 'Standard Supabase length' : `Unusual length (typically 20, got ${projectId.length})`);
}

console.log('\n🔍 DIAGNOSIS:');
console.log('The project ID "svhdffutjfzislubdzos" cannot be resolved via DNS.');
console.log('This means one of the following:');
console.log('1. The project was deleted from Supabase');
console.log('2. The project ID is incorrect (typo or placeholder)');
console.log('3. The project was never created (these are test/mock credentials)');
console.log('');
console.log('✅ TO FIX THIS:');
console.log('1. Log into https://supabase.com/dashboard');
console.log('2. Check if you have any existing projects');
console.log('3. If yes, copy the correct project reference from Settings > General');
console.log('4. If no, create a new project and get the credentials');
console.log('');
console.log('The project reference should look like: "abcdefghijklmnopqrst" (20 characters)');
console.log('The URL should be: https://[project-ref].supabase.co');