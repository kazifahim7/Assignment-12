import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Countdown from 'react-countdown';
import { useContext, useState, useEffect } from "react";
import usePublicAxios from "../hook/usePublicAxios";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Details = () => {
    const singleData = useLoaderData();
    const axiosPublic = usePublicAxios();
    const [over, setOver] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate=useNavigate()

    useEffect(() => {
        // Check if the contest date has passed
        const contestDate = new Date(singleData?.dates);
        if (contestDate < new Date()) {
            setOver(true);
        }
    }, [singleData]);

    
    const Completionist = () => <span>not available</span>;

    
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            setOver(true);
            return <Completionist />;
        } else {
            return <span>{days}d {hours}h {minutes}m {seconds}s</span>;
        }
    };

    const handleRegister = () => {
        const registerInfo = {
            contestName: singleData?.contestName,
            contestType: singleData?.contestType,
            description: singleData?.description,
            price: singleData?.price,
            prize: singleData?.prize,
            task: singleData?.task,
            image: singleData?.image,
            hostName: singleData?.hostName,
            hostEmail: singleData?.hostEmail,
            participated: singleData?.participated,
            status: singleData?.status,
            comments: singleData?.comments,
            dates: singleData?.dates,
            hostImage: singleData?.hostImage,
            userName: user?.displayName,
            userEmail: user?.email,
            userPhoto: user?.photoURL,
            ContestId: singleData?._id,
        };

        axiosPublic.post('/register/contest', registerInfo)
            .then((response) => {
                if (response.data) {
                    console.log('Register done');
                    navigate('/register')
                }
            })
            .catch(error => console.error('Registration error:', error));
    };

    const contestDate = new Date(singleData?.dates);
    const milliseconds = contestDate - new Date(); 

    return (
        <div>
            <div className="hero " style={{ backgroundImage: 'url(https://egamlio.vercel.app/images/index-overlay.png)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md pt-24">
                        <h1 className="mb-5 text-5xl font-bold capitalize">Details the contest</h1>
                    </div>
                </div>
            </div>

            <div>
                <div className="hero min-h-screen bg-[#1f2340] text-white">
                    <div className="hero-content flex-col lg:flex-row justify-center items-center">
                        <img src={singleData.image} className="w-[40%] rounded-lg shadow-2xl" alt="Contest" />
                        <div>
                            <h1 className="text-5xl font-bold">{singleData.contestName}</h1>
                            <p>participation count: {singleData?.participated}</p>
                            <p className="py-6"><span>Description</span>: {singleData?.description}</p>
                            <p className="py-2"><span>Contest Prize</span>: {singleData?.prize} {typeof (singleData.prize)==='number'&& '$'}</p>
                            <p className="py-2"><span>Contest Price</span>: {singleData?.price} $</p>
                            <p className="py-2 space-x-3"><span>Deadline</span>:
                                {milliseconds > 0 ? (
                                    <Countdown
                                        date={Date.now() + milliseconds}
                                        renderer={renderer}
                                    />
                                ) : (
                                    <Completionist />
                                )}
                                . {over ? 'not available' : contestDate.toLocaleDateString()}
                            </p>
                            <p className="py-2"><span>Task</span>: {singleData?.task}</p>

                            {/* Winner Section */}
                            {over && (
                                <div className="flex justify-center flex-col items-center">
                                    <div className="avatar">
                                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={singleData?.participateUserPhoto} alt="Winner" />
                                        </div>
                                    </div>
                                    <h1 className="mt-2">Winner</h1>
                                    <h2 className="mt-2">Name: {singleData?.participateUserName}</h2>
                                </div>
                            )}

                            {/* Registration Button */}
                            <div className="card-actions justify-end">
                                {over ? (
                                    <div className="badge badge-outline p-5 bg-red-500 text-white border-none">not available</div>
                                ) : (
                                    <Link to={'/register'}>
                                        <div onClick={handleRegister} className="badge badge-outline p-5 bg-[#0ecdb9] border-none">Register Now</div>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
