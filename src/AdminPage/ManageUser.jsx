import { useQuery } from "@tanstack/react-query";
import useAxios from "../hook/useAxios";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'


const ManageUser = () => {

    const axiosSecure = useAxios()

    const { data = [], refetch,isLoading } = useQuery({
        queryKey: ['allUser'],
        queryFn: async () => {
            const users = await axiosSecure.get('/users')
            return users.data;
        }
    })

    if(isLoading){
        return <div className="flex justify-center items-center mt-52"><span className="loading loading-spinner loading-lg"></span></div>
    }


    const changeRole = (id, role) => {
        console.log(id, role)

        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                const info = {
                    newRole: role
                }

                axiosSecure.put(`/update/user/role/${id}`, info)
                    .then(data => {
                        if (data.data) {
                            console.log(data)
                            Swal.fire("Saved!", "", "success");
                            refetch()

                        }
                    })








            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });

    }


    const handleBlock = (id, status) => {



        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                const info = {
                    newStatus: status
                }

                axiosSecure.put(`/block/user/${id}`,info)
                    .then(data => {
                        if (data.data) {
                            console.log(data)
                            Swal.fire("Saved!", "", "success");
                            refetch()

                        }
                    })








            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });


    }

    const handleDelete=(id)=>{
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/delete/users/${id}`)
                .then(data=>{
                    if(data.data){
                        swalWithBootstrapButtons.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        refetch()

                    }
                })






               
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    icon: "error"
                });
            }
        });

    }








    return (
        <div className="">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-[#4684c7] text-white">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            data.map(user => <tr key={user._id} className="bg-base-200">
                                <th>{user.name}</th>
                                <td>{user.email}</td>
                                <td className="capitalize">{user.role}</td>
                                <td>

                                    <div className="dropdown dropdown-right ">
                                        <div tabIndex={0} role="button" className="btn m-1 bg-[#0ecdb9] text-white">Change Role</div>
                                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                            <li onClick={() => changeRole(user._id, 'admin')}><a>Admin</a></li>
                                            <li onClick={() => changeRole(user._id, 'host')}><a>Host</a></li>
                                            <li onClick={() => changeRole(user._id, 'user')}><a>User</a></li>
                                        </ul>
                                    </div>
                                </td>
                                <td>
                                    <button onClick={()=>handleDelete(user._id)} className="btn bg-[#0ecdb9] text-white">Delete</button>

                                    {
                                        user?.status === 'verified' ? <button onClick={() => handleBlock(user._id, 'block')} className="btn bg-[#e04141] text-white">Block</button> : <button onClick={() => handleBlock(user._id, 'verified')} className="btn bg-[#e04141] text-white">unBlock</button>
                                    }


                                </td>
                            </tr>)
                        }




                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUser;