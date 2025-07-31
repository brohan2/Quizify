import React from "react";
import {useNavigate} from "react-router-dom"

const LandingPage = ()=>{
    function handleSubmit(){
        console.log("Submitting")
    }
    return (
        <>
        <h1 id="header">This is a landing page</h1>
        <form action={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email"/>
        <input type="submit" />
        </form>
        </>
    )
}
export default LandingPage