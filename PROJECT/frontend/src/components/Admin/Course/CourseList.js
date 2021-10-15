import React, {useState, useEffect} from "react"
import {Button, Modal, Form, ToastContainer, Toast, Card, ListGroup, Row, Col, ButtonGroup} from 'react-bootstrap'
import axios from "axios"
import {config} from "../../../constants"
import CourseModal from "./CourseModal"
import {FaPencilAlt, FaTrashAlt} from "react-icons/fa";
import Dialog from "react-bootstrap-dialog";
import {onToast} from "../../../utils/toastUtil";

const CourseList = (props) => {

    /** Course Board Start **/
    const [courses, setCourses] = useState([])
    const [courseModalShow, setCourseModalShow] = useState(false)
    const [course, setCourse] = useState()

    useEffect(() => {
        // here goes the data fetching
        const fetchCoursesList = async () => {
            let res = await axios.get('/admin/courses', config)
            setCourses(await res.data)
        }
        fetchCoursesList()
    }, [])

    const onCourseCreate = () => {
        setCourse(null)
        setCourseModalShow(true)
    }

    const onCourseEdit = (course) => {
        setCourse(course)
        setCourseModalShow(true)
    }

    let dialog = null;

    const onCourseDelete = (course) => {
        const deleteCourse = async () => {
            try {
                let res = await axios.delete('/admin/course/' + course.courseId, config)
                onToast('Successfully deleted!', 'success')
                let _courses = []
                courses.forEach((cr) => {
                    if(cr.courseId !== course.courseId) _courses.push(cr)
                })
                setCourses(_courses)
            } catch (err) {
                onToast('Server Error!', 'error')
            }


        }

        dialog.show({
            title: 'Delete course',
            body: 'Are you sure?',
            actions: [
                Dialog.CancelAction(),
                Dialog.DefaultAction(
                    'Remove',
                    () => {
                        deleteCourse()
                    },
                    'btn-danger'
                )
            ],
            bsSize: 'small',
            onHide: (dialog) => {
                dialog.hide()
            }
        })

    }

    /** Course Board End **/

    return (
        <div>
            <Card>
                <Card.Header className="text-center">
                    <Card.Title as="h3">
                        List of Courses
                        <Button size="sm" variant="outline-success" className="float-end mt-1" onClick={onCourseCreate}>
                            <i className="fas fa-plus"></i>
                            + Create Course</Button>
                    </Card.Title>
                </Card.Header>
                <ListGroup>
                    {courses.map(course => {
                        return <ListGroup.Item key={course.courseId}>
                            <Row className="pl-3">
                                <Col md={10} lg={9}>
                                    <h5>{course.code}</h5>
                                    <h6>{course.name}</h6>
                                </Col>
                                <Col md={2} lg={3} className="text-right" style={{position:'relative'}}>
                                    <ButtonGroup className="list-btn-group">
                                        <Button
                                            className="list-edit-btn me-3"
                                            variant="outline-primary"
                                            size="sm"
                                            onClick={() => onCourseEdit(course)}
                                        >
                                            <FaPencilAlt />
                                        </Button>
                                        <Button
                                            className="list-delete-btn"
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => onCourseDelete(course)}
                                        >
                                            <FaTrashAlt />
                                        </Button>
                                    </ButtonGroup>
                                </Col>

                            </Row>
                        </ListGroup.Item>
                    })}
                </ListGroup>

            </Card>

            <CourseModal
                show={courseModalShow}
                course={course}
                onHide={() => setCourseModalShow(false)}
                onCreateCourse={ (course) => {
                    let _courses = courses.slice()
                    _courses.push(course)
                    setCourses(_courses)
                } }
                onEditCourse={ (course) => {
                    let _courses = courses.slice()
                    _courses = _courses.map((cr) => {
                        return (cr.courseId === course.courseId) ? course : cr
                    })
                    setCourses(_courses)
                } }
            />
            <Dialog ref={(component) => { dialog = component }} />
        </div>

    )
}

export default CourseList