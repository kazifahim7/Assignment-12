import { useRouteError } from "react-router-dom";

const Error = () => {
    const error = useRouteError();
    console.error(error);
    return (
        <div>
            <div id="error-page" className="flex flex-col justify-center items-center">
                <img src="https://i.ibb.co/k4GGwJ2/20945761.jpg" alt="" className="w-60 h-60" />
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
            </div>

        </div>
    );
};

export default Error;