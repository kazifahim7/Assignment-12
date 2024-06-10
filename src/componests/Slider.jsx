
import SLiderINfo from "./SLiderINfo";



const Slider = () => {
 



    return (
        <div className="  bg-bottom" style={{ backgroundImage: 'url(https://i.ibb.co/xjyQqLf/how-works-bg.png)' }}>

            <h2 className="text-4xl text-center uppercase text-[#0ecdb9] py-4 font-bold">best contest creator</h2>
            <p className="text-center text-white">Best Contest Creator is designed for those who want to create <br /> impactful contests quickly and efficiently.  With advanced features  and intuitive controls, <br />

             you can focus on making your contest memorable and enjoyable for all participants.</p>
           <div className="rounded-xl">
                <SLiderINfo></SLiderINfo>
           </div>
        </div>
    );
};

export default Slider;