import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hook/useAxios";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import usePagination from "../hook/usePagination";



const MyContest = () => {

    const { user } = useContext(AuthContext)
    const useAxiosSecure = useAxios()
    const [currentPage, setCurrentPage] = useState(0)


    const itemPerPage = 10
    const [count] = usePagination()


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






    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['mylist', user?.email, currentPage, itemPerPage],
        queryFn: async () => {
            const contest = await useAxiosSecure.get(`https://serversite12.vercel.app/host/contest/${user?.email}?page=${currentPage}&size=${itemPerPage}`)
            return contest.data
        }
    })



    if (isLoading) {
        return <div className="flex justify-center items-center mt-52"><span className="loading loading-spinner loading-lg"></span></div>
    }




    const handleDelete = id => {
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

    const seeComments = (text) => {
        Swal.fire(text)


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
                            <th>Action</th>
                            <th>Action</th>
                            <th>See comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}


                        {
                            data.map(contest => <tr key={contest._id}>
                                <th>{contest.contestName}</th>
                                <td>{contest.contestType}</td>
                                <td>{contest.status}</td>
                                <td>
                                    {
                                        contest.status === 'pending' ? <div><button onClick={() => handleDelete(contest._id)} className="btn bg-[#e04141] text-white">Delete</button> <Link to={`/dashboard/update/${contest._id}`}><button className="btn bg-[#41b8e0] text-white">Edit</button></Link></div> : 'already updated'
                                    }


                                </td>
                                <td><Link to={'/dashboard/submitted'}><button className="btn bg-[#41b8e0] text-white">see submission</button></Link></td>

                                <td>
                                    {contest.comments === 'improved It' ? 'no comments' : <button onClick={() => seeComments(contest.comments)} className="btn bg-[#41b8e0] text-white">see comments</button>}
                                </td>
                            </tr>)
                        }

                        {/* row 2 */}

                    </tbody>
                </table>
            </div>

            <div className="flex justify-center  py-10 space-x-2">
                <button onClick={handlePrev} className="btn bg-[#41b8e0]">Prev</button>

                {
                    pages.map(page => <button onClick={() => setCurrentPage(page)} key={page} className={`btn bg-[#41b8e0] text-black ${currentPage === page && 'bg-orange-400'} `}>{page}</button>)
                }
                <button onClick={handleNext} className="btn bg-[#41b8e0] text-black">Next</button>
            </div>


        </div>
    );
};

export default MyContest;