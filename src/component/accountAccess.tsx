import React from "react";
import 'primeicons/primeicons.css';

export default function AccountAccess(){
const handleAccountAccess =()=>{
    console.log("signin");
}

return(
    <span className="pi pi-user"style={{ fontSize: '1.5rem'}} onClick={handleAccountAccess} ></span>
    );
}