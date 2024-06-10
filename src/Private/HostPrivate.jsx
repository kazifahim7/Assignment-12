import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useRole from "../hook/useRole";
import { Navigate, useLocation } from "react-router-dom";

const HostPrivate = ({children}) => {
    const { user,loading } = useContext(AuthContext)
    const [isPosition, isLoading] = useRole()
    const location = useLocation()
   


    if (loading || isLoading || !user) {
        return <div className="flex justify-center items-center pt-72"><span className="loading loading-spinner loading-lg"></span></div>

    }
   

    else if (user && isPosition === 'host') {
        return children
    }

    
        return <Navigate state={location.pathname} to={'/login'} replace='true'></Navigate>

   

   
};

export default HostPrivate;