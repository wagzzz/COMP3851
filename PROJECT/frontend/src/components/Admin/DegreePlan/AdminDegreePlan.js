import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {logout} from '../../../store/actions/authActions';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Button, Container, Navbar, Row, Col, Modal, Form} from 'react-bootstrap';
import {LinkContainer} from "react-router-bootstrap";
import AdminCoursePlanItem from "./AdminCoursePlanItem";
import DisabledCoursePlanItem from "./DisabledCoursePlanItem";
import axios from "axios";
import {config} from "../../../constants";
import YearPanel from "./YearPanel";
import SemesterPanel from "./SemesterPanel";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {isNull} from "../../../utils/stringUtil";
import {onToast} from "../../../utils/toastUtil"

const AdminDegreePlan = () => {
    const dispatch = useDispatch();

    const signout = () => {
        dispatch(logout())
    }

    let { degreeId } = useParams();

    const {user} = useSelector((state) => state.auth);

    const [degreePlan, setDegreePlan] = useState({})
    const [coursePlans, setCoursePlans] = useState([])
    const [coursePlan, setCoursePlan] = useState({})
    const [restraints, setRestraints] = useState([])
    const [modalShow, setModalShow] = useState(false)

    const [yearList, setYearList] = useState([])

    useEffect(() => {
        // here goes the data fetching
        const fetchDegreePlan = async () => {
            let res = await axios.get('/admin/degreePlan/' + degreeId, config)
            let _coursePlans = res.data.coursePlans.sort((a, b) => {
                return a.sequence - b.sequence;
            })
            setDegreePlan(_coursePlans[0].degreePlan)
            setCoursePlans(_coursePlans)
            let _yearList = []
            for(let i = 1; i <= _coursePlans.length / 8; i ++) _yearList.push(i);
            setYearList(_yearList);

            setRestraints(res.data.restraints);
        }
        fetchDegreePlan()
    }, [])

    const swapCoursePlan = (fromCoursePlan, toCoursePlan) => {
        let items = coursePlans.slice();
        let fromIndex = -1;
        let toIndex = -1;

        for (let i = 0; i < items.length; i++) {
            if (items[i].id === fromCoursePlan.id) {
                fromIndex = i;
            }
            if (items[i].id === toCoursePlan.id) {
                toIndex = i;
            }
        }

        if (fromIndex != -1 && toIndex != -1) {

            let buf = items[fromIndex];
            items[fromIndex] = items[toIndex];
            items[toIndex] = buf;

            setCoursePlans(items);

        }
    };

    /* The dragstart event is fired when the user starts dragging an element or text selection */
    /* event.target is the source element : that is dragged */
    const handleDragStart = data => event => {
        let fromCoursePlan = JSON.stringify({id: data.id});
        event.dataTransfer.setData("dragContent", fromCoursePlan);
    };

    const nullHandleDragStart = data => event => {

    };

    /* The dragover event is fired when an element or text selection is being dragged */
    /* over a valid drop target (every few hundred milliseconds) */
    /* The event is fired on the drop target(s) */
    const handleDragOver = data => event => {
        event.preventDefault(); // Necessary. Allows us to drop.
        return false;
    };

    /* Fired when an element or text selection is dropped on a valid drop target */
    /* The event is fired on the drop target(s) */
    const handleDrop = data => event => {
        event.preventDefault();

        if(event.dataTransfer.getData("dragContent") === '') return false;
        let fromCoursePlan = JSON.parse(event.dataTransfer.getData("dragContent"));
        let toCoursePlan = {id: data.id};

        swapCoursePlan(fromCoursePlan, toCoursePlan);
        return false;
    };

    const onSave = async () => {
        let _coursePlans = coursePlans.slice();
        _coursePlans.forEach((coursePlan, index) => {
            coursePlan.id = null;
            coursePlan.sequence = index + 1;
        });

        try {
            let res = await axios.put('/admin/degreeplan', JSON.stringify(_coursePlans), config)
            onToast('Successfully saved!', 'success');
            setCoursePlans(res.data);
        } catch (err) {
            onToast('Server Error!', 'error');
        }

    }

    const onSaveCoursePlan = () => {
        if (isNull(coursePlan.type)) {
            onToast('Select course type!', 'warn');
            return;
        }
        let _coursePlans = coursePlans.slice()
        _coursePlans = _coursePlans.map((cp) => {
            if(cp.id !== coursePlan.id) return cp
            let _course = null;
            if(coursePlan.course != null) _course = restraints.filter((restraint) => (restraint.course.courseId == coursePlan.course.courseId))[0].course
            cp.type = coursePlan.type === "" ? "Elective" : coursePlan.type;
            cp.course = _course;
            return cp;
        })
        setCoursePlans(_coursePlans);
        setModalShow(false);
    }

    const onEditCoursePlan = (coursePlan) => {
        setCoursePlan(coursePlan);
        setModalShow(true);
    }

    const onDeleteCoursePlan = (coursePlan) => {
        let _coursePlans = coursePlans.slice()
        _coursePlans = _coursePlans.map((cp) => {
            if(cp.id !== coursePlan.id) return cp
            cp.type = "";
            cp.course = null;
            return cp;
        })
        setCoursePlans(_coursePlans);
    }

    const onChangeCoursePlan = ({target: {value, id}}) => {
        if(id === 'type') {
            setCoursePlan({
                ...coursePlan,
                [id]: value
            })
        } else if(id === 'courseId') {
            setCoursePlan({
                ...coursePlan,
                course: {
                    courseId: value
                }
            })
        }


    }

    const itemClassName = (idx, disabled) => {
        let className = disabled ? 'disabled-course-item' : 'course-item';
        if(idx % 8 === 3) className += ' course-item-left-sep';
        if(idx % 8 === 4) className += ' course-item-right-sep';
        return className;
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand className="pull-left">Program Advisory Tool</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Text>
                        Signed in as: <a>{user.firstName} {user.lastName}</a>
                    </Navbar.Text>
                    <Button onClick={signout}>Logout</Button>
                </Container>
            </Navbar>
            <div className="plan-board" >
                {/*<h2 className="bigHeader pl-6"> { degreePlan.savedName} </h2>*/}
                <h2 className="bigHeader degree-title"> { degreePlan.degree === undefined ? degreePlan.saveName : degreePlan.degree.name+' / '+degreePlan.degree.major } </h2>
                <SemesterPanel />
                <div className="row">
                    <div className="col-1"
                    >
                        {
                            yearList.map((year) => (
                                <YearPanel year={year} key={year}/>
                            ))
                        }
                    </div>
                    <div className="col-11">
                        <div className="row plan-panel">
                            {
                                coursePlans.map((coursePlan, index) => (
                                    coursePlan.disabled ?
                                        <DisabledCoursePlanItem
                                            item={coursePlan}
                                            key={coursePlan.id}
                                            classname={ itemClassName(index, true) }
                                            draggable={ false }
                                        /> :
                                        <AdminCoursePlanItem
                                            item={coursePlan}
                                            key={coursePlan.id}
                                            classname={ itemClassName(index, false) }
                                            draggable={ coursePlan.type != "" }
                                            onDragStart={ coursePlan.type != "" ? handleDragStart : nullHandleDragStart}
                                            onDragOver={handleDragOver}
                                            onDrop={handleDrop}
                                            onEdit={onEditCoursePlan}
                                            onDelete={onDeleteCoursePlan}
                                        />
                                ))
                            }
                        </div>
                    </div>

                </div>
                <div className="justify-btn-group mb-3" >
                    <Link to="/dashboard">
                        <Button size="sm" variant="outline-danger" className="cancel-btn">
                            Cancel
                        </Button>
                    </Link>
                    <Button size="sm" variant="outline-primary" className="save-btn" onClick={onSave}>
                        Save
                    </Button>
                </div>
            </div>
            <ToastContainer />

            <Modal
                aria-labelledby="coursePlan-edit-modal"
                centered
                show={modalShow}
            >
                <Modal.Header>
                    <Modal.Title id="coursePlan-edit-modal">
                        Select Course
                    </Modal.Title>
                    <ToastContainer />
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="type">
                            <Form.Label>Type</Form.Label>
                            <Form.Select aria-label="Select level"
                                         onChange={onChangeCoursePlan}
                                         value={ coursePlan ? coursePlan.type : ""}>
                                <option value="" disabled></option>
                                <option value="Core">Core</option>
                                <option value="Directed">Directed</option>
                                <option value="Elective">Elective</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="courseId">
                            <Form.Label>Course</Form.Label>
                            <Form.Select aria-label="Select level"
                                         onChange={onChangeCoursePlan}
                                         value={ (coursePlan && coursePlan.course) ? coursePlan.course.courseId : ""}>
                                <option value="" placeholder="Select type" disabled></option>
                                {
                                    restraints.filter( (restraint) => {
                                        if(coursePlan === null) return false
                                        if(coursePlan.type === null) return false
                                        if(coursePlan.type === "Elective") {
                                            if(restraint.type !== "Core" && restraint.type !== "Directed") return true;
                                            return false;
                                        }
                                        return restraint.type == coursePlan.type
                                    } ).map( (restraint) =>
                                        <option key={restraint.course.courseId} value={restraint.course.courseId}>{restraint.course.code} / {restraint.course.name}</option>
                                    )
                                }
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={onSaveCoursePlan}>
                        Save
                    </Button>
                    <Button variant="secondary" onClick={() => {
                        setModalShow(false)
                        setCoursePlan({})
                    }}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AdminDegreePlan;
