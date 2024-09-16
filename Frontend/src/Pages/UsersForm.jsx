import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";

export default function UsersForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient.get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setUser(data); // Adjust if necessary
                })
                .catch((error) => {
                    setLoading(false);
                    console.error('Error fetching user:', error);
                });
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(user.id){
            axiosClient.put(`/users/${user.id}`,user).then(()=>{
                console.log("updated seccesfully")
                navigate('/users')
            }). catch((error) => {
                console.error('Error adding user:', error);
            });
        }
        else{
               axiosClient.post('/users', user)
                .then(() => {
                    navigate("/users");
                })
                .catch((error) => {
                    console.error('Error adding user:', error);
                });
        }
        
         
        
    };

    return (
        <div>
            <div>
                {user.id ? (
                    <h1 className="py-5 text-3xl font-semibold">Update User: {user.name}</h1>
                ) : (
                    <h1 className="py-5 text-3xl font-semibold">Add New User</h1>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="name" className="block mb-2 font-semibold text-gray-700">Name</label>
                        <input
                            type="text"
                            
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 font-semibold text-gray-700">Password</label>
                        <input
                            type="password"
                           
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block mb-2 font-semibold text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                           
                            value={user.password_confirmation}
                            onChange={(e) => setUser({ ...user, password_confirmation: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {user.id ? 'Save Changes' : 'Add User'}
                    </button>
                </form>
            </div>
        </div>
    );
}
