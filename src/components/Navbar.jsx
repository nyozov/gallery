
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';


import { auth } from '../firebase/config'


export default function ButtonAppBar({setLoggedIn}) {
  const signOut = () => {
    auth.signOut().then(()=> {
      setLoggedIn(false)
     

  
    
      console.log('sign-out successful')
    }).catch((err)=>{
      console.log('err:', err)
    })
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} className='navbar' sx={{p:2, color:'black' ,background:'transparent'}} position="static">
        <Toolbar >
         
        <Divider sx={{height:50}} orientation='vertical'/>
          <Typography padding='10px' textAlign='left' variant="h5" component="div" sx={{ flexGrow: 1 }}>
            LENS.IO
          </Typography>
         

        
          <Button onClick={()=> signOut()} color="inherit">Logout</Button>
         
        </Toolbar>
      </AppBar>
    </Box>
  );
}