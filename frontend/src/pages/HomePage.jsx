import React from 'react'
import LeftSidebar from './../components/LeftSidebar';
import MainBar from './../components/MainBar';
import RightSidebar from './../components/RightSidebar';

const HomePage = () => {
  return (
    <div className='px-28  h-screen '>
      <div className='flex flex-row '>
        <div className='w-[20%]'>
          {/* Left Sidebar */}
          <div className=' h-full '>
            <LeftSidebar/>
          </div>
        </div>
        <div className='w-[60%]'>
          {/* Main Bar */}
          <div className=' h-full'>
            <MainBar/>
          </div>
        </div>
        <div className='w-[20%]'>
          {/* Right Sidebar */}
          <div className='h-full'>
            <RightSidebar/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage