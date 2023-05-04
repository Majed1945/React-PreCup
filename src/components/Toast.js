import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const toastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};
const showToast = (message, type = "info") => {
  switch (type) {
    case "success":
      toast.success(message, toastOptions);
      break;
    case "error":
      toast.error(message, toastOptions);
      break;
    case "warning":
      toast.warning(message, toastOptions);
      break;
    default:
      toast.info(message, toastOptions);
      break;
  }
};
export default showToast;
