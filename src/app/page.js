import React from 'react'
import LeftComponent from './components/LeftComponent'
import RightComponent from './components/RightComponent'

export default function page() {
  return (
    
    <div className='flex '>
      <div className='flex basis-[50%] bg-neutral-800'>
       <LeftComponent />
      </div>
      <div className='flex basis-[50%]'>
       <RightComponent/>
      </div>
   </div>
  )
}
