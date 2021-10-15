import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/authActions';
import { useSelector } from 'react-redux';
import { Button, Container, Navbar, Row, Col } from 'react-bootstrap';
import { LinkContainer} from "react-router-bootstrap";
import DegreePlanList from "./DegreePlan/DegreePlanList";
import DegreePlanCreate from "./DegreePlan/DegreePlanCreate";
import axios from "axios";
import {config} from "../../constants";
import {onToast} from "../../utils/toastUtil";


const UserDashboard = () => {
    const dispatch = useDispatch();

    const signout = () => {
        dispatch(logout())
    }

    const { user } = useSelector((state) => state.auth);

    const [degreePlans, setDegreePlans] = useState([])

    useEffect(() => {
        // here goes the data fetching
        const fetchDegreePlanList = async () => {
            try {
                let res = await axios.get('/user/degreePlans/' + user.userId, config)
                setDegreePlans(await res.data)
            } catch (err) {
                onToast('Server Error!', 'error');
            }

        }
        fetchDegreePlanList()
    }, [])

    const onAddDegreePlan = (degreePlan) => {
        const _degreePlans = degreePlans.slice()
        _degreePlans.push(degreePlan)
        setDegreePlans(_degreePlans)
    }

    const onDeleteDegreePlan = (degreePlan) => {
        let _degreePlans = []
        degreePlans.forEach((dp) => {
            if(dp.id !== degreePlan.id) _degreePlans.push(dp)
        })
        setDegreePlans(_degreePlans)
    }

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
                <h1 className="bigHeader"> User Dashboard </h1>
                <Row className="my-5">
                    <Col lg={6} md={12}>
                        <DegreePlanCreate
                            user={user}
                            onAddDegreePlan={onAddDegreePlan}
                        />
                    </Col>
                    <Col lg={6} md={12}>
                        <DegreePlanList
                            degreePlans={degreePlans}
                            user={user}
                            onDeleteDegreePlan={onDeleteDegreePlan}
                        />
                    </Col>
                </Row>
            </Container>

        </div>

    )
}

export default UserDashboard;
