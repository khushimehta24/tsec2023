import { toast } from "material-react-toastify";

export default function axiosHandler(error) {
    toast.error(error);
    return;
}