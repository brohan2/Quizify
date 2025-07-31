import React,{useState} from "react";
import {useNavigate} from "react-router-dom"

const LandingPage = ({setemail})=>{
    const [inputEmail,setInputEmail] = useState("")
    const navigate = useNavigate()
    function handleSubmit(e){
        e.preventDefault()
        if(inputEmail.trim()){
            setemail(inputEmail)
            
            navigate('/dashboard')
        }
        console.log(e)
        console.log("Submitting")
    }
    return (
        <>
        <h1 id="header">This is a landing page</h1>
        <form action="">
        <input type="email" name="email" placeholder="Email" value={inputEmail} onChange={(e)=>setInputEmail(e.target.value)}/>
        <button type="submit" onClick={(e)=>handleSubmit(e)}> Click to start Quiz</button>
        {console.log(inputEmail)}
        </form>
        </>
    )
}
export default LandingPage