
const Banner = () => {
    return (
        <div className="hero " style={{ backgroundImage: 'url(https://i.ibb.co/0Fz5h7H/index-overlay.png)', height:'600px' }}>
            <div className="hero-overlay bg-opacity-20"></div>
            <div className="hero-content grid grid-cols-1 md:grid-cols-2 gap-5 mt-20 md:mt-12">
                <div className="">
                    <h1 className="text-2xl md:text-6xl font-bold text-white">IMPROVE <br /> YOUR Talent</h1>
                    <p className="mb-5 text-white">Get better and unlock your potential in the games you love most</p>

                    <div className="relative">
                        <input type="text" placeholder="Contest Name" className="input input-bordered w-full max-w-xs h-14" />
                        <button className="btn bg-[#0ecdb9] border-none text-white absolute left-[242px] w-18 mt-1 ">search</button>
                    </div>

                   
                </div>
                <div>
                    <img src="https://egamlio.vercel.app/images/banner-illus.png" className="" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Banner;