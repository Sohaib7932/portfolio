import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import servicesData from '@/data/services.json'
import { FadeInUp, StaggerContainer, StaggerItem } from './animations/MotionComponents'

const Services = () => {
  // Map icon names to actual icon imports
  const getIcon = (iconName) => {
    const iconMap = {
      web_icon: assets.web_icon,
      mobile_icon: assets.mobile_icon,
      ui_icon: assets.ui_icon,
      graphics_icon: assets.graphics_icon
    }
    return iconMap[iconName] || assets.code_icon
  }

  const servicesList = servicesData.map(service => ({
    ...service,
    icon: getIcon(service.icon)
  }))

  return (
    <div id='services' className='w-full px-[12%] py-20 scroll-mt-20'>
      <FadeInUp>
        <h2 className='text-center text-5xl font-Ovo mb-4'>My Services</h2>
        <p className='text-center max-w-2xl mx-auto font-Ovo text-gray-600 mb-16'>
          I offer a range of web development services to help bring your digital vision to life. 
          From custom websites to optimization, I've got you covered.
        </p>
      </FadeInUp>

      <StaggerContainer className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto'>
        {servicesList.map((service, index) => (
          <StaggerItem 
            key={index}
            className='border-[0.5px] border-gray-300 rounded-lg p-5 cursor-pointer hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-100/50 hover:border-blue-300 transition-all duration-300 ease-out transform hover:scale-102 group bg-white relative overflow-hidden'
          >
            <div className='overflow-hidden mb-4 text-center'>
              {service.icon ? (
                <Image 
                  src={service.icon} 
                  alt={service.title} 
                  className='w-8 h-8 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ease-in-out'
                  width={32}
                  height={32}
                />
              ) : (
                <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ease-in-out'>
                  <svg className='w-5 h-5 text-blue-600' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z' clipRule='evenodd' />
                  </svg>
                </div>
              )}
            </div>
            
            <h3 className='text-md font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 mb-3 text-center'>
              {service.title}
            </h3>
            
            <p className='text-gray-600 group-hover:text-gray-700 leading-relaxed transition-colors duration-300 mb-4 text-sm text-center'>
              {service.description}
            </p>
            
            <ul className='space-y-1'>
              {service.features.map((feature, idx) => (
                <li key={idx} className='flex items-center text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300'>
                  <div className='w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 group-hover:bg-blue-500 transition-colors duration-300'></div>
                  {feature}
                </li>
              ))}
            </ul>
            
            <div className='absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-blue-400/5 group-hover:via-purple-400/5 group-hover:to-pink-400/5 transition-all duration-300 pointer-events-none'></div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  )
}

export default Services
