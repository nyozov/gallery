import React from 'react'
import { Link } from 'react-router-dom'
import { handleDelete } from "../hooks/handleDelete"

export default function DeleteMenu({selectedImg, setSelectedImg, setDeleteOpen}) {
  
  const deleteImg = ()=>{
    handleDelete(selectedImg.id)
    setSelectedImg(null)
    setDeleteOpen(false)
  }
  
  return (
    <div className="bg-white p-4 rounded shadow-md w-3/4 h-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" >
      <div className='flex items-center justify-center flex-col h-full'>
<p className='text-center text-gray-800'>Are you sure you want to delete this file?</p>
    <div className='flex justify-center flex-row w-full'>
    <div onClick={deleteImg} className='rounded p-2 bg-red-500 m-1 hover:bg-red-600 text-white hover:cursor-pointer'>Delete</div>
    <div onClick={()=>setDeleteOpen(false)} className='rounded hover:cursor-pointer p-2 bg-gray-200 m-1 hover:bg-gray-300 text-black'>Cancel</div>
    </div>
    </div>
  </div>
  )
}
