import useFirestore from "../hooks/useFirestore"
import { Carousel } from '3d-react-carousal'
import { useState } from "react"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { IconButton } from "@mui/material";
import GridViewIcon from '@mui/icons-material/GridView';
import ViewArrayIcon from '@mui/icons-material/ViewArray';
import { auth } from "../firebase/config";

export default function ImageGrid( { setSelectedImg }){
  const [view, setView] = useState('grid')
  const { docs } = useFirestore('images')


  console.log('!!!',docs)

  let slides = docs.filter(doc => doc.userId === auth.currentUser.uid).map(filteredDoc => (
    <img className='img' sx={{objectFit:'scale-down'}} width ='800px' height='450px' src={filteredDoc.url} alt="uploaded pic" />
  ))
  return (
    <div>
      
      <IconButton onClick={()=> setView(view === 'carousel' ? 'grid': 'carousel')}>
        {view === 'carousel' ? <GridViewIcon/> : <ViewArrayIcon/>}
        </IconButton>
      <Box marginTop='50px' sx={{ flexGrow: 1 }}>
      <Grid container padding={0} spacing={0}>
    {view === 'grid' &&  docs.filter(doc => doc.userId === auth.currentUser.uid).map(filteredDoc => (
     
      <Grid item xs={9} md={6} key={filteredDoc.id}>
        <img  onClick={()=> setSelectedImg({ url:filteredDoc.url, id: filteredDoc.id})} className ='img' width ='400px' height='225px' src={filteredDoc.url} alt='img'/>
        </Grid>
    
    ))}
    </Grid>
    </Box>
    
    <div>
        
         {view === 'carousel' && <Carousel slides={slides}/> }
          </div>
          
  
      
    
    </div>
  )
}