
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <Box sx={{ 
      width: '100vw',
       height: '100vh',
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
         }}>
      <CircularProgress />
    </Box>
  );
}