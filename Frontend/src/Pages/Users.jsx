
import {useEffect, useState} from "react"
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
export default function Users() {

  const[users,setUsers]=useState([]);
  const [loading,setLoading]=useState(false);
  
 

  useEffect(()=>{
     getUsers();
  },[])

  const getUsers=()=>{
   setLoading(true);
    axiosClient.get('/users').then(({data})=>{
      setLoading(false);
      console.log(data.data);
      
      setUsers(data.data);
     
      
    }).catch(()=>{
     setLoading(true);
    })
  }
  const deleteUser=(id)=>{
    if(!window.confirm("Are you sure you want to delete this user ?")){
      return
    }
    axiosClient.delete(`/users/${id}`).then(()=>{
      getUsers();
    }).catch(()=>{
      
    })
  }



  return( 
     <div className="space-y-5">
      <div className="flex items-center justify-between">
         <h1 className="text-4xl font-semibold">Users Page</h1>
    <Link className="p-3 text-white bg-green-600 rounded-xl" to="/users/new">Add new </Link>
      </div>
       
      <div className="">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="text-sm leading-normal text-gray-600 uppercase bg-gray-200">
            <th className="px-6 py-3 text-left">ID</th>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-left">Create Date</th>
            <th className="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>
        {loading &&
     <tbody >
          <tr>
            <td colSpan={5} className="text-center">Loading ...</td>
          </tr>

          
        </tbody>
          
        }

        { !loading &&   
            <tbody className="text-sm font-light text-gray-600">
        {users.map((u) => {
    return (
      <tr key={u.id} className="border-b border-gray-200 hover:bg-gray-100">
        <td className="px-6 py-3 text-left">{u.id}</td>
        <td className="px-6 py-3 text-left">{u.name}</td>
        <td className="px-6 py-3 text-left">{u.email}</td>
        <td className="px-6 py-3 text-left">{u.created_at}</td>
        <td className="px-6 py-3 text-center">
          <div className="flex items-center justify-center">
            <Link to={'/users/' + u.id} className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
              Update
            </Link>
            <button onClick={() => deleteUser(u.id)}  className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700">
              Delete
            </button>
          </div>
        </td>
      </tr>
    );
  })}
     
    
        </tbody>
        }
   
      
        </table>
      </div>
   

  </div>);
  

}
