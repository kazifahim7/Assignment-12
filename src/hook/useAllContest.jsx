import { useQuery } from "@tanstack/react-query";
import usePublicAxios from "./usePublicAxios";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";


const useAllContest = () => {
    const axiosPublic=usePublicAxios()

    const { inputData }=useContext(AuthContext)

    const {data:allData=[],refetch,isLoading}=useQuery({
        queryKey:['all',inputData],
        queryFn:async()=>{
            const allContest = await axiosPublic.get(`/allData/everyone?search=${inputData}&sort=${'asc'}`)
            return allContest.data
        }
    })
    console.log(allData)

    return [allData,refetch,isLoading]
};

export default useAllContest;