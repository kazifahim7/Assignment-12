import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../ShareComponents/Navbar";
import Footer from "../ShareComponents/Footer";


const MainLayout = () => {
    const navigation = useNavigation()
    return (
        <div>
           <div className="sticky top-0 z-20">
                <Navbar></Navbar>

           </div>

            
            <div className="min-h-[calc(100vh-258px)]">
                {
                    navigation.state === "submitting"
                        ? <div className="flex justify-center items-center"><span className="loading loading-spinner loading-lg"></span></div> : <Outlet></Outlet>
                }

            </div>
            <Footer></Footer>
            
        </div>
    );
};

export default MainLayout;