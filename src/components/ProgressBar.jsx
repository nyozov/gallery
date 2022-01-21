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
  function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" {...props}/>
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(progress)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <div className="progress-bar">
      {file && progress < 100 && <CircularProgressWithLabel value={progress} />}
    

    </div>
  )
}







