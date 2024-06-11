import { useEffect } from "react";
import useWinerData from "../hook/useWinerData";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'


const WiningContest = () => {
    const [data, isLoading]=useWinerData()


    useEffect(()=>{
        if(data.length>0){
           
            Swal.fire({
                title: "Winner",
                
                imageUrl: "https://i.ibb.co/4KRv967/56738.jpg",
                imageHeight: 250,
                imageWidth:300,
                imageAlt: "A tall image"
            });

        }


    },[data])

    if(isLoading){
        return <div className="flex justify-center items-center pt-72"><span className="loading loading-spinner loading-lg"></span></div>
    }



    return (
        <div>
            
            <h1 className="text-4xl text-center font-extrabold capitalize">Winning contest</h1>

            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-[#0ecdb9] text-white">
                            <tr>
                                <th></th>
                                <th>ContestName</th>
                                
                                
                                <th>contestType</th>
                                <th>Status</th>
                                <th>Comments</th>
                            </tr>
                        </thead>
                        <tbody>


                            {
                                data.length > 0 ? <>{
                                    data.map((item, index) => <tr key={item._id} className="bg-base-200">
                                        <th>{index + 1}</th>
                                        <td>{item?.contestName}</td>

                                        <td>{item?.contestType}</td>
                                        <td className="text-lime-700 font-bold">Win</td>
                                        <td>congratulation</td>
                                    </tr>)
                                }</> : <p className="text-center">wining result is empty</p>
                            }
                            
                            
                        </tbody>
                    </table>
                </div>


            </div>


        </div>
    );
};

export default WiningContest;