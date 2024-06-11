import { useQuery } from "@tanstack/react-query";
import usePublicAxios from "./usePublicAxios";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";


const useWinerData = () => {
    const axiosPublic=usePublicAxios()
    const {user}=useContext(AuthContext)
    
    const {data=[],isLoading}=useQuery({
        queryKey:['my-wining-status',user?.email],
        queryFn:async()=>{
            const result = await axiosPublic.get(`/my-wining/status/${user?.email}`)
            return result.data;
        }
    })

    return [data,isLoading]
};

export default useWinerData;