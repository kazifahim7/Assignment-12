import { useQuery } from "@tanstack/react-query";


import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { useRef, useState } from "react";
import useAxios from "../hook/useAxios";
import { useLoaderData } from "react-router-dom";




const ManageContest = () => {
    const useAxiosSecure=useAxios()
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
   const textRef=useRef()


   const [id,setId]=useState(null)
    const [currentPage, setCurrentPage] = useState(0)
    const itemPerPage = 10

    const { count } = useLoaderData()

    console.log(typeof (count))

    let numberOfPage = Math.ceil(count / itemPerPage)






    const pages = [...Array(numberOfPage).keys()]

    console.log(pages)


    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    
   

    const {data:allCOntest=[],refetch,isLoading}=useQuery({
        queryKey:['allCOntest',currentPage,itemPerPage],
        queryFn:async()=>{
            const contest = await useAxiosSecure.get(`/allContes/for/Admin?page=${currentPage}&size=${itemPerPage}`)
            return contest.data;
        }
    })


    if(isLoading){
        return <div className="flex justify-center items-center mt-52"><span className="loading loading-spinner loading-lg"></span></div>
    }

    const twoWork =  async(id) => {
       const singleData=allCOntest.find(contest=>contest._id===id)

        await useAxiosSecure.post('/add/allContest',singleData)
        .then(data=>{
            console.log(data.data)
            Swal.fire("accepted");
            refetch()
        })
       
    };

    const handleDelte=(id)=>{

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {

            useAxiosSecure.delete(`/delete/creator/collection/${id}`)
                .then(data => {
                    if (data.data) {
                        if (result.isConfirmed) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                        refetch()


                    }
                })





        });
    }
    
    
    const handleUpdate=async()=>{
        
        // let message = textRef.current.value; 
        console.log(id)

        const text = document.getElementById('text')
        let message= text.value;
       
        console.log(message)

        const info={
            comment:message
        }

       await useAxiosSecure.put(`/sendMassage/${id}`,info)
        .then(data=>{
            console.log(data.data)
            Swal.fire("massage send");
        })
        .catch(()=>{
            {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                   
                });

            }
        })


    }




   




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
                            <th>date</th>
                            <th>Action</th>
                            <th>Send comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}


                        {
                            allCOntest.map(contest => <tr key={contest._id}>
                                <th title={contest._id}>{contest.contestName}</th>
                                <td>{contest.contestType}</td>
                                <td>{contest.status}</td>
                                <td>
                                   
                                    {new Date(contest?.dates).toLocaleDateString('en-GB', options)}

                                </td>
                                <td>
                                    {
                                        contest.status === 'pending' && <button onClick={() => twoWork(contest._id)} className="btn bg-[#41b8e0] text-white">confirms</button>
                                    }
                                    
                                    <button onClick={()=>handleDelte(contest._id)} className="btn bg-[#41b8e0] text-white">Delete</button>
                                </td>

                                <td>
                                    <button  onClick={() => {
                                        document.getElementById('my_modal_3').showModal()
                                        setId(contest._id)
                                        
                                        
                                        }} className="btn bg-[#41b8e0] text-white">send comments</button>

                                    <dialog id="my_modal_3" className="modal">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg capitalize text-center">send massage</h3>
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                <textarea id="text" ref={textRef} className="textarea  textarea-info w-full" placeholder="Bio"></textarea>
                                                <button onClick={handleUpdate} className="btn bg-[#41b8e0] text-white w-full">send</button>
                                                

                                                
                                                
                                                </form>

                                           
                                           
                                           
                                            
                                            
                                            
                                        </div>
                                    </dialog>
                                  
                                </td>
                            </tr>)
                        }

                        {/* row 2 */}

                    </tbody>
                </table>

                <div className="flex justify-center  py-10 space-x-2">
                    <button onClick={handlePrev} className="btn bg-[#41b8e0]">Prev</button>

                    {
                        pages.map(page => <button onClick={() => setCurrentPage(page)} key={page} className={`btn bg-[#41b8e0] text-black ${currentPage === page && 'bg-orange-400'} `}>{page}</button>)
                    }
                    <button onClick={handleNext} className="btn bg-[#41b8e0] text-black">Next</button>
                </div>

            </div>

            <div>

            </div>
        </div>
    );
};

export default ManageContest;