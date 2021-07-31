import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

let config = { 
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
    }
}

const Register = () => {

    const initState = {
        firstName: '',
        email: "",
        lastName: "",
        password: ""
    };

    const [data, setData] = useState(initState);
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (event) => {
        event.persist()
        setData(prevData => ({ ...prevData, [event.target.name]: event.target.value }))
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        setError("")
        setSuccess("")
        try{
            const body = JSON.stringify(data)
            await axios.post('/api/register/' + (checked ? "admin" : "user"), body, config)

            setSuccess("You have successfully registered!")
        }catch(err){
            let { status } = err.response;
            if(status === 400)
                return setError("Email already registered!")

            setError("Oops, try again!")
        }
    }

    return (
        <div>

            <div className="logo">
                <Link to="/">
                    <h1>Dashboard</h1>
                </Link>
            </div>

            <form onSubmit={submitHandler}>
                <h2>Register!</h2>
                <p>Create a new account!</p>

                <div>
                    <div>
                        <input type="text" name="firstName" value={data.firstName} 
                        onChange={handleChange} placeholder="First name" minLength={4} required/>
                    </div>
                </div>

                <div>
                    <div>
                        <input type="text" name="lastName" value={data.lastName} 
                        onChange={handleChange} placeholder="Last name" minLength={4} required/>
                    </div>
                </div>

                <div>
                    <div>
                        <input type="email" placeholder="Email Address" name="email" value={data.email} 
                        onChange={handleChange} required/>
                    </div>
                </div>

                <div>
                    <div>
                        <input type="password" placeholder="Password" name="password" value={data.password} 
                        onChange={handleChange} required minLength={6}/>
                    </div>
                </div>

                <div>
                    <label htmlFor="accept">
                        <p>
                            <input type="checkbox" name="accept" id="accept"
                            checked={checked} onChange={()=>setChecked(!checked)} />
                            {" "}
                            <span>This user is an admin</span>
                        </p>
                    </label>
                </div>

                {error && <p> {error} </p>}

                {success && <p>{success}</p>}

                <button>Register</button>

                <p>Already have an account? Login as
                    <Link to="/login?type=admin">
                        <span>Admin</span>
                    </Link>
                    Or
                    <Link to="/login?type=user">
                        <span>User</span>
                    </Link>
                </p>

            </form>
        </div>
    )
}

export default Register;
