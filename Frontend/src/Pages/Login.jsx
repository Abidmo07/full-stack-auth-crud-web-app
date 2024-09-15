import { useRef } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";

export default function Login() {
  const emailRef = useRef();
  const passRef = useRef();

  const { setUser, setToken } = useStateContext();
  const onsubmit=(e)=>{
   e.preventDefault();
   const payload = {
  
    email: emailRef.current.value,
    password: passRef.current.value,
 
  };
  console.log(payload);
  axiosClient
    .post("/login", payload)
    .then(({ data }) => {
      setUser(data.user);
      setToken(data.token);
    })
    .catch((error) => {
      const response = error.response;
      if (response && response.status == 422) {
        console.log(response.data.errors);
      }
    });
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
      <h2 className="text-2xl font-bold text-center mb-6 text-purple-900">Login to your account</h2>
      
      <form onSubmit={onsubmit} className="space-y-6">
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
          ref={emailRef}
            type="email"
            id="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            placeholder="you@example.com"
            required
          />
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
          ref={passRef}
            type="password"
            id="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            placeholder="••••••••"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-purple-900 text-white py-2 px-4 rounded-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            
          >
            Sign In
          </button>
        </div>
      </form>

      {/* Additional Links */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
           have an account? <a href="/register" className="text-purple-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  </div>
  )
}
