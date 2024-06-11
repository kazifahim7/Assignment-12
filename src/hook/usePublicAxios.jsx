import axios from "axios";



const axiosPublic = axios.create({
    baseURL: 'https://serversite12.vercel.app',
})
const usePublicAxios = () => {
    return axiosPublic
};

export default usePublicAxios;