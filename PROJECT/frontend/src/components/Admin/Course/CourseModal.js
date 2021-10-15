import React, {useState, useEffect} from "react"
import {Button, Modal, Form} from 'react-bootstrap'
import axios from "axios"
import {config} from "../../../constants"
import {isNull} from "../../../utils/stringUtil"
import {onToast} from "../../../utils/toastUtil"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseModal = (props) => {


    const initialCourse = props.course
    const [modalCourse, setModalCourse] = useState(initialCourse)

    useEffect(() => {
        setModalCourse(initialCourse)
    }, [initialCourse])

    const onInput = ({target: {value, id}}) => {
        setModalCourse({
            ...modalCourse,
            [id]: value
        })
    }

    const onSubmit = () => {
        if (isNull(modalCourse)) {
            onToast('Fill all inputs!', 'warn');
            return;
        }

        if (isNull(modalCourse.code)) {
            onToast('Fill Course Code!', 'warn');
            return;
        }
        if (isNull(modalCourse.name)) {
            onToast('Fill Course Name!', 'warn');
            return;
        }
        if (isNull(modalCourse.level)) {
            onToast('Fill Course Level!', 'warn');
            return;
        }
        if (isNull(modalCourse.units)) {
            onToast('Fill Course Units!', 'warn');
            return;
        }

        const submitCourseData = async () => {
            let res;
            try {
                if (initialCourse === null) {
                    res = await axios.post('/admin/course', JSON.stringify(modalCourse), config)
                    props.onCreateCourse(res.data)
                } else {
                    res = await axios.put('/admin/course', JSON.stringify(modalCourse), config)
                    props.onEditCourse(res.data)
                }
                onToast('Successfully saved!', 'success');
                props.onHide()
            } catch(err) {
                let { status } = err.response;
                if(status === 400) {
                    onToast('Course code duplicated!', 'error');
                    return;
                }
                onToast('Server error!', 'error');
            }
        }
        submitCourseData()
    }

    const onModalHide = () => {
        setModalCourse(initialCourse)
        props.onHide()
    }

    return (
        <div>
            <ToastContainer />
            <Modal
                {...props}
                aria-labelledby="course-edit-modal"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="course-edit-modal">
                        {initialCourse === null ? 'Create course' : 'Edit course'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="code">
                            <Form.Label>Code</Form.Label>
                            <Form.Control type="text" placeholder="Enter course code"
                                          onChange={onInput}
                                          value={modalCourse && modalCourse.code ? modalCourse.code : ""}/>
                            <Form.Text className="text-muted">
                                Code must be unique.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter course name"
                                          onChange={onInput}
                                          value={modalCourse && modalCourse.name ? modalCourse.name : ""}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="level">
                            <Form.Label>Level</Form.Label>
                            <Form.Select aria-label="Select level"
                                         onChange={onInput}
                                         value={modalCourse && modalCourse.level ? modalCourse.level : ""}>
                                <option placeholder="Select level" disabled></option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="units">
                            <Form.Label>Number of units</Form.Label>
                            <Form.Control type="number" placeholder="Enter number of units"
                                          onChange={onInput}
                                          value={modalCourse && modalCourse.units ? modalCourse.units : ""}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={onSubmit}>
                        Save
                    </Button>
                    <Button variant="secondary" onClick={onModalHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default CourseModal