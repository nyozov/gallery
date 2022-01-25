import Navbar from "./components/Navbar";
import UploadForm from "./components/UploadForm";
import ImageGrid from "./components/ImageGrid";
import Modal from "./components/Modal";
import { useEffect, useState } from "react";
import LoginPage from "./components/LoginPage";
import { auth } from "./firebase/config";
import Loading from "./components/Loading";


function App() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [LoggedIn, setLoggedIn] = useState(false);
 
  //show loading screen while user is being fetched by firebase auth
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);
  auth.onAuthStateChanged((user) => {
    if (!user) {
      console.log("auth did not work");
      setLoading(false)
    } else {
      console.log("auth worked");
      console.log(user);
      setLoading(false);
      setLoggedIn(true);
    }
  });

  return (
    <div className="App">
      {loading && <Loading />}
      {!LoggedIn && !loading && <LoginPage setLoggedIn={setLoggedIn} />}

      {LoggedIn && !loading && (
        <>
          <Navbar setLoggedIn={setLoggedIn} />
          <div className="main-section">
            <UploadForm />
            <ImageGrid setSelectedImg={setSelectedImg} />
            {selectedImg && (
              <Modal
                selectedImg={selectedImg}
                setSelectedImg={setSelectedImg}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
