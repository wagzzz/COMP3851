import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {logout} from '../../../store/actions/authActions';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Button, Container, Navbar, Row, Col, Modal, Form} from 'react-bootstrap';
import {LinkContainer} from "react-router-bootstrap";
import UserCoursePlanItem from "./UserCoursePlanItem";
import DisabledCoursePlanItem from "../../Admin/DegreePlan/DisabledCoursePlanItem";
import axios from "axios";
import {config} from "../../../constants";
import YearPanel from "../../Admin/DegreePlan/YearPanel";
import SemesterPanel from "../../Admin/DegreePlan/SemesterPanel";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {isNull} from "../../../utils/stringUtil";
import {onToast} from "../../../utils/toastUtil"

const UserDegreePlan = () => {
    const dispatch = useDispatch();

    const signout = () => {
        dispatch(logout())
    }

    let { degreePlanId } = useParams();

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
            try {
                let res = await axios.get('/user/degreePlan/' + degreePlanId, config)
                let _coursePlans = res.data.coursePlans.sort((a, b) => {
                    return a.sequence - b.sequence;
                })
                setDegreePlan(_coursePlans[0].degreePlan)
                setCoursePlans(_coursePlans)
                let _yearList = []
                for(let i = 1; i <= parseInt(_coursePlans.length + 4) / 8; i ++) _yearList.push(i);
                setYearList(_yearList);

                setRestraints(res.data.restraints)

            } catch (err) {
                onToast('Server Error!', 'error')
            }

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
    /* Firefox requires calling dataTransfer.setData for the drag to properly work */
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
            let res = await axios.put('/user/degreePlan', JSON.stringify(_coursePlans), config)
            onToast('Successfully saved!', 'success');
            setCoursePlans(res.data);
        } catch (err) {
            onToast('Server Error!', 'error');
        }

    }

    const onSaveCoursePlan = () => {
/*        if (isNull(coursePlan.course)) {
            onToast('Select course!', 'warn');
            return
        }*/

        let _coursePlans = coursePlans.slice()
        _coursePlans = _coursePlans.map((cp) => {
            if(cp.id !== coursePlan.id) return cp
            let _course = null;
            if(coursePlan.course != null) _course = restraints.filter((restraint) => (restraint.course.courseId == coursePlan.course.courseId))[0].course
            cp.type = (coursePlan.type === undefined || coursePlan.type === "") ? "Elective" : coursePlan.type;
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
            //if(cp.type === 'Elect') cp.type = "";

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
            if(value === "") {
                setCoursePlan({
                    ...coursePlan,
                    course: null
                })
            } else {
                setCoursePlan({
                    ...coursePlan,
                    course: {
                        courseId: value
                    }
                })
            }

        }


    }

    const itemClassName = (idx, disabled) => {
        let className = disabled ? 'disabled-course-item' : 'course-item';
        if(idx % 8 === 3) className += ' course-item-left-sep';
        if(idx % 8 === 4) className += ' course-item-right-sep';
        return className;
    }

    const onAutoComplete = () => {
        let _coursePlans = coursePlans.slice();

        let usedCourses = _coursePlans
            .filter((_coursePlan) => {
                if(_coursePlan.disabled) return false
                return _coursePlan.course?.courseId !== undefined
            })
            .map((_coursePlan) => (_coursePlan.course));

        let _restraints = restraints.filter((_restraint) =>{
            return usedCourses.filter((_course) => (_course.courseId === _restraint.course.courseId)) == 0
        })

        let coreCourses = _restraints
            .filter((restraint) => restraint.type == 'Core')
            .map((restraint) => restraint.course)
            .sort((a, b) => 0.5 - Math.random());
        let directedCourses = _restraints
            .filter((restraint) => restraint.type == 'Directed')
            .map((restraint) => restraint.course)
            .sort((a, b) => 0.5 - Math.random());
        let eletiveCourses = _restraints
            .filter((restraint) => (restraint.type != 'Core' && restraint.type != 'Directed'))
            .map((restraint) => restraint.course)
            .sort((a, b) => 0.5 - Math.random());
        let corePos = 0, directedPos = 0, electivePos = 0

        _coursePlans
            .filter((_coursePlan) => {
                if(_coursePlan.disabled) return false
                return _coursePlan.course?.courseId == undefined
            })
            .forEach((_coursePlan) => {
                if(_coursePlan.type === "Core") {
                    if(coreCourses.length > 0 && corePos < coreCourses.length) {
                        _coursePlan.course = coreCourses[corePos]
                        corePos ++;
                    }
                } else if(_coursePlan.type === "Directed") {
                    if(directedCourses.length && directedPos < directedCourses.length) {
                        _coursePlan.course = directedCourses[corePos]
                        corePos ++
                    }
                } else {
                    if(eletiveCourses.length && electivePos < eletiveCourses.length) {
                        _coursePlan.course = eletiveCourses[electivePos];
                        _coursePlan.type = "Elective"
                        electivePos ++
                    }
                }
            })

        setCoursePlans(_coursePlans);
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
                <h2 className="bigHeader pl-6"> { degreePlan.savedName} </h2>
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
                                        <UserCoursePlanItem
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
                    <Button size="sm" variant="outline-success" className="autocomplete-btn" onClick={onAutoComplete}>
                        Auto Complete
                    </Button>
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
                                         value={ coursePlan && coursePlan.type ? coursePlan.type : "Elective"} disabled>
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
                                <option value="" placeholder="Select type"></option>
                                {
                                    restraints.filter( (restraint) => {
                                        if(coursePlan === null) return false
                                        if(coursePlan.type === null) return false
                                        if(coursePlan.type === "Elective" || coursePlan.type === "") {
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

export default UserDegreePlan;
