import { useContext, useState } from "react";
import useVerified from "../hook/useVerified";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form"
import axios from "axios";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxios from "../hook/useAxios";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { useNavigate } from "react-router-dom";
import { ImSpinner9 } from "react-icons/im";

const ContestAdd = () => {
    const [isVerified] = useVerified();
    const [startDate, setStartDate] = useState(new Date());

    const { user}=useContext(AuthContext)
    const axiosSecure=useAxios()
    const navigate=useNavigate()

    const [loading,setLoading]=useState(false)


    
    const {
        register,
        handleSubmit,
        
        formState: { errors },
    } = useForm()

    const onSubmit = async(data,e) => {
        console.log(data)
        const image=e.target.image.files[0]
        if (!image) {
            return Swal.fire("please choose a picture");
        }
        
       
        const formData = new FormData()
        formData.append('image', image)
        try{
            setLoading(true)
            const imageResponse = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_APT_KEY}`, formData)
            const imageUrl = imageResponse.data.data.display_url

            
          


            const contestInfo={
                contestName: data?.contestName,
                contestType: data?.contestType,
                description: data?.description,
                price: data?.price,
                prize: data?.prize,
                task: data?.task,
                image:imageUrl,
                hostName: user?.displayName,
                hostEmail:user?.email,
                participated:0,
                status:'pending',
                comments:'improved It',
                dates:startDate,
                hostImage: user?.photoURL






            }
            await axiosSecure.post('/host/contest',contestInfo)
            .then(data=>{
                if(data.data){
                    Swal.fire("added and wait for admin approve!");
                    
                    navigate('/dashboard/myContest')
                    setLoading(false)

                }
                e.target.reset()
            })



        }
        catch(error){
            console.log(error)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
        setLoading(false)
    }

    return (
        <div>
            <h2 className="font-bold text-4xl text-center">---Add Contest---</h2>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6 border rounded-xl p-5">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Contest Name*</span>
                        </label>
                        <input {...register("contestName", { required: true })} type="text" placeholder="Contest Name" className="input input-bordered"  />
                        {errors.contestName && <span className="text-red-600">This field is required</span>}
                       
                    </div>
                    
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image*</span>
                        </label>
                        <input  type="file" name="image" className="file-input file-input-bordered w-full" />
                    </div>
                    
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Contest Description*</span>
                        </label>
                        <textarea {...register("description", { required: true })} className="textarea textarea-bordered" placeholder="Contest Description"></textarea>
                        {errors.description && <span className="text-red-600">This field is required</span>}
                    </div>
                    
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Task*</span>
                        </label>
                        <textarea {...register("task", { required: true })} className="textarea textarea-bordered" placeholder="Task"></textarea>
                        {errors.task && <span className="text-red-600">This field is required</span>}
                    </div>
                    
                   
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Prize money*</span>
                        </label>
                        <input {...register("prize", { required: true })} type="text" placeholder="Prize money" className="input input-bordered" />
                        {errors.prize && <span className="text-red-600">This field is required</span>}
                    </div>
                    
                    
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Contest Price*</span>
                        </label>
                        <input type="number" {...register("price", { required: true })}  placeholder="Contest Price" className="input input-bordered" required />
                        {errors.price && <span className="text-red-600">This field is required</span>}
                    </div>
                    
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Contest Type/Tags*</span>
                        </label>
                        <select {...register("contestType", { required: true })} className="select select-bordered w-full">
                            <option disabled selected>
                                Contest Type/Tags
                            </option>
                            <option>Image Design Contests</option>
                            <option>Article Writing</option>
                            <option>Marketing Strategy</option>
                            <option>Digital Advertisement</option>
                            <option>Gaming Review</option>
                            <option>Book Review</option>
                            <option>Business Idea</option>
                            <option>Movie Review</option>
                        </select>
                        {errors.contestType && <span className="text-red-600">This field is required</span>}
                    </div>
                    
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Deadline*</span>
                        </label>
                        <DatePicker
                            className="input input-bordered w-full"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                        />
                    </div>
                    {isVerified === "block" ? (
                        <button className="btn w-full mt-2 md:col-span-2" disabled>
                            You are Blocked
                        </button>
                    ) : (
                        <button className="btn bg-[#0ecdb9] border-none w-full mt-2 text-white md:col-span-2">
                                {loading ? <ImSpinner9 className='animate-spin mx-auto'></ImSpinner9> : 'Add now'}
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ContestAdd;
