import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const UserPrivate = ({children}) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()


    if (loading) {
        return <div className="flex justify-center items-center pt-72"><span className="loading loading-spinner loading-lg"></span></div>

    }
    else if (user) {
        return children
    }

    else {
        return <Navigate state={location.pathname} to={'/logIn'} replace="true"></Navigate>
    }

};

export default UserPrivate;