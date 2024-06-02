import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link, useRouteError } from "react-router-dom";

const Error = () => {
    const error = useRouteError();
    console.error(error);
    return (
        <div>
            <div id="error-page" className="flex flex-col justify-center items-center">
                <img src="https://egamlio.vercel.app/images/error-image.png" alt="" className="w-60 h-60" />
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
                <Link to={'/'}><button className="btn bg-[#0ecdb9] border-none text-white"><FaLongArrowAltLeft />  go home </button></Link>
            </div>

        </div>
    );
};

export default Error;