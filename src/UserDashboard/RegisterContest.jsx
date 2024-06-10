import { useContext} from "react";
import usePublicAxios from "../hook/usePublicAxios";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router-dom";









const RegisterContest = () => {
   
    const axiosPublic = usePublicAxios()
    const { user } = useContext(AuthContext)
    const { data,isLoading,refetch } = useQuery({
        queryKey: ['registerData', user?.email],
        queryFn: async () => {
            const register = await axiosPublic.get(`/getRegisterContest/${user?.email}`)
            return register.data
        }
    })
    if(isLoading){
        
        
        return <div className="flex justify-center items-center pt-72"><span className="loading loading-spinner loading-lg"></span></div>
    }
    refetch()




    return (
        <div>
            <div className="hero" style={{ backgroundImage: 'url(https://egamlio.vercel.app/images/top-coches-bg.png)' }}>
                <div className="hero-overlay"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md pt-36">
                        <h1 className="mb-5 text-5xl font-bold">Register Page</h1>
                        
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto my-8 container mx-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-gray-400 text-white">
                        <tr>
                            <th>Contest Name</th>
                            <th>Contest type</th>
                            <th>Contest Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            data?.map(item => <tr key={item?._id} className="space-x-4">
                                <th>{item?.contestName}</th>
                                <td>{item?.contestType}</td>
                                <td className="text-yellow-600 ">{item?.price} $</td>
                                <td> <Link to={`/payment/${item?._id}`}><button className="btn bg-[#0ecdb9] border-none rounded-2xl  text-white">Pay </button></Link></td>

                                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                                
                              
                            </tr>)
                        }
                        
                        {/* row 2 */}
                      
                    </tbody>
                </table>
            </div>
          

             


            
        </div>
    );
};

export default RegisterContest;