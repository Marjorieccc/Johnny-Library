import React from "react";
import 'primeicons/primeicons.css';

export default function ReserveCheck(){

    const handleReserveCheck =()=>{
        console.log("check reserve");
    }

    return(
        <span className="pi pi-book" style={{ fontSize: '1.5rem'}} onClick={handleReserveCheck} ></span>
    );
}
