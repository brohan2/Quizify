import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import ProtectedRoutes from './utils/ProtectedRoutes'
import Result from './pages/Result'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";



function App() {
  const [email, setemail] = useState("")

  return (
    <>
     <Router>
        <Routes>
            <Route path='/' element={<LandingPage setemail={setemail}/>}/>
            <Route path='/dashboard' element= {   
            <ProtectedRoutes email={email}>
              <Dashboard email={email} />
            </ProtectedRoutes>
            }/>
            <Route path="/result" element={<Result />} />
        </Routes>
    </Router>
    </>
  )
}

export default App
