import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

import usePublicAxios from "../hook/usePublicAxios";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'



const SeeSubmisson = () => {
    const { user,title }=useContext(AuthContext)
    const axiosPublic=usePublicAxios()
    const {data :submission=[],refetch}=useQuery({
        queryKey:['see submission',title,user?.email],
        queryFn:async()=>{
            const result = await axiosPublic.get(`/host/contest/title/${user?.email}?contest=${title}`)
            return result.data
        }
    })

    const handleClick=(id)=>{
        console.log(id)

        document.getElementById('my_modal_3').showModal()

    }

    const winHandler=id=>{
        console.log(id)

        const singleData=submission.find(item=>item._id===id)
        console.log(singleData)
        const info={
            ContestId: singleData?.ContestId,
            contestName: singleData?.contestName,
            contestType: singleData?.contestType,
            hostEmail: singleData?.hostEmail,
            hostImage: singleData?.hostImage,
            hostName: singleData?.hostName,
            participateUserEmail: singleData?.participateUserEmail,
            participateUserName: singleData?.participateUserName,
            participateUserPhoto: singleData?.participateUserPhoto,
            
            
            status: 'win',
            othersId:submission.filter(item=>item._id!==id).map(item=>item._id),
            submissionId:id,








            

        }


        console.log(info)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {

            axiosPublic.post('/setResult',info)
            .then(data=>{
                if(data.data){
                    refetch()
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "winner selected",
                            text: "congratulation.",
                            icon: "success"
                        });
                    }

                }
            })
            .catch(error=>{
                console.log(error)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    
                });
            })







            
        });





    }





    return (
        <div>
            <h1 className="text-4xl text-center capitalize font-bold">See Submission</h1>

            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-[#0ecdb9] text-white ">
                            <tr>
                                <th>contest name </th>
                                <th>participant name</th>
                                <th>participant Email</th>
                                <th>submitted task</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}

                            {
                                submission.length > 0 ? <> {
                                    submission.map(item => <tr key={item._id}>
                                        <th>{item?.contestName}</th>
                                        <td>{item?.participateUserName}n</td>
                                        <td>{item?.participateUserEmail}</td>
                                        <td onClick={()=>handleClick(item._id)} className="underline">See Submission</td>
                                        {item.status === 'pending' && <td><button onClick={() => winHandler(item._id)} className="btn bg-[#0ecdb9]">Win</button></td>}
                                        {
                                            item.status==='winner'&&<td className="font-extrabold">winner</td>
                                        }
                                        {
                                            item.status === 'Unsuccess' && <td className="font-extrabold">Un-success</td>
                                        }
                                        <dialog id="my_modal_3" className="modal">
                                            <div className="modal-box">
                                                <h3 className="font-bold text-lg capitalize text-center">see Task answer</h3>
                                               
                                                <form method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Ques :  {item?.task}</span>
                                                        </label>
                                                        <textarea value={item?.answer} rows={25} className="textarea textarea-bordered" placeholder="Bio"></textarea>
                                                    </div>
                                                </form>
                                                
                                            </div>
                                        </dialog>
                                    </tr>)
                                }
                             </> : <tr>
                                    <td colSpan="5" className="text-center">No submissions found.</td>
                                </tr>
                            }



                          
                         
                        </tbody>
                    </table>
                </div>
            </div>

            
        </div>
    );
};

export default SeeSubmisson;