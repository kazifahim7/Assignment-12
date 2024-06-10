import { useQuery } from "@tanstack/react-query";
import useAxios from "../hook/useAxios";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Countdown from 'react-countdown';
import { useNavigate } from "react-router-dom";

const MyParticipate = () => {
    const axiosSecure = useAxios();
    const [over, setOver] = useState(false);
    const { user } = useContext(AuthContext);
    const [sortOrder, setSortOrder] = useState('asc');
    const navigate = useNavigate();
    console.log(sortOrder)

    const { data: myParticipateData = [] , isLoading} = useQuery({
        queryKey: ['myData', user?.email, sortOrder],
        queryFn: async () => {
            const myDatas = await axiosSecure.get(`/myParticipateData/${user?.email}?sort=${sortOrder}`);
            return myDatas.data;
        }
    });

    if(isLoading){
        return <div className="flex justify-center items-center pt-72"><span className="loading loading-spinner loading-lg"></span></div>
    }

    // Component to render when the countdown completes
    const Completionist = () => {
        setOver(true);
        return <span>not available</span>;
    };

    // Custom renderer function for Countdown component
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <Completionist />;
        } else {
            return <span>{days}d {hours}h {minutes}m {seconds}s</span>;
        }
    };

    const handleRegister = (id) => {
        const singleData = myParticipateData.find(item => item._id === id);
        console.log(singleData?.ContestDate)
        

        if (singleData) {
            let info = {
                
                contestName: singleData?.contestName,
                contestType: singleData?.contestType,
               
                price: singleData?.price,
                prize: singleData?.prize,
                task: singleData?.task,
                image: singleData?.image,
                hostName: singleData?.hostName,
                hostEmail: singleData?.hostEmail,
                participated: singleData?.participated,
                status: singleData?.status,
                
                date: singleData?.date,
                hostImage: singleData?.hostImage,
                userName: user?.displayName,
                userEmail: user?.email,
                userPhoto: user?.photoURL,
                ContestId: singleData?.ContestId,
                dates: singleData?.ContestDate,
                
            };
            console.log(info)

            axiosSecure.post('/register/contest', info)
                .then((response) => {
                    if (response.data) {
                        console.log('Register done');
                        navigate('/register');
                    }
                })
                .catch(error => console.error('Registration error:', error));
        }
    };

    return (
        <div>
            <h1 className="text-center text-4xl font-bold">My Participated Contest</h1>
            <div>
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1">Sort</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li onClick={()=>setSortOrder('upcoming')}><a>upcoming</a></li>
                        <li onClick={()=>setSortOrder('asc')}><a>Past</a></li>
                        
                    </ul>
                </div>
            </div>
            <div className="overflow-x-auto mt-10">
                <table className="table table-zebra">
                    <thead className="bg-red-200">
                        <tr>
                            <th>Contest Name</th>
                            <th>Submission Date</th>
                            <th>Contest Date</th>
                            <th>tranSectionId</th>
                            <th>Register Again</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myParticipateData.map(data => {
                            const contestDate = new Date(data.ContestDate);
                            const isValidDate = !isNaN(contestDate.getTime());

                            if (isValidDate) {
                                return (
                                    <tr key={data._id}>
                                        <td>{data.contestName}</td>
                                        <td>{new Date(data.date).toLocaleDateString()}</td>
                                        <td>
                                            <Countdown
                                                date={contestDate}
                                                renderer={renderer}
                                            />
                                        </td>
                                        <td>{data?.tranSectionId}</td>
                                        <td>
                                            <button onClick={() => handleRegister(data._id)} className="btn bg-[#0ecdb9]">Register Again</button>
                                        </td>
                                    </tr>
                                );
                            } else {
                                return (
                                    <tr key={data._id}>
                                        <td>{data.contestName}</td>
                                        <td>{new Date(data.date).toLocaleDateString()}</td>
                                        <td>Invalid Date</td>
                                        <td>{data?.tranSectionId}</td>
                                        <td>
                                            {over && 'time over'}
                                        </td>
                                    </tr>
                                );
                            }
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParticipate;
