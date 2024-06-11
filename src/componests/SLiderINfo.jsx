
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import usePublicAxios from '../hook/usePublicAxios';
import { useQuery } from '@tanstack/react-query';

const SLiderINfo = () => {
    const axiosPublic = usePublicAxios()


    const { data: allData = [] } = useQuery({
        queryKey: ['all'],
        queryFn: async () => {
            const result = await axiosPublic.get(`/allData-for/home/page?sort=${'asc'}`)
            return result.data;
        }
    })

    return (
       <div className='container mx-auto w-[80%] p-10 rounded-xl '>
            <Swiper
                spaceBetween={10}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper rounded-xl"
            >

                {allData?.slice(0,4).map(item => <SwiperSlide key={item._id}>
                    <div className="card bg-[#15151580] text-white shadow-xl">
                        <figure className="px-10 pt-10">
                            <img src={item?.hostImage} alt="image" className="rounded-full w-40" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title capitalize">{item?.hostName}</h2>
                            <p>Contest name : {item?.contestName}</p>
                            <p>participated : {item?.participated}</p>
                            <p>{item?.description.slice(0,70)} </p>
                        </div>
                    </div>

                </SwiperSlide>)}



               
                
                
                

            </Swiper>
       </div>


    );
};

export default SLiderINfo;