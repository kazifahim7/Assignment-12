import { useQuery } from "@tanstack/react-query";
import usePublicAxios from "../hook/usePublicAxios";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import useMyparticipateData from "../hook/useMyparticipateData";
import useWinerData from "../hook/useWinerData";
import { Cell, Legend, PieChart, Pie } from 'recharts';
import axios from "axios";

const MyProfile = () => {
    const axiosPublic = usePublicAxios();
    const { user, setLoading } = useContext(AuthContext);
    const [formError, setFormError] = useState('');

    const [mydata] = useMyparticipateData();
    const [data] = useWinerData();

    
    const totalParticipated = mydata.length;
    const totalWon = data.length;
    const totalLost = totalParticipated - totalWon;

    
    const pieData = [
        { name: 'Won', value: totalWon },
        { name: 'Lost', value: totalLost }
    ];

    const COLORS = ['#00C49F', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

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

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 justify-center items-center">
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
                    <PieChart width={300} height={400}>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={140}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend className="text-2xl" />
                    </PieChart>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
