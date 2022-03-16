import React from 'react'
import HideImageIcon from '@mui/icons-material/HideImage';
export default function Empty() {
  return (
    <div className='flex flex-col h-44 justify-center items-center'>
      <HideImageIcon className='text-blue-400'/>
      <p className='text-gray-600'>No Images</p>
      <p className='text-gray-600'>Get started by uploading an image</p>
      
      </div>
  )
}
