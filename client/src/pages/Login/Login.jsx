import React, { useContext, useRef} from 'react'
import './Login.css'
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import {Link} from 'react-router-dom'

export default function Login() {
    const email= useRef(); //useRef is used to prevent the input texts from rendering as much
    const password= useRef();

    //to get the dispatch for the loginCall we get the value from the AuthContext.js
    const { isFetching, dispatch} = useContext(AuthContext)

    const handleClick=(e)=>{
        e.preventDefault(); //so that on clicking login button, the page wont just refresh
        // console.log(email.current.value);
        loginCall({email: email.current.value, password: password.current.value}, dispatch);
    };


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
                    <input placeholder='Email' type='email' required className='loginInput' ref={email}/>
                    <input placeholder='Password' type='password' required minLength="8" className='loginInput' ref={password}/>
                    <button className='loginButton' type='submit' disabled={isFetching}>{isFetching ? <CircularProgress/> : "Log In"}</button>
                    <span className="loginForgot">Forgot Password?</span>
                    <Link to={"/register"} style={{marginLeft: "12%", marginRight: "12%"}}>
                    <button className="createNew">Create New Account</button>
                    </Link>
                    
                </form>
            </div>
        </div>
    </div>
  )
}
