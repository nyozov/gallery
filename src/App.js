import ImageGrid from "./components/ImageGrid";
import Modal from "./components/Modal";
import { useEffect, useState } from "react";
import LoginPage from "./components/LoginPage";
import { auth } from "./firebase/config";
import Loading from "./components/Loading";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";
import DeleteMenu from "./components/DeleteMenu";
import SignupPage from "./components/SignupPage";

function App() {
  const navigate = useNavigate()
  const [selectedImg, setSelectedImg] = useState(null);
  const [LoggedIn, setLoggedIn] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);

  //show loading screen while user is being fetched by firebase auth
  const [loading, setLoading] = useState(false);
  //controls which user's profile is being viewed
  const [currentProfile, setCurrentProfile] = useState("");

  console.log("currentprofile", currentProfile);

  useEffect(() => {
    setLoading(true);
    console.log(auth);
    auth.onAuthStateChanged((user) => {
      if (!user) {
        console.log("auth did not work");
        
        navigate('/login')
        setLoading(false);
        setLoggedIn(false);
      } else {
        setCurrentProfile(user.uid);

        console.log("auth worked");
        console.log(user);
        setLoading(false);
        setLoggedIn(true);
      }
    });
  }, []);

  return (
    
      <div className="App">
      
        <Routes>
        <Route path='/' element={LoggedIn ? <Navigate to='/dashboard'/> : <Navigate to='/login'/>}/>
         
          
          <Route
            path="/signup"
            element={
              <SignupPage
                setCurrentProfile={setCurrentProfile}
                setLoggedIn={setLoggedIn}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
            
              currentProfile ?
              <div>
               
                {loading && <Loading />}

                {!loading && LoggedIn && (
                  <div className="main-section">
                    <ImageGrid
                      setLoggedIn={setLoggedIn}
                      currentProfile={currentProfile}
                      setCurrentProfile={setCurrentProfile}
                      setSelectedImg={setSelectedImg}
                      deleteOpen={deleteOpen}
                      setDeleteOpen={setDeleteOpen}
                      setImageOpen={setImageOpen}
                    />
                    {deleteOpen && (
                      <DeleteMenu
                        selectedImg={selectedImg}
                        setSelectedImg={setSelectedImg}
                        setDeleteOpen={setDeleteOpen}
                      />
                    )}
                    {imageOpen && (
                      <Modal
                        setImageOpen={setImageOpen}
                        selectedImg={selectedImg}
                        setSelectedImg={setSelectedImg}
                      />
                    )}
                  </div>
                )}
              </div>
              :
              <Navigate to='/login'/>
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage
                setCurrentProfile={setCurrentProfile}
                setLoggedIn={setLoggedIn}
              />
            }
          />
          {/* <Route
            path="/"
            element={
              <div>
                {loading && <Loading />}
                {!loading && !LoggedIn && (
                  <LoginPage
                    setCurrentProfile={setCurrentProfile}
                    setLoggedIn={setLoggedIn}
                  />
                )}

                {!loading && LoggedIn && (
                  <div className="main-section">
                    <ImageGrid
                      setLoggedIn={setLoggedIn}
                      currentProfile={currentProfile}
                      setSelectedImg={setSelectedImg}
                      deleteOpen={deleteOpen}
                      setDeleteOpen={setDeleteOpen}
                      setImageOpen={setImageOpen}
                    />
                    {deleteOpen && (
                      <DeleteMenu
                        selectedImg={selectedImg}
                        setSelectedImg={setSelectedImg}
                        setDeleteOpen={setDeleteOpen}
                      />
                    )}
                    {imageOpen && (
                      <Modal
                        setImageOpen={setImageOpen}
                        selectedImg={selectedImg}
                        setSelectedImg={setSelectedImg}
                      />
                    )}
                  </div>
                )}
              </div>
            }
          /> */}
        </Routes>
      </div>
    
  );
}

export default App;
