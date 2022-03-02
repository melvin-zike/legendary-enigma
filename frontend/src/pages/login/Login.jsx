import React, { useState, useContext } from 'react'
import { login } from '../../context/authContext/apiCalls';
import { AuthContext } from '../../context/authContext/AuthContext';

import "./login.scss";
import {Link} from "react-router-dom";

export default function Login() {
    const [email, setEmail ] = useState("");
    const [erromsg, setErrorMsg ] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [password, setPassword ] = useState("");
    const {isFetching, error, dispatch} = useContext(AuthContext);
    const [focused1, setHandleFocused1] = useState(false);
    const [focused2, setHandleFocused2] = useState(false);

    
    const handleLogin = (e) => {
        e.preventDefault();
        login({email, password}, dispatch);
            
    }

    const handleFocus1 = (e) => {
        e.preventDefault()
        setHandleFocused1(true);
      }

    const handleFocus2 = (e) => {
        e.preventDefault()
        setHandleFocused2(true);
      }


    return (
        <div className="login">
            
            <form className="loginForm">
                {
                    error == true ? 
                    <p className='dangerous-login'>Wrong username or passord</p> : ""
                }
                
                {/* <p className='success-login'>{successMsg}</p> */}
            <h3 className="msg-info-2">Sign In To your account</h3>
                <input type="text" 
                placeholder="email" 
                className="loginInputs" 
                id="emailInput"
                pattern ="^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"
                onChange={(e) => setEmail(e.target.value)}
                required
                onBlur={handleFocus1}
                focused1={focused1.toString()}
                />
                <p className="errorMessage1">It should be a valid email</p>
                <input type="text" 
                placeholder="password" 
                className="loginInputs"
                id="passwordInput" 
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                 pattern = '^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,16}$'
                 required
                 onBlur={handleFocus2}
                 focused2={focused2.toString()}
                />
                <p className="errorMessage2">Password should be 8-16 characters include atleast 1 letter, 1 number and 1 special character</p>
                <button 
                className="loginButton" 
                onClick={handleLogin} 
                disabled={isFetching}
                >
                    Login
                </button>
            <Link to="/forgot-passord" className="loginForgotlink">
            <span className="loginForgot">Forgot Password?</span>
            </Link>

                <Link to="/register" className="loginForgotlink">
            <span className="loginForgot">Already have an account? Sign In</span>
            </Link>
            </form>
          
            
        </div>
    )
}
