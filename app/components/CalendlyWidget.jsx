import React from 'react'
import { InlineWidget } from 'react-calendly'
import { FadeInUp } from './animations/MotionComponents'

const CalendlyWidget = ({ onClose }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative'>
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 z-10 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200'
          aria-label='Close'
        >
          <svg className='w-6 h-6 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
          </svg>
        </button>

        {/* Header */}
        <div className='bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6'>
          <h3 className='text-2xl font-bold mb-2'>Schedule a Consultation</h3>
          <p className='text-blue-100'>Let's discuss your project requirements in detail</p>
        </div>

        {/* Calendly Widget */}
        <div className='h-[700px]'>
          <InlineWidget 
            url="https://calendly.com/muhammadsohaib7932" 
            styles={{
              height: '100%',
              width: '100%'
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default CalendlyWidget
