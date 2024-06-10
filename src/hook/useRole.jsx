import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";


const useRole = () => {
    const { user, loading }=useContext(AuthContext)
    const axiosSecure=useAxios()

   const {data : isPosition='',isLoading}=useQuery({
    queryKey:['role', user?.email],
    enabled:!loading,
    queryFn:async()=>{
        const res = await axiosSecure.get(`/users/${user?.email}`)
        
        return res.data?.position
    }
   })

   






    return [isPosition,isLoading]
};

export default useRole;