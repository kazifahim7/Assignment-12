import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hook/useAxios";
import { Link } from "react-router-dom";



const MyContest = () => {

    const {user}=useContext(AuthContext)
    const useAxiosSecure=useAxios()

    const {data=[]}=useQuery({
        queryKey:['mylist',user?.email],
        queryFn:async()=>{
            const contest = await useAxiosSecure.get(`http://localhost:7000/host/contest/${user?.email}`)
            return contest.data
        }
    })



    return (
        <div>
            <h2 className="font-bold text-4xl text-center">---My Contest---</h2>
            <div className="overflow-x-auto">
                <table className="table  mt-2">
                    {/* head */}
                    <thead className="bg-[#0ecdb9]">
                        <tr>
                            <th>ContestName</th>
                            <th>contestType</th>
                            <th>status</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}


                        {
                            data.map(constest => <tr key={constest._id}>
                                <th>{constest.contestName}</th>
                                <td>{constest.contestType}</td>
                                <td>{constest.status}</td>
                                <td>
                                    {
                                        constest.status === 'pending' ? <div><button className="btn bg-[#e04141] text-white">Delete</button> <button className="btn bg-[#41b8e0] text-white">Edit</button></div> :'already updated'
                                    }
                                    <Link to={'/dashboard/submitted'}><button className="btn bg-[#41b8e0] text-white">see submission</button></Link>

                                </td>
                            </tr>)
                        }
                       
                        {/* row 2 */}
                       
                    </tbody>
                </table>
            </div>

            
        </div>
    );
};

export default MyContest;