import React from 'react'
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginIcon from "@mui/icons-material/Login";
import { useState } from 'react';
import { auth } from '../firebase/config';
import { addUserToDB } from "../hooks/handleDelete";
import { useNavigate } from 'react-router-dom'

const theme = createTheme();


export default function SignupPage({ setCurrentProfile, setLoggedIn }) {
  
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  
  const navigate = useNavigate();

  const register = () => {
    auth
      .createUserWithEmailAndPassword(registerEmail, registerPassword)
      .then((userCredential) => {
        addUserToDB(userCredential.user.uid, userCredential.user.email);
        const user = userCredential.user;
        setCurrentProfile(user.uid);
        setLoggedIn(true);
        navigate('/dashboard');
        // Signed in
        // const user = userCredential.user;
        // console.log(user)
        // console.log('current user = ', auth.currentUser)
        console.log("usercredentials = ", userCredential);

        // ...
      })
      .catch((error) => {
        console.log(error.message);
        // ..
      });
  };
  return (
    <div>
 <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXJ0JTIwZ2FsbGVyeXxlbnwwfHwwfHw%3D&w=1000&q=80)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
       
       
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LoginIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <Box noValidate>
                <TextField
                  onChange={(e) => {
                    setRegisterEmail(e.target.value);
                  }}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  onChange={(e) => {
                    setRegisterPassword(e.target.value);
                  }}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
 <div
                className="flex justify-center items-center flex-col
                w-full"
              >
                <Button
                  onClick={register}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                </div>

                <Grid container>
                  <Grid item>
                    <Link onClick={()=>navigate('/login')}className='hover:cursor-pointer' variant="body2">
                      {"Already have an account? Sign in"}
                    </Link>
                  </Grid>
                </Grid>
                
              </Box>
            </Box>
          </Grid>
       
      </Grid>
    </ThemeProvider>

      </div>
    
  )
}
