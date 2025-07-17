import React, {useState, useEffect} from "react";
import '../../style/Login/login.css'
import { X } from 'lucide-react';  
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { SiApple } from "react-icons/si";
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { loginRequest } from '../../redux/slices/authSlice';
import LoginLoading from '../../components/Layout/LoadingLogin'

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const authState = useSelector(state => state.auth);

    useEffect(() => {
        if (authState.isLoggedIn) {
            navigate('/');
        }
    }, [authState.isLoggedIn, navigate]);

    if(authState.isLoading) {
        return <LoginLoading />
    }

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginRequest({ email, password }));
    };

    const handleX = (e) => {
        e.preventDefault();
        navigate('/');
    }

    return (
        <div className="w-full h-screen flex ">
            <div className="w-1/2 h-full">
                <img src="/img/login1.jpg" alt="" className="w-full h-full object-cover"/>
            </div>
            <div className="w-1/2 bg-by-theme h-full text-by-theme p-10">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-x-2 cursor-pointer">
                        <img src="/header/sound1.png" alt="Music Wave" className="h-14 w-14"/>
                        <div className="flex-col justify-center">
                            <h1 className="text-2xl">VibeNest</h1>
                            <p className="sub-title mt-[-8px] ml-8">by shutterSock</p>
                        </div>
                    </div>
                    <div className="cursor-pointer">
                        <X className="" onClick={handleX}/>
                    </div>
                </div>
                
                <h2 className="text-center mt-20 text-3xl font-1 mb-18">Login or create your account</h2>

                <div className="w-8/10 m-auto flex flex-col gap-y-5">
                    {authState.error ? (
                        <p className="text-red-500 text-sm">*{authState.error}</p>
                    ) : (
                        <p></p>
                    )}
                    <div className="">
                        <label htmlFor="email" className="block text-gray-700 mb-2 font-medium text-xs">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-yellow-500 px-1 py-2 placeholder-gray-500"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="">
                        <label htmlFor="email" className="block text-gray-700 mb-2 font-medium text-xs">
                            Password
                        </label>
                        <input
                            id="name"
                            type="password"
                            className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-yellow-500 px-1 py-2 placeholder-gray-500"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="mt-5 bg-red-900 login-button" onClick={handleLogin}>Get started</button>
                    <button className="login-button"> <FcGoogle size={20}/> Continue with Google</button>
                    <button className="login-button"> <FaFacebook size={20}/> Continue with Facebook</button>
                    <button className="login-button"> <SiApple size={20}/> Continue with Apple</button>
                </div>
            </div>
        </div>
    )
}