import {  projectStorage, projectFirestore, doc, deleteDoc } from '../firebase/config'


const handleDelete = async (url) => {
  projectFirestore.collection('images').doc(url).delete()
  try{
    console.log('success delete')
    
  } catch (err) {
    alert(err)
  }
}

  const addUserToDB = (uid, email) => {
    projectFirestore.collection("users").doc(uid).set({
      email,
      
  })
  .then(() => {
      console.log("Document successfully written!");
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });
  }


export { handleDelete, addUserToDB }