import {toast} from "react-toastify";

export const onToast = (msg, type) => {
    if(type === 'error') {
        toast.error(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
        });
    } else if(type === 'success') {
        toast.success(msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
        });
    } else if(type === 'warn') {
        toast.warn(msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
        });
    }
}