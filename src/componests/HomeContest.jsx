import { Link } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import usePublicAxios from "../hook/usePublicAxios";


const HomeContest = () => {
    
    const axiosPublic=usePublicAxios()


    const {data:allData=[]}=useQuery({
        queryKey:['all'],
        queryFn:async()=>{
            const result = await axiosPublic.get(`/allData-for/home/page?sort=${'asc'}`)
            return result.data;
        }
    })





    return (
        <div className="-mt-2 md:-mt-[55px]">
            <div className="hero min-h-screen bg-[#1f2340] text-white">
                <div className="hero-content">
                    <div className="w-full pt-32">
                        <h1 className="text-5xl font-bold uppercase text-center "> popular contest</h1>


                        <div className="bg-[#1f2340] text-slate-400 p-10 grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-7">
                            {
                                allData.length < 1 && <div className="flex justify-center items-center mt-52"><span className="loading loading-spinner loading-lg"></span></div>
                            }


                            {

                                allData.slice(0, 6).filter(item => item.status === 'accepted').map(data => <div key={data._id} className="card h-full text-slate-400 bg-[#1f2340] shadow-xl text-black">
                                    <figure><img src={data?.image} alt="Shoes" /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">
                                            {data?.contestName}

                                        </h2>
                                        <p><span className="text-[#0ecdb9] font-bold">Description </span>: {data?.description.slice(0, 60)}....</p>
                                        <p> <span className="text-[#0ecdb9] font-bold">Participated </span>: {data?.participated}</p>
                                        <div className="card-actions justify-end">
                                            <Link to={`/allContests/${data?._id}`}><div className="badge badge-outline">Details</div></Link>
                                            <Link to={`/allContest`}><div className="badge badge-outline">All Contest</div></Link>
                                        </div>
                                    </div>
                                </div>)
                            }











                        </div>
                        
                       

                    </div>
                   
                </div>
            </div>

        </div>
    );
};

export default HomeContest;