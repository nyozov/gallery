import Navbar from './components/Navbar'
import Title from './components/Title'
import UploadForm from './components/UploadForm';
import ImageGrid from './components/ImageGrid';
import Modal from './components/Modal';
import { useState } from 'react';

function App() {

  const [selectedImg, setSelectedImg] = useState(null)
  const [imgId, setImgId] = useState(null)
  return (
    <div className="App">
      <Navbar/>
      <div className="main-section">
      <UploadForm/>
      <ImageGrid setImgId={setImgId} setSelectedImg={setSelectedImg}/>
      {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg}/>}
    
      </div>
     
    </div>
  );
}

export default App;
