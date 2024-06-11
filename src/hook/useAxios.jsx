import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'https://serversite12.vercel.app'
})
const useAxios = () => {
    const { logout } = useContext(AuthContext)

    const navigate = useNavigate()


    axiosSecure.interceptors.request.use(function (config) {
        // Do something before request is sent

        config.headers.authorization = `Bearer ${localStorage.getItem('access-token')}`




        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, async function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if (error.response.status === 401 || error.response.status === 403) {
            await logout()
                .then(() => {
                    navigate('/login')

                })

        }


        return Promise.reject(error);
    });



    return axiosSecure;
};

export default useAxios;