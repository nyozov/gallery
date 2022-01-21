import {  projectStorage, projectFirestore, doc, deleteDoc } from '../firebase/config'


const handleDelete = async (url) => {
  projectFirestore.collection('images').doc(url).delete()
  try{
    console.log('success delete')
    
  } catch (err) {
    alert(err)
  }
}

export default handleDelete