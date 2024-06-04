import { useContext, useRef } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const textRef=useRef()
    const navigate=useNavigate()
       
    const { setInputData}=useContext(AuthContext)
    const handleClick=()=>{
        const value=textRef.current.value;
        setInputData(value)

        textRef.current.value=''

        navigate('/allContest')
       
        
    }



    return (
        <div>
            <div className="hero  " style={{ backgroundImage: 'url(https://i.ibb.co/0Fz5h7H/index-overlay.png)', height: '650px' }}>
                <div className="hero-overlay bg-opacity-20"></div>
                <div className="hero-content grid grid-cols-1 md:grid-cols-2 gap-5 mt-20 md:mt-12">
                    <div className="space-y-2 md:ml-16">
                        <h1 className="text-2xl md:text-6xl font-bold text-white">IMPROVE <br /> YOUR TALENT</h1>
                        <p className="mb-5 text-white">Get better and unlock your potential in the contest you love most.</p>

                        <div className="relative">
                            <input type="text" ref={textRef} placeholder="Contest Name" className="input input-bordered w-full  h-14" />
                            
                            <button onClick={handleClick} className="btn bg-[#0ecdb9] border-none text-white absolute right-1 w-18 mt-1 ">search</button>
                            
                        </div>


                    </div>
                    <div>
                        <img src="https://egamlio.vercel.app/images/banner-illus.png" className="" alt="" />
                    </div>
                </div>
            </div>

            <div className="">
                <div className="flex justify-center -mt-3  md:-mt-12   ">
                    <div className="stats shadow z-10 bg-[#1b1d4d]">

                        <div className="stat">
                            <div className="stat-figure text-white">
                                <img src="https://egamlio.vercel.app/images/icon/counter-icon-1.png" alt="" className="w-1/2" />
                            </div>
                            <div className="stat-title text-[#0ecdb9]">Total Contest</div>
                            <div className="stat-value text-white">25.6K</div>

                        </div>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <img src="	https://egamlio.vercel.app/images/icon/counter-icon-2.png" className="w-1/2" />
                            </div>
                            <div className="stat-title text-[#0ecdb9]">Users</div>
                            <div className="stat-value text-white">2.6M</div>

                        </div>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <div className="avatar">
                                    <div className="w-16 rounded-full">
                                        <img src="	https://egamlio.vercel.app/images/icon/counter-icon-3.png" className="w-1/2" />
                                    </div>
                                </div>
                            </div>
                            <div className=" text-[#0ecdb9]">Champions</div>
                            <div className="stat-value text-white">150</div>
                        </div>

                    </div>

                </div>
          </div>



        </div>
    );
};

export default Banner;