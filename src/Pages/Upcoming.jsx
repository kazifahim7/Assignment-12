import { useQuery } from "@tanstack/react-query";
import usePublicAxios from "../hook/usePublicAxios";


const Upcoming = () => {
    const axiospublic=usePublicAxios()

    const {data=[],isLoading}=useQuery({
        queryKey:['upcoming'],
        queryFn:async()=>{
            const result = await axiospublic.get('/upcoming')
            return result.data
        }
    })
    if(isLoading){
        return <div className="flex justify-center items-center pt-72"><span className="loading loading-spinner loading-lg"></span></div>
    }



    return (
        <div>
            <h1 className="text-4xl font-extrabold text-center pt-24 capitalize">Upcoming contest</h1>

            <div className="container mx-auto mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">


                {
                    data.map(item => <div key={item._id} className="card w-96 bg-base-100 shadow-xl">
                        <figure><img src={item?.image} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                {item?.contestName}
                                <div className="badge badge-secondary">Upcoming</div>
                            </h2>
                            <p>{item?.description}</p>
                        </div>
                    </div>)
                }
                

            </div>
            
        </div>
    );
};

export default Upcoming;