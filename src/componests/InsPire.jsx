import { FaLongArrowAltRight } from "react-icons/fa";

const InsPire = () => {
    return (
        <div className="">
            <div className="hero min-h-screen bg-[#1f2340] bg-top  text-white" style={{ backgroundImage: 'url(https://i.ibb.co/rGRXRwr/features-bg.png)' }}>
                <div className="hero-overlay "></div>
                <div className="hero-content  text-neutral-content grid grid-cols-1 md:grid-cols-2 justify-center items-center">
                    <div className="max-w-md">
                        <h4 className="uppercase text-xl text-[#0ecdb9] ">BECOME A SUCCESSFUL Person</h4>
                        <h1 className="mb-5 text-5xl font-bold uppercase">GET THE contest <br /> YOU WANT</h1>
                        <p className="mb-5">Discover a new way to develop your talents with ContestHub by participating in our diverse contest offerings.ContestHub is a platform designed for individuals seeking to enhance their skills by participating in various contests.</p>
                        <button className="btn btn-accent">LogIn Now <FaLongArrowAltRight></FaLongArrowAltRight></button>
                    </div>

                    <div className="md:flex gap-3">
                        <div>
                            <div className="bg-[#1b1d4d] p-8 rounded-xl" >
                                <img src="https://egamlio.vercel.app/images/icon/feature-icon-1.png" alt="" />
                                <h2 className="text-center">Community</h2>

                            </div>
                            <div className="bg-[#1b1d4d] p-8 mt-3 rounded-xl" >
                                <img src="https://egamlio.vercel.app/images/icon/feature-icon-2.png" alt="" />
                                <h2 className="text-center">Responsive</h2>

                            </div>

                        </div>

                        <div className="md:mt-5">
                            <div className="bg-[#1b1d4d] p-8 mt-3 rounded-xl" >
                                <img src="https://egamlio.vercel.app/images/icon/feature-icon-3.png" alt="" />
                                <h2 className="text-center">Winner</h2>

                            </div>
                            <div className="bg-[#1b1d4d] p-8 mt-3 rounded-xl" >
                                <img src="https://egamlio.vercel.app/images/icon/feature-icon-4.png" alt="" />
                                <h2 className="text-center">Endurance</h2>

                            </div>

                        </div>
                    </div>



                </div>
            </div>

            
        </div>
    );
};

export default InsPire;