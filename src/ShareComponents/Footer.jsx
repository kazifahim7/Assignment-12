import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";


const Footer = () => {
    
    return (
        <footer className={`footer p-10 bg-[#1f2340]  text-white `}>
            <aside>
                <img src="https://egamlio.vercel.app/images/logo.png" alt="" />
                <p>Contest Platform Industries Ltd.<br />Providing reliable tech since 1992</p>
                <aside>
                    <div className="flex justify-start space-x-7 py-5 text-3xl ">
                        <FaGoogle></FaGoogle>
                        <FaFacebook></FaFacebook>
                        <FaTwitter></FaTwitter>
                    </div>


                    <p>Copyright © 2024 - All right reserved by Contest Platform || Egamilo Ltd</p>
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