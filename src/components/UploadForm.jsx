import { useState } from "react";
import ProgressBar from "./ProgressBar";
import { styled } from "@mui/material/styles";
import {IconButton, Button} from "@mui/material";
import SvgButton from "../components/SvgButton";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useDropzone } from "react-dropzone";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';

const Input = styled("input")({
  display: "none",
});

const UploadButton = () => {
  return (
    <label htmlFor="contained-button-file">
      <Input accept="image/*" id="contained-button-file" multiple type="file" />
      <Button variant="contained" component="span">
        Upload
      </Button>
    </label>
  );
};

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFile(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
    },
  });

  const types = ["image/png", "image/jpeg"];

  const changeHandler = (e) => {
    console.log("changed");
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Make sure file is png/jpeg");
    }
  };
  return (
    <form className="upload-form">
      {/* <label htmlFor="contained-button-file">
        <SvgButton color="primary" variant="contained" component="span">
          <Input
            type="file"
            onChange={changeHandler}
            id="contained-button-file"
          />
          <FileUploadIcon />
          Upload
        </SvgButton>
      </label> */}
      <div  className="flex justify-center items-center w-full h-24">
        <div

        className="border-dashed rounded border-2 text-center border-blue-300 w-full h-full"
          {...getRootProps()}
         
        >
          <Input maxFileSize={100} className="" {...getInputProps()} onChange={changeHandler} />
         {!file && 
         <>
          <p className='mt-2.5 font-bold text-gray-800'>Drag and drop your file here or</p>
       <div className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded inline-flex items-center">
     
  <span><FileUploadIcon/> Upload File</span>
</div>


      </>
         }
          <div className="output mt-2">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
        </div>
     

     
      </div>
    </form>
  );
}
