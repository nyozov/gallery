import Navbar from "./components/Navbar";
import Title from "./components/Title";
import UploadForm from "./components/UploadForm";
import ImageGrid from "./components/ImageGrid";
import Modal from "./components/Modal";
import { useState, useContext, useEffect } from "react";
import LoginPage from "./components/LoginPage";
import { auth } from "./firebase/config";
import { UserContext } from "./hooks/UserContext";

function App() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [currentUser, setCurrentUser] = useState({ id: "", name: "" });

  return (
    <div className="App">
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        {auth.currentUser == null && <LoginPage />}

        {auth.currentUser && (
          <>
            <Navbar />
            <div className="main-section">
              <UploadForm currentUser={currentUser} />
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
      </UserContext.Provider>
    </div>
  );
}

export default App;
