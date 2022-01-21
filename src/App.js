import Navbar from './components/Navbar'
import Title from './components/Title'
import UploadForm from './components/UploadForm';
import ImageGrid from './components/ImageGrid';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className="main-section">
      <UploadForm/>
      <ImageGrid />
    
      </div>
     
    </div>
  );
}

export default App;
