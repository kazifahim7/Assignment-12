import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";


const useVerified = () => {
    const { user, loading } = useContext(AuthContext)
    const axiosSecure = useAxios()

    const { data: isVerified = [],isLoading } = useQuery({
        queryKey: ['veriFied', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/verified/${user?.email}`)

            return res.data?.permission
        }
    })








    return [isVerified,isLoading]
};

export default useVerified;