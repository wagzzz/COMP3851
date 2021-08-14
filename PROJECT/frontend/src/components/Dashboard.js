import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/authActions';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Container, Navbar, Row, Col } from 'react-bootstrap';
import { LinkContainer} from "react-router-bootstrap";


const Dashboard = () => {
    const dispatch = useDispatch();

    const signout = () => {
        dispatch(logout())
    }

    const { user } = useSelector((state) => state.auth);


    return (
        <div>
            
            <Navbar bg="dark" variant="dark">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand className="pull-left">University Of Newcastle - Program Advisory Tool</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Text>
                        Signed in as: <a>{user.firstName} {user.lastName}</a>
                    </Navbar.Text>
                    <Button onClick={signout}>Logout</Button>
                </Container>
            </Navbar>

            <Container>
                <h1 className="bigHeader"> Dashboard </h1>
                <Row>
                    <Col>
                        <h3>Selecting new Degree Plan</h3>
                    </Col>
                    <Col>
                        <h3>Loading saved Plans</h3>
                    </Col>
                </Row>
            </Container>

            

        </div>
        
        
    )
}

export default Dashboard;
