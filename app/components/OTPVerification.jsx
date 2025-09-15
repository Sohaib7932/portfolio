'use client'
import React, { useState, useEffect, useRef } from 'react'
import { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import { auth } from '@/lib/firebase'

const OTPVerification = ({ 
  email, 
  onVerificationSuccess, 
  onCancel, 
  isVisible 
}) => {
  const [verificationStep, setVerificationStep] = useState('sending') // sending, waiting, verifying, error
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)

  const intervalRef = useRef(null)

  // Email link configuration
  const actionCodeSettings = {
    url: typeof window !== 'undefined' ? `${window.location.origin}/verify-email` : 'http://localhost:3000/verify-email',
    handleCodeInApp: true,
  }

  // Send verification email
  const sendVerificationEmail = async () => {
    try {
      setIsLoading(true)
      setError('')
      setVerificationStep('sending')

      console.log('🔥 Sending verification email to:', email)
      console.log('🔧 Action code settings:', actionCodeSettings)
      console.log('🔧 Auth domain:', auth.config?.authDomain)
      
      await sendSignInLinkToEmail(auth, email, actionCodeSettings)
      
      console.log('✅ Firebase email sent successfully!')
      console.log('📧 Check your email (including spam/junk folder)')
      
      // Store email in localStorage for verification
      if (typeof window !== 'undefined') {
        localStorage.setItem('emailForSignIn', email)
      }
      
      setVerificationStep('waiting')
      startCountdown()
      
    } catch (error) {
      console.error('Error sending verification email:', error)
      setError(getErrorMessage(error.code))
      setVerificationStep('error')
    } finally {
      setIsLoading(false)
    }
  }

  // Start countdown timer
  const startCountdown = () => {
    setCountdown(60)
    setCanResend(false)
    
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          clearInterval(intervalRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  // Check if user came back from email link
  useEffect(() => {
    if (typeof window !== 'undefined' && isSignInWithEmailLink(auth, window.location.href)) {
      verifyEmailLink()
    }
  }, [])

  // Verify email link
  const verifyEmailLink = async () => {
    try {
      setIsLoading(true)
      setVerificationStep('verifying')
      
      let emailForSignIn = email || (typeof window !== 'undefined' ? localStorage.getItem('emailForSignIn') : null)
      
      if (!emailForSignIn) {
        emailForSignIn = typeof window !== 'undefined' ? window.prompt('Please provide your email for confirmation') : null
      }

      if (!emailForSignIn) {
        throw new Error('Email address is required for verification')
      }

      const result = await signInWithEmailLink(auth, emailForSignIn, typeof window !== 'undefined' ? window.location.href : '')
      
      // Clear stored email
      if (typeof window !== 'undefined') {
        localStorage.removeItem('emailForSignIn')
      }
      
      // Call success callback
      onVerificationSuccess(result.user)
      
    } catch (error) {
      console.error('Error verifying email link:', error)
      setError(getErrorMessage(error.code))
      setVerificationStep('error')
    } finally {
      setIsLoading(false)
    }
  }

  // Get user-friendly error message
  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Please enter a valid email address.'
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later.'
      case 'auth/invalid-action-code':
        return 'Verification link is invalid or expired.'
      default:
        return 'An error occurred. Please try again.'
    }
  }

  // Send initial verification email when component mounts
  useEffect(() => {
    if (isVisible && email) {
      sendVerificationEmail()
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isVisible, email])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
        <div className="text-center">
          {/* Header */}
          <div className="mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {verificationStep === 'sending' && (
                <svg className="animate-spin w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {verificationStep === 'waiting' && (
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              )}
              {verificationStep === 'verifying' && (
                <svg className="animate-pulse w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              )}
              {verificationStep === 'error' && (
                <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
              )}
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {verificationStep === 'sending' && 'Sending Verification'}
              {verificationStep === 'waiting' && 'Check Your Email'}
              {verificationStep === 'verifying' && 'Verifying...'}
              {verificationStep === 'error' && 'Verification Failed'}
            </h3>
          </div>

          {/* Content */}
          <div className="mb-6 text-gray-600">
            {verificationStep === 'sending' && (
              <p>Sending verification email to <strong>{email}</strong>...</p>
            )}
            
            {verificationStep === 'waiting' && (
              <div>
                <p className="mb-4">
                  We've sent a verification link to:<br />
                  <strong className="text-blue-600">{email}</strong>
                </p>
                <p className="text-sm">
                  Click the link in your email to verify your address and continue.
                </p>
                {countdown > 0 && (
                  <p className="text-sm mt-2">
                    Resend available in <strong>{countdown}s</strong>
                  </p>
                )}
              </div>
            )}
            
            {verificationStep === 'verifying' && (
              <p>Verifying your email address...</p>
            )}
            
            {verificationStep === 'error' && (
              <p className="text-red-600">{error}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            {verificationStep === 'waiting' && (
              <>
                {canResend && (
                  <button
                    onClick={sendVerificationEmail}
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Sending...' : 'Resend Verification Email'}
                  </button>
                )}
                <div className="text-sm text-gray-500">
                  <p>Didn't receive the email?</p>
                  <ul className="mt-2 text-left text-xs space-y-1">
                    <li>• Check your spam/junk folder</li>
                    <li>• Make sure the email address is correct</li>
                    <li>• Wait a few minutes for delivery</li>
                  </ul>
                </div>
              </>
            )}
            
            {(verificationStep === 'error' || verificationStep === 'waiting') && (
              <button
                onClick={onCancel}
                className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OTPVerification
