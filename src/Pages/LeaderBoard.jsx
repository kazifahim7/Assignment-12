import { useQuery } from "@tanstack/react-query";
import usePublicAxios from "../hook/usePublicAxios";


const LeaderBoard = () => {
    const axiosPublic=usePublicAxios()

    const {data=[],isLoading}=useQuery({
        queryKey:['leaderBoard'],
        queryFn:async()=>{
            const result = await axiosPublic.get('/leaderBoard')
            return result.data;



        }
    })
    if(isLoading){
        return <div className="flex justify-center items-center pt-72"><span className="loading loading-spinner loading-lg"></span></div>
    }





    return (
        <div className=" container mx-auto ">

            <h1 className="pt-40 text-center font-extrabold text-5xl pb-3 text-[#0ecdb9] capitalize">Leaderboard</h1>
            <div className="overflow-x-auto mb-5">
                <table className="table table-zebra">
                    {/* head */}
                    <thead className="bg-[#0ecdb9] text-black">
                        <tr>
                            <th></th>
                            <th>winer Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Total Win</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            data?.map((item,index) => <tr key={item._id}>
                                <th>{index+1}</th>
                                <th><img src={item?.winerPhoto} alt="" className="w-14 h-14 rounded-full" /></th>
                                <td>{item?.winerName}</td>
                                <td>{item?.participateUserEmail}</td>
                                <td>{item?.winCount}</td>
                            </tr>)
                        }
                        
                      
                        
                      
                    </tbody>
                </table>
            </div>
             
            
        </div>
    );
};

export default LeaderBoard;