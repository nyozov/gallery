import Navbar from "./components/Navbar";
import UploadForm from "./components/UploadForm";
import ImageGrid from "./components/ImageGrid";
import Modal from "./components/Modal";
import { useEffect, useState } from "react";
import LoginPage from "./components/LoginPage";
import { auth } from "./firebase/config";
import Loading from "./components/Loading";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Link,
} from "react-router-dom";

function App() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [LoggedIn, setLoggedIn] = useState(false);

  //show loading screen while user is being fetched by firebase auth
  const [loading, setLoading] = useState(false);
  //controls which user's profile is being viewed
  const [currentProfile, setCurrentProfile] = useState("");
  console.log("currentprofile", currentProfile);

  // useEffect(() => {
  //   setLoading(true);
  //   setCurrentProfile(JSON.parse(window.localStorage.getItem('currentProfile')))
  // }, []);
  // useEffect(() => {
  //   window.localStorage.setItem('currentProfile', currentProfile);
  // }, [currentProfile]);

  auth.onAuthStateChanged((user) => {
    if (!user) {
      console.log("auth did not work");
      setLoading(false);
    } else {
      console.log("auth worked");
      console.log(user);
      setLoading(false);
      setLoggedIn(true);
    }
  });

  return (
    <div className="App">
      {!currentProfile && (
        <LoginPage
          setCurrentProfile={setCurrentProfile}
          setLoggedIn={setLoggedIn}
        />
      )}

      {currentProfile && (
        <div className="main-section">
          <Navbar
            setLoggedIn={setLoggedIn}
            setCurrentProfile={setCurrentProfile}
          />
          
          <ImageGrid
            currentProfile={currentProfile}
            setSelectedImg={setSelectedImg}
          />
          {selectedImg && (
            <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
