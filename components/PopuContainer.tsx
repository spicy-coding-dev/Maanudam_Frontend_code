import { ToastContainer } from "react-toastify";


const PopupContainer = () => {
  return (
    <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
      />
  )
}

export default PopupContainer