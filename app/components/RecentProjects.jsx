import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import projectsData from '@/data/projects.json'
import { FadeInUp, StaggerContainer, StaggerItem } from './animations/MotionComponents'

const RecentProjects = () => {
  
  const projectList = projectsData.map(project => ({
    ...project,
    // Fallback to assets if project image is not available
    image: project.image || assets.user_image || "/api/placeholder/400/300"
  }))

  return (
    <div id='recent-projects' className='w-full px-[12%] py-20 scroll-mt-20' >
      <FadeInUp>
        <h2 className='text-center text-5xl font-Ovo mb-4 text-gray-900' >Recent Projects</h2>
        <p className='text-center max-w-2xl mx-auto font-Ovo text-gray-600 mb-16' >
          I've worked on a variety of projects ranging from small business websites to complex web applications.
        </p>
      </FadeInUp>

      <StaggerContainer className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto' >
        {projectList.map((project, index) => (
          <StaggerItem key={index}>
            <a 
              href={project.link}
              target='_blank'
              rel='noopener noreferrer'
              className='block border-[0.5px] border-gray-300 rounded-lg overflow-hidden shadow-lg group cursor-pointer hover:shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-3 relative bg-white hover:border-blue-400'
            >
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                className='w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out'
                width={300}
                height={160}
              />
            ) : (
              <div className='w-full h-40 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ease-in-out'>
                <div className='text-center'>
                  <div className='w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-2'>
                    <svg className='w-6 h-6 text-blue-600' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z' clipRule='evenodd' />
                    </svg>
                  </div>
                  <p className='text-blue-600 font-medium text-sm'>{project.title}</p>
                </div>
              </div>
            )}
            <div className='p-4' >
              <h3 className='text-lg font-semibold text-gray-800 mb-2 text-center' >
                {project.title}
              </h3>
              <p className='text-gray-600 text-sm text-center leading-relaxed' >
                {project.description}
              </p>
              {project.category && (
                <div className='mt-3 text-center'>
                  <span className='inline-block px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full'>
                    {project.category}
                  </span>
                </div>
              )}
            </div>
            </a>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  )
}

export default RecentProjects

