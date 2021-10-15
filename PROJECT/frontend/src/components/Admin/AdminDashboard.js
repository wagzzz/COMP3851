import React from 'react';
import {useDispatch} from 'react-redux';
import {logout} from '../../store/actions/authActions';
import {useSelector} from 'react-redux';
import {Button, Container, Navbar, Row, Col} from 'react-bootstrap';
import {LinkContainer} from "react-router-bootstrap";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import CourseList from "./Course/CourseList";
import DegreeList from "./Degree/DegreeList";

const AdminDashboard = () => {
    const dispatch = useDispatch();

    const signout = () => {
        dispatch(logout())
    }

    const {user} = useSelector((state) => state.auth);

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
                <h1 className="bigHeader"> Admin Dashboard </h1>
                <Row className="my-4">
                    <Col lg={6} md={12}>
                        <CourseList />
                    </Col>
                    <Col lg={6} md={12}>
                        <DegreeList />
                    </Col>
                </Row>

            </Container>
        </div>

    )
}

export default AdminDashboard;
