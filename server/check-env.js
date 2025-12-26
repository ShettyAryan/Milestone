// Quick script to check if environment variables are loaded
import dotenv from 'dotenv';

// Load .env.local first, then .env
dotenv.config({ path: '.env.local' });
dotenv.config();

console.log('\n🔍 Checking Environment Variables:\n');
console.log('GOOGLE_SERVICE_ACCOUNT_PATH:', process.env.GOOGLE_SERVICE_ACCOUNT_PATH || '❌ NOT SET');
console.log('GOOGLE_CALENDAR_ID:', process.env.GOOGLE_CALENDAR_ID || '❌ NOT SET');
console.log('GOOGLE_SHEET_ID:', process.env.GOOGLE_SHEET_ID || '❌ NOT SET');
console.log('PORT:', process.env.PORT || '3001 (default)');
console.log('FRONTEND_URL:', process.env.FRONTEND_URL || 'http://localhost:3000 (default)');

if (!process.env.GOOGLE_SERVICE_ACCOUNT_PATH) {
  console.log('\n❌ ERROR: GOOGLE_SERVICE_ACCOUNT_PATH is not set!');
  console.log('📝 Create a .env.local file in the server/ directory with:');
  console.log('   GOOGLE_SERVICE_ACCOUNT_PATH=./service-account.json');
  process.exit(1);
}

if (process.env.GOOGLE_CALENDAR_ID === 'your_calendar_id_here') {
  console.log('\n⚠️  WARNING: GOOGLE_CALENDAR_ID is still set to placeholder value!');
}

if (process.env.GOOGLE_SHEET_ID === 'your_sheet_id_here') {
  console.log('\n⚠️  WARNING: GOOGLE_SHEET_ID is still set to placeholder value!');
}

console.log('\n✅ Environment variables loaded successfully!\n');

