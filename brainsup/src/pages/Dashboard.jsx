import React,{useEffect,useState} from "react";
import question from "../utils/api";


const Dashboard = ({email})=>{
    const [questions,setQuestions] = useState([])
    const [isloading,setloading]= useState(true)

    useEffect(()=>{
        async function getData(){
            const data = await question();
            setQuestions(data)
            console.log(data)
            setloading(false)
        }
        getData()
    },[])

    if(isloading) return <p>Loadings</p>

    return(
        <>
        <h2>Welcome {email}</h2>
        <p>{questions[0].question}</p>
        </>
    )
}
export default Dashboard