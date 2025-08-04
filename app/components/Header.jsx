import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import { FadeInUp, StaggerContainer, StaggerItem } from './animations/MotionComponents'

const Header = () => {
  return (
    <div className='w-full px-[12%] text-center h-screen flex flex-col justify-center items-center gap-4 pt-48'>
      <StaggerContainer>
        <StaggerItem className='flex justify-center'>
          <Image src={assets.profile_img} alt='profile-image' className='rounded-full w-32 h-32 object-cover mx-auto'/>
        </StaggerItem>
        <StaggerItem>
          <h3 className='flex items-center justify-center gap-2 text-xl md:text-2xl mb-3 font-Ovo'>
            Hi! I am Muhammad Sohaib <Image src={assets.hand_icon} alt='Hand' className='w-6'/> 
          </h3>
        </StaggerItem>
        <StaggerItem>
          <FadeInUp>
            <h1 className='text-3xl sm:text-6xl lg:text-[66px] font-Ovo'>
              Front-end Web Developer 
            </h1>
          </FadeInUp>
        </StaggerItem>
        <StaggerItem>
          <p className='max-w-lg mx-auto'>I’m a passionate Software Engineer and a dedicated Front-End Web Developer. 
             I craft responsive, user-friendly websites that bring ideas to life. 
          </p>
        </StaggerItem>

        <StaggerItem>
          <div className='flex flex-col sm:flex-row gap-4 items-center justify-center mt-4'>
              <a href="#contact" className='px-10 py-3 border border-gray-500 rounded-full bg-black text-white flex items-center gap-2 hover:bg-gray-800 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out group'> 
                Contact me <Image src={assets.right_arrow_white} alt='Arrow' className='w-4 group-hover:translate-x-1 transition-transform duration-300'/> 
              </a>

              <a href="/CV.pdf" download className='px-10 py-3 border border-gray-500 rounded-full flex items-center gap-2 hover:bg-gray-50 hover:scale-105 hover:shadow-lg hover:border-gray-600 transition-all duration-300 ease-in-out group'>
               My CV <Image src={assets.download_icon} alt='download' className='w-4 group-hover:scale-110 group-hover:rotate-10 transition-all duration-300'/> 
              </a>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </div>
  )
}

export default Header
