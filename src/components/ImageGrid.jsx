import useFirestore from "../hooks/useFirestore"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from "@mui/material";
import { auth } from "../firebase/config";

export default function ImageGrid( { currentProfile, setSelectedImg }){
 
  const { docs } = useFirestore('images')


  console.log('!!!',docs)
  console.log('currentprofile=', currentProfile)

  
  return (
    <div>
     <Typography>{currentProfile === auth.currentUser.uid ? 'Your Gallery' : `${currentProfile}'s Gallery`}</Typography>
      
      <Box marginTop='50px'>
      <Grid  sx={{ gridColumnStart:'1'}} container padding={0} rowSpacing={5}>
    {docs.filter(doc => doc.userId === currentProfile).map(filteredDoc => (
     
      <Grid  item xs={12} md={6} key={filteredDoc.id}>
        <img  onClick={()=> setSelectedImg({ url:filteredDoc.url, id: filteredDoc.id})} className ='img' src={filteredDoc.url} alt='img'/>
        </Grid>
    
    ))}
    </Grid>
    </Box>

          
  
      
    
    </div>
  )
}