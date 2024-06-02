
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const SLiderINfo = () => {
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
                <SwiperSlide>
                    <div className="card bg-[#15151580] text-white shadow-xl">
                        <figure className="px-10 pt-10">
                            <img src="https://i.ibb.co/K73MKLw/345051683-1629340190860797-7773547712940764978-n-1.jpg" alt="Shoes" className="rounded-full w-40" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title capitalize">Kazi fahim</h2>
                            <p>Contest name : CodeMaster Challenge</p>
                            <p>This thrilling competition invites programmers from around the world to <br /> solve intricate problems, optimize algorithms, and demonstrate their technical prowess. </p>
                        </div>
                    </div>

                </SwiperSlide>
                <SwiperSlide>
                    <div className="card bg-[#15151580] text-white shadow-xl">
                        <figure className="px-10 pt-10">
                            <img src="https://i.ibb.co/K73MKLw/345051683-1629340190860797-7773547712940764978-n-1.jpg" alt="Shoes" className="rounded-full w-40" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title capitalize">Kazi fahim</h2>
                            <p>Contest name : CodeMaster Challenge</p>
                            <p>This thrilling competition invites programmers from around the world to <br /> solve intricate problems, optimize algorithms, and demonstrate their technical prowess. </p>
                        </div>
                    </div>

                </SwiperSlide>
                
                

            </Swiper>
       </div>


    );
};

export default SLiderINfo;