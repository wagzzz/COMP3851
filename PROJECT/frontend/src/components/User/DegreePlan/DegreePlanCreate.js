import React, {useState, useEffect} from "react"
import {Button, Modal, Form, Col, Row, Card} from 'react-bootstrap'
import axios from "axios"
import {config} from "../../../constants"
import {isNull} from "../../../utils/stringUtil"
import {onToast} from "../../../utils/toastUtil"
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DegreePlanCreate = (props) => {

    const [degreePlan, setDegreePlan] = useState({})
    const [degrees, setDegrees] = useState([])

    useEffect(() => {
        // here goes the data fetching
        const fetchDegreeList = async () => {
            try {
                let res = await axios.get('/user/degrees', config)
                setDegrees(await res.data)
            } catch (err) {

            }

        }
        fetchDegreeList()
    }, [])

    const onInput = ({target: {value, id}}) => {
        if(id === 'degreeId') {
            setDegreePlan({
                ...degreePlan,
                degree: {
                    degreeId: value
                }
            })
        } else {
            setDegreePlan({
                ...degreePlan,
                [id]: value
            })
        }

    }

    const onSubmit = async () => {
        if (isNull(degreePlan)) {
            onToast('Fill all inputs!', 'warn');
            return;
        }
        if (isNull(degreePlan.savedName)) {
            onToast('Fill Name!', 'warn');
            return;
        }
        if (isNull(degreePlan.degree)) {
            onToast('Select degree!', 'warn');
            return;
        }
        if (isNull(degreePlan.startSemester)) {
            onToast('Select start semester!', 'warn');
            return;
        }

        let degree = degrees.filter((degree) => (degree.degreeId == degreePlan.degree.degreeId));
        if(degree.length == 0) {
            onToast('Degree Selection Error!', 'error');
            return;
        }
        degree = degree[0];
        let _degreePlan = {
            degree: degree,
            assignedToUser: true,
            user: props.user,
            savedName: degreePlan.savedName,
            startSemester: degreePlan.startSemester
        }

        try {
            let res = await axios.post('/user/degreePlan', JSON.stringify(_degreePlan), config)
            onToast('Successfully saved!', 'success')
            setDegreePlan({})
            props.onAddDegreePlan(res.data)
        } catch (err) {
            let { status } = err.response;
            if(status === 400) {
                onToast('Admin template not exists!', 'error')
                return;
            }

            onToast('Server Error!', 'error');
            return;
        }
    }

    const onRest = () => {
        setDegreePlan({})
    }

    return (
        <Card>
            <Card.Header className="text-center">
                <Card.Title as="h3">
                    Create new Degree Plan
                </Card.Title>
            </Card.Header>
            <Card.Body>
                <Form>
                    <Row className="mb-3">
                        <Form.Group controlId="savedName">
                            <Form.Label>Degree Plan Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter degree plan name"
                                          onChange={onInput}
                                          value={degreePlan && degreePlan.savedName ? degreePlan.savedName : ""}/>
                        </Form.Group>

                        <Form.Group className="mt-3" controlId="degreeId">
                            <Form.Label>Degree</Form.Label>
                            <Form.Select aria-label="Select Degree"
                                         onChange={onInput}
                                         value={ degreePlan && degreePlan.degree ? degreePlan.degree.degreeId : "" }>
                                <option disabled></option>
                                {
                                    degrees.map( (degree) =>
                                        <option key={degree.degreeId} value={degree.degreeId}>{degree.name} / {degree.major}</option>
                                    )
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mt-3" controlId="startSemester">
                            <Form.Label>Start Semester</Form.Label>
                            <Form.Select aria-label="Select start semester"
                                         onChange={onInput}
                                         value={degreePlan && degreePlan.startSemester ? degreePlan.startSemester : ""}>
                                <option disabled></option>
                                <option value="1">Semester 1</option>
                                <option value="2">Semester 2</option>
                            </Form.Select>
                        </Form.Group>

                    </Row>
                    <div>
                        <Button variant="primary" type="submit" onClick={() => onSubmit()} className="me-3">
                            Save
                        </Button>
                        <Button variant="secondary" onClick={() => onRest() }>Reset</Button>
                    </div>

                </Form>
            </Card.Body>
            <ToastContainer/>
        </Card>

    )
}

export default DegreePlanCreate