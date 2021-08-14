import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Navbar, Row, Col } from 'react-bootstrap';
import { LinkContainer} from "react-router-bootstrap";


const Home = () => {

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
                <h1 className="bigHeader">University of Newcastle's Program Advisory Tool Homepage</h1>

                <h2 className="subHeaderHome">Use the following options below to login or register:</h2>

                <Row>
                    <Col className="register">
                        <LinkContainer to="/login?type=admin">
                            <Button size="lg">Login as admin</Button>
                        </LinkContainer>
                    </Col>
                    <Col className="register">
                        <LinkContainer to="/login?type=user">
                            <Button size="lg">Login as user</Button>
                        </LinkContainer>
                    </Col>
                    <Col className="register">
                        <LinkContainer to="/register">
                            <Button size="lg">Register</Button>
                        </LinkContainer>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home