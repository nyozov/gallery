import { useState } from "react";
import ProgressBar from "./ProgressBar";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import SvgButton from "../components/SvgButton";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useDropzone } from "react-dropzone";

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
        )
      
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
      <label htmlFor="contained-button-file">
        <SvgButton color="primary" variant="contained" component="span">
          <Input
            type="file"
            onChange={changeHandler}
            id="contained-button-file"
          />
          <FileUploadIcon />
          Upload
        </SvgButton>
      </label>
      <div>
      <div {...getRootProps()}>
        <Input {...getInputProps()} onChange={changeHandler}/>
        <p>Drop files here</p>
      </div>
    </div>

      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
}
