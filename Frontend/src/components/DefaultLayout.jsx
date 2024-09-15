import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";


export default function DefaultLayout() {



  const {user, token,setUser ,setToken} = useStateContext();

  const Logout = (e) => {
    e.preventDefault();
  
    axiosClient.post("/logout")
      .then(() => {
        console.log("good")
        setUser({});
        setToken(null); // Clear the token only after the request is successful
      })
      .catch((err) => {
        console.error("Logout failed", err);
      });
  };
  


  useEffect(()=>{
    axiosClient.get('/user').then(({data})=>{
     setUser(data)
    })
},[])


if (!token) {
  return <Navigate to="/login" />;
}

 

  return (
    <div className="flex h-screen">
    {/* Sidebar */}
    <div className="flex flex-col bg-purple-900 w-60 px-4 py-10">
      <Link className="text-white hover:bg-purple-950 py-3 px-3 rounded-xl" to="/dashboard">
        Dashboard
      </Link>
      <Link className="text-white hover:bg-purple-950 py-3 px-3 rounded-xl" to="/users">
        Users
      </Link>
    </div>
  
    {/* Main Content */}
    <div className="flex flex-col w-full">
      {/* Header */}
      <div className="flex justify-between bg-gray-100 p-5 ">
        <span>Header</span>
        <div className="flex gap-5">
          <span>  {user.name}</span>
          <a onClick={Logout} href="#">Logout</a>
        </div>
        
      </div>
  
      {/* Main Body (content section) */}
      <div className="flex-1 p-5 bg-gray-50">
        {/* Your content goes here */}
       < Outlet/>
      </div>
    </div>
  </div>
  
  );
}
