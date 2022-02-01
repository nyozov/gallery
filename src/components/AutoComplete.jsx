import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { projectFirestore } from '../firebase/config'
import useFirestore from '../hooks/useFirestore';
import { Link, useNavigate } from 'react-router-dom'

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(8),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));




export default function Asynchronous({setCurrentProfile}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [allUsers, setAllUsers] = React.useState([])
  const navigate = useNavigate()
 const routeChange = (userId) => {
   let path = userId
   console.log(options)
   setCurrentProfile('')
   setCurrentProfile(path)
   navigate(path)
  
 }
React.useEffect(()=>{
  projectFirestore.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        setAllUsers(prev => [...prev, {id: doc.id, title: doc.data().email}])
      
        console.log(allUsers)

    });
});
  
},[])


  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...allUsers]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 'auto', minWidth:300}}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}s
      onClose={() => {
        setOpen(false);
      }}
      options={options}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => 
        
        <Button key={option.title} onClick={()=> routeChange(option.id)}>{option.title}</Button>
      }
    
    
     
      loading={loading}

      renderInput={(params) => {
        const {InputLabelProps,InputProps,...rest} = params;
        return <StyledInputBase placeholder='Search users...'{...params.InputProps} {...rest}  />}}
    />
  );
}

// Top films as rated by IMDb users. http://www.imdb.com/chart/top
