import React from 'react'
import './styles.css';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../../firbase'
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import {signOut} from 'firebase/auth';
import {toast} from 'react-toastify';


const Header = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() =>{
        if(user){
        navigate("/dashboard");
        }
    }, [user, loading])

    function logoutFnc(){
        try {
            signOut(auth).then(() =>{
                toast.success("Logged out Successfully!");
                navigate("/");
            })
         .catch ((error) => {
          toast.error(error.message);
        });
    }catch(e){
        toast.error(e.message);
    }
}
  return (
    <div className="navbar">
        <p className="logo">Financely.</p>
        <p className="logo link" onClick={logoutFnc} >Logout</p>
    </div>
  )
}

export default Header;