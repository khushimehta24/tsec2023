import { toast } from 'material-react-toastify';

export default function errorHandler(error) {
    toast.error(error);
}