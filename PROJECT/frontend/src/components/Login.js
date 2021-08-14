import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/actions/authActions';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { Button, Container, Navbar, Form } from 'react-bootstrap';
import { LinkContainer, Row, Column } from "react-router-bootstrap";



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
            <Navbar bg="dark" variant="dark">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>University Of Newcastle - Program Advisory Tool</Navbar.Brand>
                    </LinkContainer>
                </Container>
            </Navbar>


            <Container>
                <Form onSubmit={submitHandler}>
                    <h1 className="bigHeader">University of Newcastle's Program Advisory Tool Login</h1>

                    <h2 className="subHeader">Welcome back! Login to your {loginType} account!</h2>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.currentTarget.value)} required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.currentTarget.value)} required/>
                    </Form.Group>

                    <p>You're {loginType === "admin" ? "a user?" : "an admin?"}

                    <LinkContainer to={"/login?type=" + (loginType === "admin" ? "user" : "admin")}>
                            <Button variant="link">SIGN IN HERE</Button>
                        </LinkContainer>

                    </p>

                    {error && <p>{error}</p>}

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

export default Login;
