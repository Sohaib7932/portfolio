import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import { FadeInUp, FadeInLeft, FadeInRight, StaggerContainer, StaggerItem } from './animations/MotionComponents'
import { InlineWidget } from 'react-calendly'
import emailjs from '@emailjs/browser'

const Contact = () => {
  const form = useRef()
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.user_name.trim()) {
      newErrors.user_name = 'Name is required'
    }
    
    if (!formData.user_email.trim()) {
      newErrors.user_email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.user_email)) {
      newErrors.user_email = 'Please enter a valid email address'
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({...prev, [name]: value}))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({...prev, [name]: ''}))
    }
  }

  const sendEmail = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    // Get EmailJS configuration from environment variables
    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    
    // Check if EmailJS is properly configured
    if (!serviceID || !templateID || !publicKey || 
        serviceID === 'YOUR_SERVICE_ID' || 
        templateID === 'YOUR_TEMPLATE_ID' || 
        publicKey === 'YOUR_PUBLIC_KEY') {
      console.error('EmailJS configuration missing or using placeholder values. Please set up EmailJS first.')
      setSubmitStatus('config_error')
      setIsSubmitting(false)
      return
    }
    
    emailjs.sendForm(serviceID, templateID, form.current, publicKey)
      .then((result) => {
        console.log('Email sent successfully:', result.text)
        setSubmitStatus('success')
        setFormData({
          user_name: '',
          user_email: '',
          subject: '',
          message: ''
        })
      })
      .catch((error) => {
        console.error('Failed to send email:', error.text)
        setSubmitStatus('error')
      })
      .finally(() => {
        setIsSubmitting(false)
        // Clear status message after 5 seconds
        setTimeout(() => setSubmitStatus(''), 5000)
      })
  }
  
  return (
    <div id='contact' className='w-full px-[12%] py-20 scroll-mt-20 bg-gradient-to-b from-white to-gray-50'>
      <FadeInUp>
        <h2 className='text-center text-5xl font-Ovo mb-4 text-gray-900'>Get In Touch</h2>
        <p className='text-center max-w-2xl mx-auto font-Ovo text-gray-600 mb-16'>
          Ready to start your next project? I'd love to hear from you. Let's discuss how we can bring your ideas to life.
        </p>
      </FadeInUp>

      <div className='flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto'>
        {/* Contact Information */}
        <FadeInLeft className='flex-1'>
          <h3 className='text-2xl font-Ovo font-semibold text-gray-800 mb-8'>Let's Talk</h3>
          <p className='text-gray-600 mb-8 leading-relaxed'>
            I'm currently available for freelance work and exciting new opportunities. 
            Whether you have a project in mind or just want to chat about web development, 
            feel free to reach out.
          </p>

          <StaggerContainer className='space-y-6'>
            <StaggerItem className='flex items-center gap-4 group cursor-pointer'>
              <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300'>
                {assets.mail_icon ? (
                  <Image src={assets.mail_icon} alt='Email' className='w-6 h-6'/>
                ) : (
                  <svg className='w-6 h-6 text-blue-600' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z'/>
                    <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z'/>
                  </svg>
                )}
              </div>
              <div>
                <p className='text-gray-800 font-medium'>Email</p>
                <p className='text-gray-600'>muhammadsohaib7932@gmail.com</p>
              </div>
            </StaggerItem>

            <StaggerItem className='flex items-center gap-4 group cursor-pointer'>
              <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300'>
                {assets.call_icon ? (
                  <Image src={assets.call_icon} alt='Phone' className='w-6 h-6'/>
                ) : (
                  <svg className='w-6 h-6 text-green-600' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z'/>
                  </svg>
                )}
              </div>
              <div>
                <p className='text-gray-800 font-medium'>Phone</p>
                <p className='text-gray-600'>+92 3365190729</p>
              </div>
            </StaggerItem>

            <StaggerItem className='flex items-center gap-4 group cursor-pointer'>
              <div className='w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300'>
                {assets.location_icon ? (
                  <Image src={assets.location_icon} alt='Location' className='w-6 h-6'/>
                ) : (
                  <svg className='w-6 h-6 text-purple-600' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z' clipRule='evenodd'/>
                  </svg>
                )}
              </div>
              <div>
                <p className='text-gray-800 font-medium'>Location</p>
                <p className='text-gray-600'>Islamabad, Pakistan</p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </FadeInLeft>

        {/* Contact Form */}
        <FadeInRight className='flex-1'>
          {/* Success/Error Message */}
          {submitStatus && (
            <div className={`mb-6 p-4 rounded-lg text-center ${
              submitStatus === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-300' 
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}>
              {submitStatus === 'success' 
                ? '🎉 Message sent successfully! I\'ll get back to you soon.' 
                : submitStatus === 'config_error'
                ? '⚙️ EmailJS not configured yet. Please contact me directly at muhammadsohaib7932@gmail.com'
                : '❌ Failed to send message. Please try again or email me directly.'
              }
            </div>
          )}

          <form ref={form} onSubmit={sendEmail} className='space-y-6'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <div>
                <label className='block text-gray-700 font-medium mb-2'>Name *</label>
                <input 
                  type='text'
                  name='user_name'
                  value={formData.user_name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none ${
                    errors.user_name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder='Your Name'
                />
                {errors.user_name && (
                  <p className='text-red-500 text-sm mt-1'>{errors.user_name}</p>
                )}
              </div>
              <div>
                <label className='block text-gray-700 font-medium mb-2'>Email *</label>
                <input 
                  type='email'
                  name='user_email'
                  value={formData.user_email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none ${
                    errors.user_email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder='your.email@gmail.com'
                />
                {errors.user_email && (
                  <p className='text-red-500 text-sm mt-1'>{errors.user_email}</p>
                )}
              </div>
            </div>

            <div>
              <label className='block text-gray-700 font-medium mb-2'>Subject *</label>
              <input 
                type='text'
                name='subject'
                value={formData.subject}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none ${
                  errors.subject ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder='Project Inquiry'
              />
              {errors.subject && (
                <p className='text-red-500 text-sm mt-1'>{errors.subject}</p>
              )}
            </div>

            <div>
              <label className='block text-gray-700 font-medium mb-2'>Message *</label>
              <textarea 
                rows='6'
                name='message'
                value={formData.message}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none resize-none ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder='Tell me about your project...'
              ></textarea>
              {errors.message && (
                <p className='text-red-500 text-sm mt-1'>{errors.message}</p>
              )}
            </div>

            <button 
              type='submit'
              disabled={isSubmitting}
              className={`w-full py-3 px-8 rounded-full font-medium transition-all duration-300 ease-in-out ${
                isSubmitting
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800 hover:scale-105 hover:shadow-lg'
              }`}
            >
              {isSubmitting ? (
                <div className='flex items-center justify-center'>
                  <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                  </svg>
                  Sending...
                </div>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </FadeInRight>
      </div>

      {/* Calendly Scheduling Section */}
      <div className='mt-20 max-w-6xl mx-auto'>
        <FadeInUp>
          <h3 className='text-center text-3xl font-Ovo mb-4 text-gray-900'>Schedule a Call</h3>
          <p className='text-center max-w-2xl mx-auto font-Ovo text-gray-600 mb-12'>
            Prefer to talk directly? Schedule a consultation call at your convenience. 
            Let's discuss your project requirements in detail.
          </p>
        </FadeInUp>
        
        <FadeInUp className='bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100'>
          <InlineWidget 
            url="https://calendly.com/muhammadsohaib7932" 
            styles={{
              height: '700px',
              borderRadius: '16px'
            }}
          />
        </FadeInUp>
      </div>
    </div>
  )
}

export default Contact
