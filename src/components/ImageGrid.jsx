import useFirestore from "../hooks/useFirestore";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { auth } from "../firebase/config";
import UploadForm from "./UploadForm";
import { Upload } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom'
import {AccountBox as ProfileIcon} from '@mui/icons-material'
import { useEffect } from "react";

export default function ImageGrid({ setImageOpen, setDeleteOpen, deleteOpen, currentProfile, setSelectedImg }) {
  const { docs } = useFirestore("images");
  
const handleDeleteClick = (doc) => {
  setSelectedImg({
    url: doc.url,
    id: doc.id,
  })
  setDeleteOpen(true)
}

const handleImageClick = (doc) => {
  setSelectedImg({
    url: doc.url,
    id: doc.id,
  })
  setImageOpen(true)
}
  console.log("!!!", docs);
  console.log("currentprofile=", currentProfile);

  return (
    <>
      <div className="absolute bg-gray-200 w-full h-full">
        {/* Navigation starts */}
        {/* Mobile */}

        {/* Mobile */}

        {/* Navigation ends */}
        {/* Page title starts */}
        <div className="my-6 lg:my-12 container px-6 mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between pb-4 border-b border-gray-300">
          <div>
            <h4 className="text-2xl font-bold leading-tight text-gray-800">
              Your Images
            </h4>
          
          </div>
          <div className="mt-6 lg:mt-0">
            <button className="mx-2 my-2 bg-white transition duration-150 ease-in-out focus:outline-none hover:bg-gray-100 rounded text-indigo-700 px-6 py-2 text-sm">
              <ProfileIcon/> {auth.currentUser.email}
            </button>
            <button className="transition duration-150 ease-in-out hover:bg-indigo-600 focus:outline-none border bg-indigo-700 rounded text-white px-8 py-2 text-sm">
              Sign Out
            </button>
          </div>
        </div>
        {/* Page title ends */}
        <div className="container mx-auto px-6">
          {/* Remove class [ h-64 ] when adding a card block */}
          {/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
          <div className="w-full h-64 rounded">
            <div>
              {/* Remove class [ h-24 ] when adding a card block */}
              {/* Remove class [ border-gray-300  dark:border-gray-700 border-dashed border-2 ] to remove dotted border */}

              <UploadForm />
              <div className="container mx-auto grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 pt-6 gap-3">
                {docs
                  .filter((doc) => doc.userId === currentProfile)
                  .map((filteredDoc) => (
                    <div key={filteredDoc.id} className="rounded relative">
                      <img
                        onClick={() =>
                          handleImageClick(filteredDoc)
                        }
                        className="img rounded-sm shadow-md h-full object-fill"
                        src={filteredDoc.url}
                        alt="img"
                      />
                      <div onClick={()=> handleDeleteClick(filteredDoc)} className='absolute bottom-0.5 right-0.5 text-white hover:cursor-pointer'>
                       
                      <DeleteIcon className="hover-icon hover:text-gray-200 shadow-md"/>
                      
                      </div>
                    </div>
                    
                  ))}
              </div>
            </div>
            {/* Place your content here */}
          </div>
        </div>
      </div>
    </>
  );
}
