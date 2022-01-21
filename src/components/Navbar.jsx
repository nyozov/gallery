import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Divider } from '@mui/material';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} className='navbar' sx={{p:2, color:'black' ,background:'transparent'}} position="static">
        <Toolbar >
         
        <Divider sx={{height:50}} orientation='vertical'/>
          <Typography padding='10px' textAlign='left' variant="h5" component="div" sx={{ flexGrow: 1 }}>
            LENS.IO
          </Typography>
         

          
          <Button color="inherit">Login</Button>
         
        </Toolbar>
      </AppBar>
    </Box>
  );
}