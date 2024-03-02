import React from "react";
import { Link } from "react-router-dom";
import 'primeicons/primeicons.css';

export default function AccountLoginButton(){
    const handleAccountLogin =()=>{
        console.log("signin");
    }

    return(
        <Link to="/account" className="no-underline"> 
            <span className="pi pi-user"style={{ fontSize: '1.5rem'}} onClick={handleAccountLogin} ></span>
        </Link>
        );
}