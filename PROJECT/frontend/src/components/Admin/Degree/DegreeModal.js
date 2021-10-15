import React, {useState, useEffect} from "react"
import {Button, Modal, Form, Col, Row} from 'react-bootstrap'
import axios from "axios"
import {config} from "../../../constants"
import {isNull} from "../../../utils/stringUtil"
import {onToast} from "../../../utils/toastUtil"
import {MultiSelect} from "react-multi-select-component"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DegreeModal = (props) => {

    const initialDegree = props.degree
    const [modalDegree, setModalDegree] = useState(initialDegree)

    const courseOptions = props.degreedetail.courses === undefined ? [] : props.degreedetail.courses.map((course) => {
        return {
            /*label: course.code + '/' + course.name,*/
            label: course.code,
            value: course.courseId
        }
    })

    const [coreSelected, setCoreSelected] = useState([])
    const [directedSelected, setDirectedSelected] = useState([])

    useEffect(() => {
        setModalDegree(initialDegree)
    }, [initialDegree])

    useEffect(() => {
        const _initCoreSelected = props.degreedetail.restraints === undefined ? [] : props.degreedetail.restraints.filter((restraint) => {
            return restraint.type === "Core"
        }).map((restraint) => {
            return {
                /*label: restraint.course.code + '/' + restraint.course.name,*/
                label: restraint.course.code,
                value: restraint.course.courseId
            }
        })
        const _initDirectedSelected = props.degreedetail.restraints === undefined ? [] : props.degreedetail.restraints.filter((restraint) => {
            return restraint.type === "Directed"
        }).map((restraint) => {
            return {
                /*label: restraint.course.code + '/' + restraint.course.name,*/
                label: restraint.course.code,
                value: restraint.course.courseId
            }
        })
        setCoreSelected(_initCoreSelected)
        setDirectedSelected(_initDirectedSelected)
    }, [props.degreedetail])

    const onInput = ({target: {value, id}}) => {
        setModalDegree({
            ...modalDegree,
            [id]: value
        })
    }

    const onSubmit = () => {

        if (isNull(modalDegree)) {
            onToast('Fill all inputs!', 'warn');
            return;
        }

        if (isNull(modalDegree.name)) {
            onToast('Fill Degree Name!', 'warn');
            return;
        }
        if (isNull(modalDegree.major)) {
            onToast('Fill Degree Major!', 'warn');
            return;
        }
        if (isNull(modalDegree.faculty)) {
            onToast('Fill Degree Faculty!', 'warn');
            return;
        }
        if (isNull(modalDegree.numberOfUnits)) {
            onToast('Check Degree Units!', 'warn');
            return;
        }

        let intersection = false;
        coreSelected.forEach((cOption) => {
            directedSelected.forEach((dOption) => {
                if(cOption.value === dOption.value) intersection = true;
            })
        })
        if (intersection) {
            onToast('There are some duplicated courses!', 'warn');
            return;
        }

        modalDegree.restraints = []
        coreSelected.forEach((option) => {
            modalDegree.restraints.push({
                type: "Core",
                course: {courseId: option.value}
            })
        })

        directedSelected.forEach((option) => {
            modalDegree.restraints.push({
                type: "Directed",
                course: {courseId: option.value}
            })
        })

        const submitDegreeData = async () => {

            let res;
            try {
                if (initialDegree === null) {
                    res = await axios.post('/admin/degree', JSON.stringify(modalDegree), config)
                    props.onCreateDegree(res.data)
                } else {
                    res = await axios.put('/admin/degree', JSON.stringify(modalDegree), config)
                    props.onEditDegree(res.data)
                }
                onToast('Successfully saved!', 'success');
                props.onHide()
            } catch(err) {
                let { status } = err.response;
                if(status === 400) {
                    onToast('Degree name and major duplicated!', 'error');
                    return;
                }
                onToast('Server error!', 'error');
            }
        }
        submitDegreeData()
    }

    const onModalHide = () => {
        setModalDegree(initialDegree)
        props.onHide()
    }

    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="degree-edit-modal"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="degree-edit-modal">
                        {initialDegree === null ? 'Create degree' : 'Edit degree'}
                    </Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter degree name"
                                              onChange={onInput}
                                              value={modalDegree && modalDegree.name ? modalDegree.name : ""}/>
                            </Form.Group>

                            <Form.Group as={Col} md="6" controlId="major">
                                <Form.Label>Major</Form.Label>
                                <Form.Control type="text" placeholder="Enter degree major"
                                              onChange={onInput}
                                              value={modalDegree && modalDegree.major ? modalDegree.major : ""}/>
                            </Form.Group>

                            <Form.Group as={Col} md="6" className="mt-3" controlId="faculty">
                                <Form.Label>Faculty</Form.Label>
                                <Form.Control type="text" placeholder="Enter degree faculty"
                                              onChange={onInput}
                                              value={modalDegree && modalDegree.faculty ? modalDegree.faculty : ""}/>
                            </Form.Group>

                            <Form.Group as={Col} md="6" className="mt-3" controlId="numberOfUnits">
                                <Form.Label>Number of units</Form.Label>
                                <Form.Select aria-label="Select number of units"
                                             onChange={onInput}
                                             value={modalDegree && modalDegree.numberOfUnits ? modalDegree.numberOfUnits : ""}>
                                    <option placeholder="Select number of units" disabled></option>
                                    <option value="240">240</option>
                                    <option value="320">320</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} md="12" className="mt-3" controlId="core">
                                <Form.Label>Core courses</Form.Label>
                                <MultiSelect
                                    options={courseOptions}
                                    value={coreSelected}
                                    onChange={setCoreSelected}
                                    labelledBy="Select"
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="12" className="mt-3" controlId="core">
                                <Form.Label>Directed courses</Form.Label>
                                <MultiSelect
                                    options={courseOptions}
                                    value={directedSelected}
                                    onChange={setDirectedSelected}
                                    labelledBy="Select"
                                />
                            </Form.Group>
                        </Row>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={onSubmit}>
                        Save
                    </Button>
                    <Button variant="secondary" onClick={onModalHide}>Close</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </div>

    )
}

export default DegreeModal