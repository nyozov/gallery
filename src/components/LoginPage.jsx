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
import firebase from "firebase";
import { auth } from "../firebase/config";
import { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { addUserToDB } from "../hooks/handleDelete";
import GoogleIcon from "../assets/google-logo.png";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const theme = createTheme();

export default function SignInSide({ setCurrentProfile, setLoggedIn }) {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInError, setSignInError] = useState("");

  const navigate = useNavigate();

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(signInEmail, signInPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setCurrentProfile(user.uid);
        console.log(user.uid);
        setLoggedIn(true);
        navigate("/dashboard");
        // ...
      })
      .catch((error) => {
        console.log(error.message);
        setSignInError(error.message)
      });
  };

  const googleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        addUserToDB(result.user.uid, result.user.email);
        setCurrentProfile(result.user.uid);

        setLoggedIn(true);
        navigate("/dashboard");
        console.log(result);
      });
  };

  return (
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

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
              Sign in
            </Typography>
            <Box className='relative' component="form" noValidate sx={{ mt: 1 }}>
              
              <TextField
                onChange={(e) => {
                  setSignInEmail(e.target.value);
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
                  setSignInPassword(e.target.value);
                }}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
             
  
                    {signInError && <div className=' w-full text-red-700 text-center absolute'>
                      <ErrorOutlineIcon/>
                       {signInError}</div>}
                       
                 
                  
              <div
              
                className="flex justify-center items-center flex-col
                w-full"
              >
                <div  className={signInError ? 'mt-14 w-full' : 'mt-3 w-full'}>
                <Button
               
                  onClick={signIn}
                  fullWidth
                  variant="contained"
                  sx={{ mb: 2 }}
                >
                  Sign In
                </Button>
                </div>
                <div className="relative w-full">
                  <div
                    onClick={() => googleLogin()}
                    className="flex w-full justify-center items-center px-6 py-2 hover:cursor-pointer rounded bg-white shadow hover:shadow-blue-400 text-gray-500"
                  >
                    <img
                      src={GoogleIcon}
                      className="absolute left-4 h-4 w-4 mr-4"
                    />
                    Sign in with Google
                  </div>
                </div>
              </div>
              <Grid container className="mt-4">
                <Grid item>
                  <Link
                    className="hover:cursor-pointer"
                    onClick={() => navigate("/signup")}
                    variant="body2"
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                 
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
