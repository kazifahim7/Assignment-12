import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useRole from "../hook/useRole";
import { Navigate, useLocation } from "react-router-dom";
import useVerified from "../hook/useVerified";


const AdMinPrivate = ({children}) => {
    const { user,loading } = useContext(AuthContext)
    const [isPosition, isLoading] = useRole()
    const location = useLocation()

    const { isLoading : load}=useVerified()

    let token=localStorage.getItem(['access-token'])


    if (loading || isLoading || load || !user) {
        return <div className="flex justify-center items-center pt-72"><span className="loading loading-spinner loading-lg"></span></div>

    }
    else if (token && isPosition ==='admin') {
        return children
    }

    else {
        return <Navigate state={location.pathname} to={'/login'} replace='true'></Navigate>
    }
};

export default AdMinPrivate;