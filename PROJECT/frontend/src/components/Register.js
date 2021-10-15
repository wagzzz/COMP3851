import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Container, Navbar, Row, Col, Form } from 'react-bootstrap';
import { LinkContainer} from "react-router-bootstrap";
import { config } from "../constants";

const Register = () => {

    const initState = {
        firstName: "",
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

            <Navbar bg="dark" variant="dark">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>University Of Newcastle - Program Advisory Tool</Navbar.Brand>
                    </LinkContainer>
                </Container>
            </Navbar>


            <Container>
                <h1 className="bigHeader">University of Newcastle's Program Advisory Tool Registry Page</h1>

                <h2 className="subHeaderHome">Input your details to register an account:</h2>

                <Form onSubmit={submitHandler}>

                    <Form.Group className="mb-3" controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="firstName" placeholder="First name" value={data.firstName} onChange={handleChange}  required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="lastName" placeholder="Last name" value={data.lastName} onChange={handleChange}  required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Email Address" name="email" value={data.email} onChange={handleChange} required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={data.password} onChange={handleChange} required minLength={6} />
                    </Form.Group>

                    {error && <p> {error} </p>}

                    {success && <p>{success}</p>}

                    <Button variant="primary" type="submit">
                        Register
                    </Button>

                    <p>Already have an account? Login as
                    <LinkContainer to="/login?type=admin">
                            <Button variant="link">Admin</Button>
                        </LinkContainer>
                    or
                    <LinkContainer to="/login?type=user">
                            <Button variant="link">User</Button>
                        </LinkContainer>
                    </p>
                </Form>

            </Container>
        </div>
    )
}

export default Register;
