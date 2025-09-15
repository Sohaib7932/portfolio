'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function VerifyEmail() {
  const [status, setStatus] = useState('verifying') // verifying, success, error
  const [message, setMessage] = useState('Verifying your email...')
  const router = useRouter()

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (isSignInWithEmailLink(auth, window.location.href)) {
          let email = localStorage.getItem('emailForSignIn')
          
          if (!email) {
            // If email is not available, redirect back to contact form
            router.push('/#contact')
            return
          }

          await signInWithEmailLink(auth, email, window.location.href)
          localStorage.removeItem('emailForSignIn')
          
          setStatus('success')
          setMessage('Email verified successfully!')
          
          // Store verification status and redirect back to contact
          localStorage.setItem('emailVerified', email)
          localStorage.setItem('verificationTimestamp', Date.now().toString())
          
          setTimeout(() => {
            router.push('/#contact')
          }, 2000)
        } else {
          setStatus('error')
          setMessage('Invalid verification link.')
        }
      } catch (error) {
        console.error('Verification error:', error)
        setStatus('error')
        setMessage('Verification failed. Please try again.')
      }
    }

    verifyEmail()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-8 shadow-2xl text-center">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
            {status === 'verifying' && (
              <div className="bg-blue-100 w-full h-full rounded-full flex items-center justify-center">
                <svg className="animate-spin w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}
            {status === 'success' && (
              <div className="bg-green-100 w-full h-full rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            )}
            {status === 'error' && (
              <div className="bg-red-100 w-full h-full rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
              </div>
            )}
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {status === 'verifying' && 'Verifying Email'}
            {status === 'success' && 'Email Verified!'}
            {status === 'error' && 'Verification Failed'}
          </h1>
          
          <p className="text-gray-600">{message}</p>
        </div>

        {status === 'success' && (
          <p className="text-sm text-green-600">
            Redirecting you back to the contact form...
          </p>
        )}
        
        {status === 'error' && (
          <button
            onClick={() => router.push('/#contact')}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back to Contact Form
          </button>
        )}
      </div>
    </div>
  )
}
