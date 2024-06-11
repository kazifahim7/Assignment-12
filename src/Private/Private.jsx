import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const Private = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    const location=useLocation()

    

    if(loading){
        return <div className="flex justify-center items-center pt-72"><span className="loading loading-spinner loading-lg"></span></div>
    }
    else if(user){
        return children
    }
    return <Navigate to={'/login'} state={location?.pathname} replace></Navigate>
  
};

export default Private;