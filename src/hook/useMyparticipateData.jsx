import { useQuery } from "@tanstack/react-query";
import usePublicAxios from "./usePublicAxios";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";


const useMyparticipateData = () => {
 const axiospublic=usePublicAxios()
 const {user}=useContext(AuthContext)

 const {data : mydata=[]}=useQuery({
    queryKey:['mydata',user?.email],
    queryFn:async()=>{
        const result = await axiospublic.get(`/myParticipateData/${user?.email}`)
        return result.data;
    }
 })

 return [mydata]
};

export default useMyparticipateData;