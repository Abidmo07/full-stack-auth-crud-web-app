import {Routes,Route} from "react-router-dom"
import SignUp from "./Pages/SignUp"
import Login from "./Pages/Login"
import Users from "./Pages/Users"
import DefaultLayout from "./components/DefaultLayout"
import GuestLayout from "./components/GuestLayout"
import Dashboard from "./Pages/Dashboard"

export default function Routing() {
  return (
 <>
 <Routes>
    <Route path="/" element={<DefaultLayout/>}>
    <Route path="/users" element={<Users/>} /> 
    <Route path="/dashboard" element={<Dashboard/>} /> 
    </Route> 

    <Route path="/" element={<GuestLayout/>} >
    <Route path="/register" element={<SignUp/>} />
    <Route path="/login" element={<Login/>} />
    </Route>

    
    
    <Route path="*" element={<h1>404 Not Found</h1>} />
 </Routes>
 </>
  )
}
