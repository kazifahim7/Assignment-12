import { Link } from "react-router-dom";
import useAllContest from "../hook/useAllContest";



const AllContest = () => {
    
    const [allData]=useAllContest()

    


    


    return (
        <div>
            <div className="hero " style={{ backgroundImage: 'url(https://egamlio.vercel.app/images/banner-coaching-bg.png)' }}>
                <div className="hero-overlay bg-opacity-10"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md mt-32">
                        <h1 className="mb-5 text-5xl font-bold">All Contest</h1>
                        <p className="mb-5">Competition occurs in nature, between living organisms which co-exist in the same environment. Animals compete over water supplies, food, mates, and other biological resources. Humans usually compete for food and mates, though when these needs are met deep rivalries often arise over the pursuit of wealth, power, prestige, and fame when in a static, repetitive, or unchanging environment.</p>
                        
                    </div>
                </div>
            </div>



            <div className="bg-[#1f2340] text-white p-10 grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-2">
                {
                    allData.length < 1 && <h1 className="text-5xl text-red-700 text-center">No data.... </h1>
                }


                {

                    allData.filter(item => item.status==='accepted').map(data => <div key={data._id} className="card  h-full bg-[#1f2340] shadow-xl ">
                        <figure><img src={data?.image} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                {data?.contestName}

                            </h2>
                            <p><span className="text-[#0ecdb9] font-bold">Description </span>: {data?.description.slice(0,60)}....</p>
                            <p> <span className="text-[#0ecdb9] font-bold">Participated </span>: {data?.participated}</p>
                            <div className="card-actions justify-end">
                                <Link to={`/allContests/${data?._id}`}><div className="badge badge-outline">Details</div></Link>
                            </div>
                        </div>
                    </div>)
                }




                


              

                

            </div>

           
        </div>
    );
};

export default AllContest;