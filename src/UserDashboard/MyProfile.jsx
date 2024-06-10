import { useQuery } from "@tanstack/react-query";
import usePublicAxios from "../hook/usePublicAxios";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

const MyProfile = () => {
    const axiosPublic = usePublicAxios();
    const { user, setLoading } = useContext(AuthContext);
    const [formError, setFormError] = useState('');

    const { data: Mydata = {}, refetch } = useQuery({
        queryKey: ['information', user?.email],
        queryFn: async () => {
            const info = await axiosPublic.get(`/user/myProfile/${user?.email}`);
            return info.data;
        },
        enabled: !!user?.email 
    });
    console.log('Imgbb API Key:', import.meta.env.VITE_IMGBB_APT_KEY)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(''); // Clear previous error

        try {
            const name = e.target.name.value;
            const location = e.target.location.value;
            const image = e.target.photo.files[0];

            setLoading(true);

            let imageUrl = Mydata?.image 

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
                    setFormError('Failed to upload image. Please try again later.');
                    return; 
                }
            }

            const updateInfo = {
                name,
                location,
                image: imageUrl
            };

            console.log("Profile data to update:", updateInfo);

            try {
                const response = await axiosPublic.patch(`/update/profile/${user?.email}`, updateInfo);
                refetch();
                console.log('Profile update response:', response);
                Swal.fire({
                    title: "Profile Updated",
                    text: "Your profile has been successfully updated!",
                    icon: "success"
                });
                e.target.reset()
               
                document.getElementById('my_modal_3').close();
            } catch (profileUpdateError) {
                console.error('Error updating profile:', profileUpdateError);
                setFormError('Profile update failed. Please check your input and try again.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setFormError('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="hero rounded-lg" style={{ backgroundImage: 'url(https://egamlio.vercel.app/images/dashboard-banner-bg.png)' }}>
                <h1 className="text-4xl font-extrabold text-[#0ecdb9] p-8 ">Hi, Welcome Back</h1>
            </div>

            <div className="mt-5">
                <div>
                    <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 bg-gray-900 dark:bg-[#212472] text-white dark:text-gray-800">
                        <img src={Mydata.image || 'https://via.placeholder.com/150'} alt="Profile" className="w-32 h-32 mx-auto rounded-full bg-gray-500 dark:bg-gray-500 aspect-square" />
                        <div className="space-y-4 text-center divide-y divide-gray-700 dark:divide-gray-300">
                            <div className="my-2 space-y-1">
                                <h2 className="text-xl font-semibold sm:text-2xl text-white capitalize">{Mydata.name || 'Your Name'}</h2>
                                <p className="px-5 text-xs sm:text-base text-white">{Mydata.email || 'your.email@example.com'}</p>
                                {Mydata.location && <p className="text-white">Location: {Mydata.location}</p>}
                            </div>
                            <div className="flex justify-center pt-2 space-x-4 align-center">
                                <button onClick={() => document.getElementById('my_modal_3').showModal()} className="text-black btn">Update Now</button>
                            </div>
                            <dialog id="my_modal_3" className="modal">
                                <div className="modal-box">
                                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                                        <button type="button" className="btn btn-sm btn-circle btn-ghost absolute " onClick={() => document.getElementById('my_modal_3').close()}>✕</button>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Image*</span>
                                            </label>
                                            <input type="file" name="photo" className="file-input file-input-bordered file-input-accent w-full" />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Name*</span>
                                            </label>
                                            <input type="text" name="name" defaultValue={Mydata?.name || ''} required className="input input-bordered input-accent w-full" />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Location*</span>
                                            </label>
                                            <input type="text" name="location" placeholder="Enter your location" defaultValue={Mydata?.location || ''} required className="input input-bordered input-accent w-full" />
                                        </div>

                                        <button type="submit" className="btn btn-accent w-full mt-3">Save</button>
                                    </form>
                                    {formError && <p className="text-red-500 mt-2">{formError}</p>}
                                </div>
                            </dialog>
                        </div>
                    </div>
                </div>

                <div>
                    

                </div>
            </div>
        </div>
    );
};

export default MyProfile;
