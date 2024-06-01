import axios from "axios";



const axiosPublic = axios.create({
    baseURL: 'http://localhost:7000',
})
const usePublicAxios = () => {
    return axiosPublic
};

export default usePublicAxios;