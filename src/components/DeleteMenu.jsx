import React from 'react'
import { Link } from 'react-router-dom'
import { handleDelete } from "../hooks/handleDelete"
import {Close} from '@mui/icons-material'

export default function DeleteMenu({selectedImg, setSelectedImg, setDeleteOpen}) {
  
  const deleteImg = ()=>{
    handleDelete(selectedImg.id)
    setSelectedImg(null)
    setDeleteOpen(false)
  }
  
  return (
    <div className='inset-bg'>
    <div className="absolute flex items-center align-center justify-center bg-white inset-center sm:w-auto px-4 py-2 w-3/4 rounded shadow-md sm:px-12 sm:py-8" >
      <div className='flex items-center flex-col h-full'>
<p className='text-center text-gray-800'>Are you sure you want to delete this file?</p>
    <div className='flex mt-2 justify-evenly flex-row w-full'>
    <div onClick={deleteImg} className='rounded px-2 py-1 bg-red-600 m-1 hover:bg-red-700 text-white w-full text-center hover:cursor-pointer'>Delete</div>
    <div onClick={()=>setDeleteOpen(false)} className='rounded hover:cursor-pointer px-2 py-1 bg-gray-200 w-full text-center m-1 hover:bg-gray-300 text-black'>Cancel</div>
    </div>
    </div>
    <div onClick={()=>setDeleteOpen(false)} className='text-gray-600 rounded-full hover:bg-gray-200 hover:cursor-pointer absolute top-0.5 right-1'><Close/></div>
  </div>
  </div>
  )
}
