import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/actions/authActions';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';


let config = { 
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
    }
}

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const location = useLocation();
    const dispatch = useDispatch();

    let loginType = location.search.replace("?type=", "");

    if(!loginType || !["admin", "user"].includes(loginType))
        loginType = "user"

    const submitHandler = async (e) => {
        e.preventDefault();
        setError("");
        try{
            const body = JSON.stringify({email, password})
            let res = await axios.post('/api/login/' + loginType, body, config);
            dispatch(login(res.data))
        }catch(err){
            let { status } = err.response;
            if(status === 400)
                return setError("Wrong credentials!")

            setError("Oops, try again!")
        }
    }

    return (
        <div >
            <div>
                <Link to="/">
                    <h1>Dashboard</h1>
                </Link>
            </div>

            <form onSubmit={submitHandler} className="form-group">

                <h2>Welcome</h2>

                <p>Welcome back! Login to your {loginType} account!</p>

                <div>
                    <div>
                        <input type="email" placeholder="Email Address" 
                        value={email} onChange={(e) => setEmail(e.currentTarget.value)}  required />
                    </div>
                </div>

                <div>
                    <div>
                        <input type="password" placeholder="Password" required minLength={6}
                        onChange={(e) => setPassword(e.currentTarget.value)}  />
                    </div>
                </div>

                <p>You're {loginType === "admin" ? "a user" : "an admin"}?

                    <Link to={"/login?type=" + (loginType === "admin" ? "user" : "admin")}>
                        <span>Sign In from here!</span>
                    </Link>

                </p>

                {error && <p>{error}</p>}
                <button >Login</button>

                
                <p>Don’t Have an account?
                    <Link to="/register">
                        <span>Sign Up Now!</span>
                    </Link>
                </p>

            </form>
        </div>
    )
}

export default Login;
