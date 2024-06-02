import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import usePublicAxios from "../hook/usePublicAxios";

export const AuthContext = createContext()
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading, setLoading] = useState(false)
    const axiosPublic=usePublicAxios()
    const provider = new GoogleAuthProvider();
    




    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }


    const logout = () => {
        setLoading(true)
        return signOut(auth)
    }


    const googleLog = () => {
        setLoading(true)

        return signInWithPopup(auth, provider)
    }
    useEffect(() => {
        const unsubsCribed = onAuthStateChanged(auth, (currentUser) => {
            
            setUser(currentUser)
            

            if(currentUser){
                const currenUserEmail = currentUser?.email || user?.email

                const userEmail = { email: currenUserEmail }

                axiosPublic.post('/jwt', userEmail)
                        .then((data) => {
                            if(data.data.token){
                               
                                localStorage.setItem('access-token',data.data?.token)
                                setLoading(false)
                            }

                            
                            
                            
                        
                        })
                        
                


            }
            else{
                localStorage.removeItem('access-token')
                setLoading(false)
            }


            // if (currentUser) {
            //     // 
            //     axiosPublic.post('/jwt', userEmail)
            //         .then(() => setLoading(false))
            //         .catch(error => console.log(error))
            // }
            // else {
            //     // 
            //     setLoading(false)
            // }



            console.log(currentUser)

        })
        return () => unsubsCribed()
    }, [axiosPublic, user])



    const info = {
        user,
        loading,
        createUser,
        logIn,
        logout,
        googleLog,
        setLoading

    }
    return (

        <AuthContext.Provider value={info}>
        {
            children
        }

    </AuthContext.Provider>   
    );
};

export default AuthProvider;
