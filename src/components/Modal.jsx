import { handleDelete } from "../hooks/handleDelete"

export default function Modal({ setImageOpen, selectedImg, setSelectedImg }){
  const handleClick = (e) => {
    if(e.target.classList.contains('backdrop', 'deleteButton')){
    setImageOpen(false)
    setSelectedImg(null)

    }
  }
  const deleteImg = ()=>{
    handleDelete(selectedImg.id)
    setSelectedImg(null)
  }
  return (
    <div className="backdrop" onClick={handleClick}>
      <img src={selectedImg.url} alt="enlarged pic" />
      <button className='deleteButton'onClick={deleteImg}>delete</button>

    </div>
  )
}