import Navbar from "./components/Navbar";
import UploadForm from "./components/UploadForm";
import ImageGrid from "./components/ImageGrid";
import Modal from "./components/Modal";
import { useState } from "react";
import LoginPage from "./components/LoginPage";
import { auth } from "./firebase/config";

function App() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [LoggedIn, setLoggedIn] = useState(false);

  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("auth worked");
      console.log(user);
    } else {
      console.log("auth did not work");
    }
  });

  return (
    <div className="App">
      {!LoggedIn && <LoginPage setLoggedIn={setLoggedIn} />}

      {LoggedIn && (
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
