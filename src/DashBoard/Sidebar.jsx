
import { useContext, useState } from 'react'
import { GrLogout } from 'react-icons/gr'

import { BsFillHouseAddFill } from 'react-icons/bs'

import { AiOutlineBars } from 'react-icons/ai'

import { NavLink, useNavigate } from 'react-router-dom'
import { SiTicktick } from "react-icons/si";

import { Link } from 'react-router-dom'
import { MdHomeWork } from 'react-icons/md'
import { AuthContext } from '../AuthProvider/AuthProvider'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { FaUser } from 'react-icons/fa'
import { IoIosAddCircle } from "react-icons/io";
import { RiStickyNote2Fill2 } from "react-icons/ri";
import { TfiCup } from "react-icons/tfi";
import useRole from '../hook/useRole'


const Sidebar = () => {
    const { logout, setLoading } = useContext(AuthContext)
    const [isActive, setActive] = useState(false)
    const navigate=useNavigate()

    const [isPosition]=useRole()

    // Sidebar Responsive Handler
    const handleToggle = () => {
        setActive(!isActive)
    }
    const handelLogIN=()=>{
        logout()
            .then(() => {
                Swal.fire({
                    title: "LogOut success",
                    text: "You clicked the button!",
                    icon: "success"
                });
                navigate('/')
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
                setLoading(false)

            })
    }
    return (
        <>
            {/* Small Screen Navbar */}
            <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
                <div>
                    <div className='block cursor-pointer p-4 font-bold'>
                        <Link to='/'>
                            <div className="flex justify-center items-center gap-2">
                                <img src="https://i.ibb.co/7RVpQM8/community-06.png" alt="" className="w-12" />
                                <p className="text-[#0ecdb9] font-bold text-2xl">ContestHub</p>
                            </div>
                        </Link>
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
                >
                    <AiOutlineBars className='h-7 w-7 text-[#0ecdb9]' />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-[#212529] text-white w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                    }  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                <div>
                    <div>
                        <div className='w-full hidden md:flex px-4 py-2  rounded-lg justify-center items-center  mx-auto text-white'>
                            <Link to='/'>
                                <div className="flex justify-center items-center gap-2">
                                    <img src="https://i.ibb.co/7RVpQM8/community-06.png" alt="" className="w-12" />
                                    <p className="text-[#0ecdb9] font-bold text-2xl">ContestHub</p>
                                </div>
                            </Link>
                        </div>

                        <h1 className='capitalize text-center'>{isPosition}</h1>
                    </div>

                    {/* Nav Items */}
                    <div className='flex flex-col justify-between flex-1 mt-6'>
                 
                        <nav>
                            {/* admin */}
                            {
                                isPosition==='admin'&&<>

                                    <NavLink
                                        to='/dashboard/ManageUser'
                                        end
                                        className={({ isActive }) =>
                                            `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-white'
                                            }`
                                        }
                                    >
                                        <FaUser className='w-5 h-5' />

                                        <span className='mx-4 font-medium'>Manage User</span>
                                    </NavLink>


                                    <NavLink
                                        to='/dashboard/ManageContests'
                                        className={({ isActive }) =>
                                            `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-white'
                                            }`
                                        }
                                    >
                                        <BsFillHouseAddFill className='w-5 h-5' />

                                        <span className='mx-4 font-medium'>Manage Contests</span>
                                    </NavLink>
                                
                                </>
                            }
                            
                           

                            {/* host routes */}

                            {
                                isPosition==='host'&&<>

                                    <NavLink
                                        to='/dashboard/AddContest'
                                        className={({ isActive }) =>
                                            `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-white'
                                            }`
                                        }
                                    >

                                        <IoIosAddCircle className='w-5 h-5' />

                                        <span className='mx-4 font-medium'>Add Contest</span>
                                    </NavLink>
                                    <NavLink
                                        to='/dashboard/myContest'
                                        className={({ isActive }) =>
                                            `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-white'
                                            }`
                                        }
                                    >
                                        <MdHomeWork className='w-5 h-5' />

                                        <span className='mx-4 font-medium'>Created Contest</span>
                                    </NavLink>
                                    <NavLink
                                        to='/dashboard/submitted'
                                        className={({ isActive }) =>
                                            `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-white'
                                            }`
                                        }
                                    >

                                        <SiTicktick className='w-5 h-5' />

                                        <span className='mx-4 font-medium'>Contest Submitted</span>
                                    </NavLink>
                                
                                
                                </>
                            }





                            {/* host routes end... */}

                            {/* user routes */}

                            {
                                isPosition==='user'&&<>

                                    <NavLink
                                        to='/dashboard/participate'
                                        className={({ isActive }) =>
                                            `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-white'
                                            }`
                                        }
                                    >


                                        <RiStickyNote2Fill2 className='w-5 h-5' />

                                        <span className='mx-4 font-medium'>Participated Contest</span>
                                    </NavLink>
                                    <NavLink
                                        to='/dashboard/WinningContest'
                                        className={({ isActive }) =>
                                            `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-white'
                                            }`
                                        }
                                    >


                                        <TfiCup className='w-5 h-5' />

                                        <span className='mx-4 font-medium'>Winning Contest</span>
                                    </NavLink>
                                    <NavLink
                                        to='/dashBoard/myProfile'
                                        className={({ isActive }) =>
                                            `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-white'
                                            }`
                                        }
                                    >
                                        <FaUser className='w-5 h-5' />

                                        <span className='mx-4 font-medium'>My Profile</span>
                                    </NavLink>
                                
                                </>
                            }





                        
                        </nav>
                    </div>
                </div>

                <div>
                    <hr />

                    {/* Profile Menu */}
                   
                    <button
                        onClick={handelLogIN}
                        className='flex w-full items-center px-4 py-2 mt-5 text-[white] hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
                    >
                        <GrLogout className='w-5 h-5' />

                        <span className='mx-4 font-medium'>Logout</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Sidebar