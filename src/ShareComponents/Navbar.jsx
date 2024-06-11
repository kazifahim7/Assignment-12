import { Link, NavLink, useNavigate } from "react-router-dom";

import './navbar.css'
import { FaLongArrowAltRight } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import useRole from "../hook/useRole";
import useVerified from "../hook/useVerified";


const Navbar = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light')
    const [show ,setShow]=useState(false)

    const { user, logout, setLoading }=useContext(AuthContext)
    const navigate=useNavigate()
    


    useEffect(() => {
        localStorage.setItem('theme', theme)
        localStorage.getItem('theme')
        document.querySelector('html').setAttribute('data-theme', theme)

    }, [theme])



    const themeController = e => {
        if (e.target.checked) {
            setTheme('dark')
        }
        else {
            setTheme('light')
        }
    }

    const handleClick=()=>{
        setShow(!show)
        console.log(show)

    }

    const handleOut=()=>{
        logout()
        .then(()=>{
            Swal.fire({
                title: "LogOut success",
                text: "You clicked the button!",
                icon: "success"
            });
            navigate('/')
        })
        .catch(()=>{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
            setLoading(false)
        
        })

    }

    const [isPosition]=useRole()

 

    

    const [isVerified]=useVerified()

    console.log(isVerified)
    





    return (
        <div className="absolute w-full z-20">
            <div className="navbar bg-[#15151580] ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0ecdb9]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ">
                            <NavLink to={'/'}>Home</NavLink>
                            <NavLink to={'/allContest'}>All contest</NavLink>
                            <NavLink to={'/LeaderBoard'}>LeaderBoard</NavLink>
                            <NavLink to={'/upcomingContest'}>Upcoming</NavLink>
                            <NavLink to={'/news'}>News</NavLink>
                            
                        </ul>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <img src="https://i.ibb.co/7RVpQM8/community-06.png" alt="" className="w-12" />
                        <p className="text-[#0ecdb9] font-bold text-2xl">ContestHub</p>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-[18px] space-x-5 text-white">
                        <NavLink to={'/'}>Home</NavLink>
                        <NavLink to={'/allContest'}>All contest</NavLink>
                        <NavLink to={'/LeaderBoard'}>LeaderBoard</NavLink>
                        <NavLink to={'/upcomingContest'}>Upcoming</NavLink>
                        <NavLink to={'/news'}>News</NavLink>
                    </ul>
                </div>
                <div className="navbar-end space-x-3">
                    <div>
                        <label className="swap swap-rotate">

                            {/* this hidden checkbox controls the state */}
                            <input type="checkbox" onChange={themeController} className="theme-controller" checked={theme === 'light' ? false : true} />

                            {/* sun icon */}
                            <svg className="swap-off fill-current w-10 h-10 text-[#0ecdb9]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

                            {/* moon icon */}
                            <svg className="swap-on fill-current w-10 h-10 text-[#0ecdb9]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

                        </label>
                    </div>

                    {
                        user ? <div title={user?.displayName} onClick={handleClick} className="avatar">
                            <div className="w-16 rounded-full border-4">
                                <img src={user?.photoURL} alt="loading"/>
                            </div>

                            {
                                show && <div  className="absolute top-14 right-16 border-2 z-40 w-40 h-28 rounded-l-2xl rounded-b-2xl bg-[#1f2340] p-5 text-white ">

                                    

                                    {
                                        isPosition === 'admin' && <NavLink to={'/dashboard/ManageUser'}>DashBoard</NavLink>
                                    }
                                    {
                                        isPosition === 'host' && <NavLink to={'/dashboard/AddContest'}>DashBoard</NavLink>
                                    }
                                    {
                                        (isPosition === 'user' || isVerified === 'verified') && <NavLink to={'/dashboard/participate'}>Dashboard</NavLink>
                                    }

                                    <button onClick={handleOut} className="btn bg-[#0ecdb9] border-none mt-2 text-white">LogOut<FaLongArrowAltRight /> </button>
                                  


                                </div>
                            }
                        </div> : <Link to={'/login'}><button className="btn bg-[#0ecdb9] border-none text-white">LogIn <FaLongArrowAltRight /> </button></Link>
                    }


             



                   

                    


                </div>
                
            </div>

            
        </div>
    );
};

export default Navbar;