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
 
  const { docs } = useFirestore('images')


  console.log('!!!',docs)

  
  return (
    <div>
      
      <Box marginTop='50px'>
      <Grid  sx={{ gridColumnStart:'1'}} container padding={0}>
    {docs.filter(doc => doc.userId === auth.currentUser.uid).map(filteredDoc => (
     
      <Grid  item xs={12} md={4} key={filteredDoc.id}>
        <img  onClick={()=> setSelectedImg({ url:filteredDoc.url, id: filteredDoc.id})} className ='img' src={filteredDoc.url} alt='img'/>
        </Grid>
    
    ))}
    </Grid>
    </Box>

          
  
      
    
    </div>
  )
}