import React from 'react'
import './Register.css'
import { useRef } from 'react'
import axios from "axios"
import {useNavigate} from 'react-router'

export default function Register() {
    const username= useRef();
    const email= useRef();
    const password= useRef();
    const passwordAgain= useRef();
    //to direct the user to the login page after registering:
    const navigate= useNavigate();

    const handleClick= async (e)=>{
        e.preventDefault(); 
        if(passwordAgain.current.value !== password.current.value){
            passwordAgain.current.setCustomValidity("Passwords do not match!")
        }else{
            const user={
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            };
            try{
                await axios.post("auth/register", user);
                navigate("/login");
            }catch(err){
                console.log(err);
            }
        }    
    }
    const handleLogin = ()=>{
        navigate("/login")
    }
  return (
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className='loginLogo'>Gracias</h3>
                <span className="loginDesc">
                    Connect with like-minded and varied people and share the vibes!
                </span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input placeholder='UserName' required ref={username} className='loginInput'/>
                    <input placeholder='Email' type='email' required ref={email} className='loginInput'/>
                    <input placeholder='Password' type='password' required minLength="8" ref={password} className='loginInput' />
                    <input placeholder='Password Again' type='password' required minLength="8" ref={passwordAgain} className='loginInput' />
                    <button className='registerButton' type='submit'>Sign Up</button>
                    <span className="registercreateNew" onClick={handleLogin}>Log In to Your Account</span>
                </form>
            </div>
        </div>
    </div>
  )
}
