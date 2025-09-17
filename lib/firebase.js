import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'dummy-api-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'dummy-domain.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'dummy-project',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'dummy-project.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:dummy'
}

// Check if we're in a server environment or if Firebase config is missing
const isServerSide = typeof window === 'undefined'
const hasValidConfig = process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
                      process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== 'dummy-api-key'

let app = null
let auth = null

// Only initialize Firebase if we're on the client side and have valid config
if (!isServerSide && hasValidConfig) {
  try {
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
  } catch (error) {
    console.error('Firebase initialization error:', error)
  }
} else if (!isServerSide) {
  console.warn('Firebase not initialized: Missing environment variables')
}

export { auth }
export default app
