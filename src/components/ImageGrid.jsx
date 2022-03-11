import useFirestore from "../hooks/useFirestore";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { auth } from "../firebase/config";
import UploadForm from "./UploadForm";
import { Upload } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom'

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
            <ul className="flex flex-col md:flex-row items-start md:items-center text-gray-600 text-sm mt-3">
              <li className="flex items-center mr-3 mt-3 md:mt-0">
                <span className="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-paperclip"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9 l6.5 -6.5" />
                  </svg>
                </span>
                <span>Active</span>
              </li>
              <li className="flex items-center mr-3 mt-3 md:mt-0">
                <span className="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-trending-up"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <polyline points="3 17 9 11 13 15 21 7" />
                    <polyline points="14 7 21 7 21 14" />
                  </svg>
                </span>
                <span> Trending</span>
              </li>
              <li className="flex items-center mt-3 md:mt-0">
                <span className="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-plane-departure"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path
                      d="M15 12h5a2 2 0 0 1 0 4h-15l-3 -6h3l2 2h3l-2 -7h3z"
                      transform="rotate(-15 12 12) translate(0 -1)"
                    />
                    <line x1={3} y1={21} x2={21} y2={21} />
                  </svg>
                </span>
                <span>Started on 29 Jan 2020</span>
              </li>
            </ul>
          </div>
          <div className="mt-6 lg:mt-0">
            <button className="mx-2 my-2 bg-white transition duration-150 ease-in-out focus:outline-none hover:bg-gray-100 rounded text-indigo-700 px-6 py-2 text-sm">
              Back
            </button>
            <button className="transition duration-150 ease-in-out hover:bg-indigo-600 focus:outline-none border bg-indigo-700 rounded text-white px-8 py-2 text-sm">
              Edit Profile
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
              <div className="container mx-auto grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 pt-6 gap-3">
                {docs
                  .filter((doc) => doc.userId === currentProfile)
                  .map((filteredDoc) => (
                    <div className="rounded relative">
                      <img
                        onClick={() =>
                          handleImageClick(filteredDoc)
                        }
                        className="img rounded-sm shadow-md h-full object-fill"
                        src={filteredDoc.url}
                        alt="img"
                      />
                      <div onClick={()=> handleDeleteClick(filteredDoc)} className='absolute bottom-0.5 right-0 text-white hover:cursor-pointer'>
                       
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
