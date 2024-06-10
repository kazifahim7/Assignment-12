import { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { ImSpinner9 } from "react-icons/im";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { updateProfile } from "firebase/auth";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import usePublicAxios from "../hook/usePublicAxios";



const Register = () => {
    const { createUser, googleLog, loading, setLoading } = useContext(AuthContext)
    const [display, setDisplay] = useState(false);

    const [set, setNow] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()

    const axiosPublic=usePublicAxios()

    useEffect(() => {
        loadCaptchaEnginge(6, '#0ecdb9')

    }, [])

    const handleVerify = e => {
        let user_captcha_value = e.target.value;
        console.log(user_captcha_value)
        if (validateCaptcha(user_captcha_value, false) == true) {
            console.log('Captcha Matched');
            setNow(true)
        }

        else {
            console.log('Captcha Does Not Match');
            setNow(false)
        }


    }

    const handleSUbmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const image = e.target.image.files[0]
        const password = e.target.password.value;
        const formData = new FormData()
        formData.append('image', image)

        if (!name) {
            return toast.error('please Enter a name')
        }
        else if (!email) {
            return toast.error('please Enter a EMail')
        }
        else if (!password) {
            return toast.error('please Enter a password')
        }
        else if (!set) {
            return toast.error('invalid captcha')
        }






        else if (password.length < 6) {
            return toast.error('Length must be at least 6 character')
        }
        else if (!/^(?=.*[A-Z])/.test(password)) {
            return toast.error('Must have an Uppercase letter in the password')
        }

        try {

            setLoading(true)
            const imageResponse = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_APT_KEY}`, formData)
            const imageUrl = imageResponse.data.data.display_url
            console.log(name, email, password, imageUrl)


            createUser(email, password)
                .then(data => {
                    const currentUser = data.user;
                    console.log(currentUser)

                    updateProfile(currentUser, {
                        displayName: name, photoURL: imageUrl
                    })
                        .then(() => {
                            const userInfo={
                                name,
                                image: imageUrl,
                                status:'verified',
                                role: 'user',
                                email
                            }

                            axiosPublic.post('/users', userInfo)
                                .then(data => console.log(data.data))






                            Swal.fire({
                                title: "registration success",
                                text: "You clicked the button!",
                                icon: "success"
                            });
                            navigate(location?.state ? location.state : '/')
                            e.target.reset()

                        })




                })




        } catch (error) {
            toast.error('invalid info')
            setLoading(false)
        }







    }
    const handleGogleLogIn=()=>{
        googleLog()
            .then(data => {
                const currentUser = data.user;
                const userInfo = {
                    name: data.user?.displayName, 
                    image: data.user?.photoURL,
                    status: 'verified',
                    role: 'user',
                    email: data.user?.email,
                }

                axiosPublic.post('/users', userInfo)
                    .then(data => console.log(data.data))



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
        <div className="hero min-h-screen " style={{ backgroundImage: 'url(https://i.ibb.co/fkShmqr/login-reg-bg.png)', }}>
            <div className="hero-overlay bg-opacity-20"></div>
            <div className="hero-content">
                <div className="">

                    <div className="pt-20">
                        <div className='flex justify-center items-center min-h-screen'>
                            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-[#090539] text-white'>
                                <div className='mb-8 text-center'>
                                    <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
                                </div>
                                <form
                                    onSubmit={handleSUbmit}
                                    noValidate=''
                                    action=''
                                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                                >
                                    <div className='space-y-4'>
                                        <div>
                                            <label htmlFor='name' className='block mb-2 text-sm'>
                                                Name
                                            </label>
                                            <input
                                                type='text'
                                                name='name'
                                                id='name'
                                                placeholder='Enter Your Name Here'
                                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                                                data-temp-mail-org='0'
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor='image' className='block mb-2 text-sm'>
                                                Select Image:
                                            </label>
                                            <input
                                                required
                                                type='file'
                                                id='image'
                                                name='image'
                                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                                                accept='image/*'
                                            />
                                        </div>
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
                                        <div>
                                            <label className='block mb-2 text-sm bg-[#090539]'>
                                                <LoadCanvasTemplate />
                                            </label>
                                            <input
                                                type='text'


                                                onBlur={handleVerify}
                                                required
                                                placeholder='Enter the captcha code'
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
                                        <Toaster position="bottom-left"
                                            reverseOrder={false}></Toaster>
                                    </div>
                                </form>
                                <div className='flex items-center pt-4 space-x-1'>
                                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                                    <p className='px-3 text-sm dark:text-gray-400'>
                                        Signup with social accounts
                                    </p>
                                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                                </div>
                                <div onClick={handleGogleLogIn} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
                                    <FcGoogle size={32} />

                                    <p>Continue with Google</p>
                                </div>
                                <p className='px-6 text-sm text-center text-gray-400'>
                                    Already have an account?{' '}
                                    <Link
                                        to='/login'
                                        className='hover:underline hover:text-rose-500 text-[#0ecdb9]'
                                    >
                                        Login
                                    </Link>
                                    .
                                </p>
                            </div>
                        </div>

                    </div>





                </div>

            </div>
        </div>
    );
};

export default Register;