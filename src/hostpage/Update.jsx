import { useLoaderData, useNavigate } from "react-router-dom";
import useVerified from "../hook/useVerified";

import useAxios from "../hook/useAxios";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { ImSpinner9 } from "react-icons/im";


const Update = () => {
    const singleData=useLoaderData()
    const [isVerified] = useVerified();
    const [startDate, setStartDate] = useState(singleData?.dates);

   
    const axiosSecure = useAxios()
    const navigate=useNavigate()

    const { loading,setLoading }=useContext(AuthContext)
    



  

    const onSubmit = async (e) => {
        e.preventDefault()
        const contestName = e.target.contestName.value;
        const image = e.target.photo.files[0];
        const description = e.target.description.value;
        const task = e.target.task.value;
        const prize = e.target.prize.value;
        const price = e.target.price.value;
        const contestType =e.target.category.value;
        const dates=startDate;
        setLoading(true);

        let imageUrl = singleData?.image

        if (image) {
            console.log("Uploading new image:", image);

            const formData = new FormData();
            formData.append('image', image);



            try {
                const imageResponse = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_APT_KEY}`,
                    formData,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );

                imageUrl = imageResponse.data.data.display_url;
            } catch (imageUploadError) {
                console.error('Error uploading image:', imageUploadError);
                
                return;
            }
        }

        const info={
            contestName,
            image:imageUrl,
            description,
            task,
            prize,
            price,
            contestType,
            dates,
        }
        console.log(info)

        axiosSecure.put(`/updateSingleData/${singleData?._id}`,info)
        .then(data=>{
            if(data.data){
                setLoading(false)
                Swal.fire("Updated");
                navigate('/dashboard/myContest')


            }
        })
        .catch(()=>{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                
            });

        })

       


        

    }

    return (
        <div>
            <h2 className="font-bold text-4xl mb-2 text-center">---Update Contest---</h2>
            <div>
                <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 border rounded-xl p-5">
                    
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Contest Name*</span>
                        </label>
                        <input defaultValue={singleData?.contestName} name="contestName" type="text" placeholder="Contest Name" className="input input-bordered" />

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">image*</span>
                        </label>
                        
                        <input type="file" name="photo" className="file-input file-input-bordered file-input-accent w-full" />

                    </div>
                   

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Contest Description*</span>
                        </label>
                        <textarea defaultValue={singleData?.description} name="description" className="textarea textarea-bordered" placeholder="Contest Description"></textarea>
                    </div>
                    
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Task*</span>
                        </label>
                        <textarea defaultValue={singleData?.task} name="task"  className="textarea textarea-bordered" placeholder="Task"></textarea>
                    </div>
                

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Prize money*</span>
                        </label>
                        <input defaultValue={singleData?.prize} name="prize" type="text" placeholder="Prize money" className="input input-bordered" />
                    </div>
                    

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Contest Price*</span>
                        </label>
                        <input defaultValue={singleData?.price} type="number" name="price" placeholder="Contest Price" className="input input-bordered" required />
                    </div>
                    
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Contest Type/Tags*</span>
                        </label>
                        <select name="category" className="select select-bordered w-full">
                            <option disabled selected>
                            {singleData?.contestType} 
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
                                {loading ? <ImSpinner9 className='animate-spin mx-auto'></ImSpinner9> : 'Save'}
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Update;