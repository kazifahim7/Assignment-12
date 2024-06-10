import { useContext, useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { ImSpinner9 } from "react-icons/im";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'


const LogInPage = () => {
    const [display, setDisplay] = useState(false);

    const { logIn, googleLog, loading, setLoading } = useContext(AuthContext)

    const navigate = useNavigate()
    const location = useLocation()


    const handleLogIn = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        logIn(email, password)
            .then(() => {
                Swal.fire({
                    title: "LogIn success",
                    text: "You clicked the button!",
                    icon: "success"
                });
                navigate(location?.state ? location.state : '/')
                e.target.reset()

            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",

                });
                setLoading(false)
                console.log(error)

            })




    }

    const googleLogin = () => {
        googleLog()
            .then(data => {
                const currentUser = data.user;
                console.log('i am from google', currentUser)
                Swal.fire({
                    title: "Google logIn success",
                    text: "You clicked the button!",
                    icon: "success"
                });
                navigate(location?.state ? location.state : '/')
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
        <div>
            <div className="hero min-h-screen " style={{ backgroundImage: 'url(https://i.ibb.co/fkShmqr/login-reg-bg.png)' }}>
                <div className="hero-overlay bg-opacity-20"></div>
                <div className="hero-content">
                    <div className='flex justify-center items-center mt-7 min-h-screen'>
                        <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-[#090539] text-white'>
                            <div className='mb-8 text-center'>
                                <h1 className='my-3 text-4xl font-bold'>Log In</h1>
                                <p className='text-sm text-gray-400'>
                                    Sign in to access your account
                                </p>
                            </div>
                            <form
                                onSubmit={handleLogIn}
                                noValidate=''
                                action=''
                                className='space-y-6 ng-untouched ng-pristine ng-valid'
                            >
                                <div className='space-y-4'>
                                    <div>
                                        <label htmlFor='email' className='block mb-2 text-sm'>
                                            Email address
                                        </label>
                                        <input


                                            type='email'
                                            name='email'
                                            id='email'
                                            required
                                            placeholder='Enter Your Email Here'
                                            className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                                            data-temp-mail-org='0'
                                        />
                                    </div>
                                    <div className='mt-4'>
                                        <div className='flex justify-between'>
                                            <label
                                                className='block mb-2 text-sm font-medium text-gray-600 '
                                                htmlFor='loggingPassword'
                                            >
                                                Password
                                            </label>
                                        </div>

                                        <div className="flex relative items-center">
                                            <input
                                                id='loggingPassword'
                                                placeholder="Enter a password"
                                                autoComplete='current-password'
                                                name='password'
                                                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                                                type={display ? 'text' : 'password'}
                                                required
                                            />
                                            <p onClick={() => setDisplay(!display)} className="absolute left-[90%] text-xl text-black">{display ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type='submit'
                                        className='bg-[#0ecdb9] w-full rounded-md py-3 text-white'
                                    >
                                        {loading ? <ImSpinner9 className='animate-spin mx-auto'></ImSpinner9> : 'Continue'}
                                    </button>

                                </div>
                            </form>
                            <div className='flex items-center pt-4 space-x-1'>
                                <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                                <p className='px-3 text-sm dark:text-gray-400'>
                                    Login with social accounts
                                </p>
                                <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                            </div>
                            <div

                                onClick={googleLogin}


                                className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
                                <FcGoogle size={32} />

                                <p>Continue with Google</p>
                            </div>
                            <p className='px-6 text-sm text-center text-gray-400'>
                                Don&apos;t have an account yet?{' '}
                                <Link
                                    to='/signup'
                                    className='hover:underline hover:text-rose-500 text-[#0ecdb9]'
                                >
                                    Sign up
                                </Link>
                                .
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LogInPage;