import { assets, infoList } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { FadeInUp, StaggerContainer, StaggerItem } from './animations/MotionComponents'

const About = () => {
  
  return (
    <div id='about' className='w-full px-[12%] py-10 scroll-mt-20 pt-50 bg-white transition-colors duration-300'>
        <FadeInUp>
          <h2 className='text-center text-5xl font-Ovo text-gray-900'>About Me</h2>
        </FadeInUp>

        <StaggerContainer>
          <div className='flex w-full flex-col lg:flex-row items-center lg:items-start gap-20 my-20'>

              <StaggerItem className='w-64 lg:w-72 xl:w-80'>
                  <Image src={assets.user_image} alt='user-image' className='w-full h-auto rounded-3xl shadow-lg'/>
              </StaggerItem>

              <StaggerItem className='flex-1 lg:w-3/5 xl:w-2/3'>
                  <p className='mb-10 max-w-2xl font-Ovo text-gray-700'> 
                  Hello! I'm a Software Engineering student at Air University with a strong 
                  passion for web design and development. Over the past three years, 
                  I've gained extensive experience in building modern, responsive websites 
                  that blend clean design with seamless functionality. Whether I'm coding a site
                   from scratch or transforming a UI concept into reality, I take pride in 
                   delivering work that reflects high standards of quality and creativity.
                  I'm well-versed in tools like Figma, WordPress, Shopify, JavaScript, nextjs,
                  and React, allowing me to bring versatile solutions to any project. 
                  I constantly strive to learn and adapt, keeping up with industry trends to 
                  deliver modern and effective digital experiences.
                  </p>
              </StaggerItem>

          </div>
        </StaggerContainer>

        {/* Info Cards Section */}
        <StaggerContainer className='w-full mt-16'>
          <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto'>
              {infoList.map(({icon, iconDark, title, description}, index)=>(
                  <StaggerItem key={index} className='border-[0.5px] border-gray-300 rounded-xl p-6 cursor-pointer hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-100/50 hover:border-blue-300 transition-all duration-500 ease-out transform hover:scale-105 group bg-white'>
                  <div className='overflow-hidden'>
                      <Image src={icon} alt={title} className='w-7 mt-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ease-in-out'/>
                  </div>
                  <h3 className='my-4 font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300'>{title}</h3>
                  <p className='text-gray-600 text-sm group-hover:text-gray-700 leading-relaxed transition-colors duration-300'>{description}</p>
                  <div className='absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-blue-400/5 group-hover:via-purple-400/5 group-hover:to-pink-400/5 transition-all duration-500 pointer-events-none'></div>
                  </StaggerItem>
              ))}
          </ul>
        </StaggerContainer>
      
    </div>
  )
}

export default About
