import { Link } from "react-router-dom";


const Promote = () => {
    return (
        <div className="">
            <div className="hero min-h-screen bg-[#1f2340] text-white">
                <div className="hero-content  flex flex-col  md:flex-row-reverse">
                    <div className="w-full pt-4">
                        <h1 className="text-5xl font-bold uppercase text-left ">AN ULTIMATE <br /> Contest <br /> PLATFORM</h1>
                        <p className="py-6 text-left">ContestHub is a platform for person who want to improve their  skills by join the different contest.At ContestHub, individuals can improve their talents by joining and competing in a wide range of contests.ContestHub is the go-to destination for anyone looking to sharpen their skills through different competitive challenges.ContestHub provides a platform where users can elevate their skills by engaging in a variety of contests.</p>
                        <Link to={'/allContest'}><button className="btn btn-accent">Join The Contest</button></Link>
                        
                    </div>
                    <div className="w-full pt-14">
                        <img src="	https://egamlio.vercel.app/images/about-us-img.png" alt="" className="w-[70%]" />
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Promote;