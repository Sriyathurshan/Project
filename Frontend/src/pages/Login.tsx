import React from 'react'
import { Link } from 'react-router-dom';
import login from "../assets/login.webp"

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("user logged :",{email,password})
        // Handle login logic here
    }; 
  return (
    <div className="flex">
        <div className="w-full md:w-1/2 h-screen flex items-center justify-center p-8 md:p-12">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-sm w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6">Hey there! </h2>
                <p className='text-center mb-6'> Enter your username and password to Login</p>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 font-bold text-black text-left">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        required
                        placeholder="enter your email address"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-black mb-2 font-bold text-left">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        required
                        placeholder="enter your password"
                    />
                </div>
                <button type="submit" className="w-full bg-black text-white py-3 rounded hover:bg-gray-700 transition duration-300">Login</button>
                <p className='mt-6 text-center text-sm '>Don't have an account ? <Link to="/register" className= "text-blue-500"> Register</Link> </p>
            </form>
        </div>
         <div className="w-1/2 bg-gray-200 items-center justify-center hidden md:block">
            <div className='h-full flex flex-col justify-center items-center'>
                <img src={login} alt='Login to account' />
            </div>
        </div>
    </div>
  )
}

export default Login