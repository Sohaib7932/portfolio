// Firebase Email Link Test
// Run this with: node test-firebase.js

import { initializeApp } from 'firebase/app'
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

console.log('🔥 Testing Firebase Configuration...')
console.log('Project ID:', firebaseConfig.projectId)
console.log('Auth Domain:', firebaseConfig.authDomain)

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const testEmail = 'test@example.com' // Change this to your email
const actionCodeSettings = {
  url: 'http://localhost:3000/verify-email',
  handleCodeInApp: true,
}

async function testEmailLink() {
  try {
    console.log('📧 Sending test verification email to:', testEmail)
    await sendSignInLinkToEmail(auth, testEmail, actionCodeSettings)
    console.log('✅ Email sent successfully!')
    console.log('Check your email (including spam folder) for the verification link.')
  } catch (error) {
    console.error('❌ Error:', error.code, error.message)
    
    if (error.code === 'auth/operation-not-allowed') {
      console.log('\n🔧 Fix: Enable "Email link (passwordless sign-in)" in Firebase Console:')
      console.log('https://console.firebase.google.com/project/portfolio-81ce7/authentication/providers')
    }
  }
}

testEmailLink()
