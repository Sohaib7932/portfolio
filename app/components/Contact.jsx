import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import { FadeInUp, FadeInLeft, FadeInRight, StaggerContainer, StaggerItem } from './animations/MotionComponents'

const Contact = () => {
  
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
          <form className='space-y-6'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <div>
                <label className='block text-gray-700 font-medium mb-2'>Name</label>
                <input 
                  type='text'
                  className='w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none'
                  placeholder='Your Name'
                />
              </div>
              <div>
                <label className='block text-gray-700 font-medium mb-2'>Email</label>
                <input 
                  type='email'
                  className='w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none'
                  placeholder='your.email@gmail.com'
                />
              </div>
            </div>

            <div>
              <label className='block text-gray-700 font-medium mb-2'>Subject</label>
              <input 
                type='text'
                className='w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none'
                placeholder='Project Inquiry'
              />
            </div>

            <div>
              <label className='block text-gray-700 font-medium mb-2'>Message</label>
              <textarea 
                rows='6'
                className='w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none resize-none'
                placeholder='Tell me about your project...'
              ></textarea>
            </div>

            <button 
              type='submit'
              className='w-full bg-black text-white py-3 px-8 rounded-full hover:bg-gray-800 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out font-medium'
            >
              Send Message
            </button>
          </form>
        </FadeInRight>
      </div>
    </div>
  )
}

export default Contact
