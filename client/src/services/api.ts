import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import useJwt from '@/services/jwt';

const api = axios.create({
    baseURL: process.env.SERVER_URL,
});

api.interceptors.request.use(function (request) {
    const { getJwt } = useJwt();

    const token = getJwt();

    if (!token) return request;

    request.headers['Authorization'] = `Bearer ${token}`;

    return request;
});

const handleErrorWithToast = (error) => {
    const toastUnknownError = () => toast.error('An error occurred, please refresh your page');

    if (!error instanceof AxiosError) {
        if (process.env.NODE_ENV === 'development') {
            console.error(error);
        }
        toastUnknownError();
        return error;
    }

    const errors = error.response?.data?.errors;

    if (errors) {
        errors.forEach(toast.error);
    } else {
        toastUnknownError();
    }

    return error;
};

export { api, handleErrorWithToast };
