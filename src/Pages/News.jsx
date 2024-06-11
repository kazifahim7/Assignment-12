import { Link } from "react-router-dom";


const News = () => {
    return (
        <div className="hero min-h-screen bg-[#1f2340] text-white">
            <div className="hero-content ">
                <div className="max-w-md pt-40">
                    <h1 className="text-3xl font-bold">RECENT NEWS</h1>
                    <p className="py-6">Subscribe to the <Link className="text-teal-300" to={'https://www.linkedin.com/in/kazi-fahim/'}>linkedin Contests channel</Link> for the latest updates and information about ongoing competitions.</p>
                    <h1 className="text-3xl font-bold">ABOUT THIS PLATFORM</h1>
                    <p className="py-6">Everybody is welcome to try out works submitted by the contestants and create issues (with supporting videos and screenshots) if they encounter any problems.</p>
                    <p className="py-6">Contestants can respond to issues. They appear on the platform under animal aliases to ensure fairness and transparency in testing. Admins will be around to do their own checks on the apps and tally up the results.</p>
                    <p className="py-6">If you&apos;re looking for information about contests that are currently open, check the <Link className="text-teal-300" to={'https://www.linkedin.com/in/kazi-fahim/'}>linkedin Contests channel</Link>..</p>
                    
                </div>
            </div>
        </div>
    );
};

export default News;