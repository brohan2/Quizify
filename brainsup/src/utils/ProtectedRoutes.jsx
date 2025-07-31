import React from "react";
import {Navigate} from "react-router-dom"

function ProtectedRoutes({email,children}){
    if(!email){
       return <Navigate to="/" replace/>
    }
    return children
}

export default ProtectedRoutes