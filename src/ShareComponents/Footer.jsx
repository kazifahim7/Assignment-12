import { FaFacebook, FaGoogle, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";


const Footer = () => {
    
    return (
        <footer className={`footer p-10 bg-[#1f2340]  text-white `}>
            <aside>
                <div className="flex justify-center items-center gap-2">
                    <img src="https://i.ibb.co/7RVpQM8/community-06.png" alt="" className="w-12" />
                    <p className="text-[#0ecdb9] font-bold text-2xl">ContestHub</p>
                </div>
                <p>Contest Platform Industries Ltd.<br />Providing reliable tech since 1992</p>
                <aside>
                    <div className="flex justify-start space-x-5 py-3 text-3xl ">
                        <Link ><FaGoogle></FaGoogle></Link>
                        <Link ><FaFacebook></FaFacebook></Link>
                        <Link ><FaTwitter></FaTwitter></Link>
                        <Link ><FaLinkedin /></Link>
                    </div>


                    <p>Copyright © 2024 - All right reserved by Contest Platform || ContestHub Ltd</p>
                </aside>
            </aside>
            <nav>
                <h6 className="footer-title">Services</h6>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </nav>
            <nav>
                <h6 className="footer-title">Company</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
                <h6 className="footer-title">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>

        </footer>
    );
};

export default Footer;