import { Close } from "@mui/icons-material";

export default function Modal({ setImageOpen, selectedImg, setSelectedImg }) {
  const handleClick = (e) => {
    if (e.target.classList.contains("backdrop", "deleteButton")) {
      setImageOpen(false);
      setSelectedImg(null);
    }
  };

  const handleExit = () => {
    setImageOpen(false);
    setSelectedImg(null);
  };

  return (
    <div className='relative'>
    <div className="flex justify-center items-center backdrop-blur-sm backdrop" onClick={handleClick}>
      <div
        onClick={handleExit}
        className="text-gray-600 rounded-full hover:bg-gray-200 hover:cursor-pointer absolute top-5 right-5"
      >
        <Close />
      </div>
      <img src={selectedImg.url} alt="enlarged pic" />
    </div>
    </div>
  );
}
