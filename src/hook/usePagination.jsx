import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const usePagination = () => {

    const { user } = useContext(AuthContext)
    const { data: count = [] } = useQuery({
        queryKey: ['mydata'],
        queryFn: async () => {
            const result = await axios.get(`https://serversite12.vercel.app/count/host/contest/${user?.email}`)
            return result.data.count
        }
    })

    return [count]

};

export default usePagination;
