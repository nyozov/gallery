import { useState, useEffect, useContext } from 'react'
import { UserContext } from './UserContext';
import { auth } from '../firebase/config';


import { projectStorage, projectFirestore, timestamp } from '../firebase/config'

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  const { currentUser } = useContext(UserContext)

  useEffect(() => {
    // references
    const storageRef = projectStorage.ref(file.name);
    const collectionRef = projectFirestore.collection('images')

    storageRef.put(file).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage)
    }, (err) => {
      setError(err)
    }, async () => {
      const url = await storageRef.getDownloadURL();
      const createdAt = timestamp();
      const userId = auth.currentUser.uid
      collectionRef.add({ url, createdAt, userId })
      setUrl(url)
    })

  }, [file])

  return { progress, url, error }

}

export default useStorage;