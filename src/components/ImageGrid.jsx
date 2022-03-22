import useFirestore from "../hooks/useFirestore";
import UploadForm from "./UploadForm";
import DeleteIcon from "@mui/icons-material/Delete";
import ProfileButton from "../components/ProfileButton";
import Empty from "./Empty";
import { auth } from "firebase";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from 'react-router-dom';

export default function ImageGrid({
  setLoggedIn,
  setImageOpen,
  setDeleteOpen,
  currentProfile,
  setSelectedImg,
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { docs } = useFirestore("images");
  const emptyFilter = () => {
    return docs.filter((doc) => doc.userId === currentProfile).length;
  };

  const [docsLoaded, setDocsLoaded] = useState(false);

  const noImagesButLoaded = () => {
    if (docsLoaded && !emptyFilter()) {
      return true;
    }
    return false;
  };

  const navigate = useNavigate()

  useEffect(() => {
    if (docs.length) {
      setDocsLoaded(true);
    }
  }, [docs]);

  const handleDeleteClick = (doc) => {
    setSelectedImg({
      url: doc.url,
      id: doc.id,
    });
    setDeleteOpen(true);
  };

  const handleImageClick = (doc) => {
    setSelectedImg({
      url: doc.url,
      id: doc.id,
    });
    setImageOpen(true);
  };


  return (
    <>
      <div className="absolute bg-gray-200 w-full h-full">
        <div className="my-12 container px-6 mx-auto flex flex-row items-start lg:items-center justify-between pb-4 border-b border-gray-300">
          <div>
            <h4 className="flex text-xl font-bold leading-tight text-gray-800">
              Your Images{" "}
              {imageLoaded && <div className="ml-1">({emptyFilter()})</div>}
            </h4>
          </div>

          <div className="mt-6">
            <ProfileButton setLoggedIn={setLoggedIn} />
          </div>
        </div>
        {/* Page title ends */}
        <div className="container mx-auto px-6">
          <div className="w-full h-64 rounded">
            <div>
              <UploadForm />
              {!imageLoaded && !noImagesButLoaded() && (
                <div className="flex flex-col justify-center items-center w-full h-44">
                  <CircularProgress />
                  <p className="text-gray-500 ml-2 mt-2">Loading images...</p>
                </div>
              )}

              {!emptyFilter() && docsLoaded && <Empty />}
              <div
                className={
                  !imageLoaded
                    ? "invisible"
                    : "container mx-auto grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 pt-6 gap-3"
                }
              >
                {docs
                  .filter((doc) => doc.userId === currentProfile)
                  .map((filteredDoc) => (
                    <div
                      key={filteredDoc.id}
                      className="rounded flex justify-center relative"
                    >
                      <img
                        onLoad={() =>
                          setTimeout(() => setImageLoaded(true), 2000)
                        }
                        onClick={() => handleImageClick(filteredDoc)}
                        className="img max-h-52 rounded-sm shadow-md h-full object-cover hover:cursor-pointer"
                        src={filteredDoc.url}
                        alt="img"
                      />
                      <div
                        onClick={() => handleDeleteClick(filteredDoc)}
                        className="absolute bottom-0.5 right-0.5 text-white hover:cursor-pointer"
                      >
                        <DeleteIcon className="hover-icon hover:text-gray-200 shadow-md" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
