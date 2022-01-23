import useStorage from "../hooks/UseStorage";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect } from "react";





export default function ProgressBar({ file, setFile }){

  const {url, progress} = useStorage(file)

  useEffect(()=> {
    if (url){
      setFile(null)
    }
  },[url, setFile])
  console.log(progress, url);

  return (
    <div className="progress-bar">
      {file && progress < 100 && <CircularProgress />}
    

    </div>
  )
}







