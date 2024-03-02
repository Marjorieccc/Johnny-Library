import React from "react";
import { Link } from "react-router-dom";
import 'primeicons/primeicons.css';

export default function ReserveCheckButton(){

    const handleReserveCheck =()=>{
        console.log("check reserve");
    }

    return(
        <Link to="/account" className="no-underline"> 
            <span className="pi pi-book" style={{ fontSize: '1.5rem'}} onClick={handleReserveCheck} ></span>    
        </Link>
    );
}
