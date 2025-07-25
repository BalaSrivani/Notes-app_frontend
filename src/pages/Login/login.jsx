import React, { useState } from 'react'
import Navbar from '../../components/navbar'
import { Link, useNavigate } from 'react-router-dom'
import Passwordinput from '../../components/input/Passwordinput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosinstance'

const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState(null);
    const navigate=useNavigate();
    const handleLogin=async(e)=>{
        e.preventDefault()
        if(!validateEmail(email)){
            setError("please enter valid email address");
            return;
        }
        if(!password){
            setError("Please enter the password");
            return;
        }
        setError("")

        try{
            const response=await axiosInstance.post("/login",{
                email,
                password
            });
            if(response.status === 200 && response.data.accessToken){
                localStorage.setItem("token",response.data.accessToken);
                navigate('/dashboard')
            }
        
        }
        catch(error){
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message);
            }
            else{
                setError("An unexpected error occurred. Please try again later.");
            }
        }
    }
    return (
        <>
        <Navbar/>
        <div className='flex items-center justify-center mt-28'>
                <div className='py-10 bg-white border rounded w-96 px-7'>
                    <form onSubmit={handleLogin}>
                        <h4 className="text-2xl mb-7">Login</h4>

                        <input 
                            type="text" 
                            placeholder='Email' 
                            className='input-box'
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}/>

                        <Passwordinput 
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}/>
                        {error && <p className='pb-1 text-xs text-red-500'>{error}</p>}

                        <button type='submit' className='btn-primary'>
                            Login
                        </button>

                        <p className='mt-4 text-sm text-center'>
                            Not registered yet?{" "}
                            <Link to='/signup' className='font-medium underline text-primary'>
                                Create an account
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>

    )
}

export default Login
