import React, {useState, useEffect} from "react"
import { FaPlus, FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import {Button, Card, ListGroup, Row, Col, ButtonGroup} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import axios from "axios"
import {config} from "../../../constants"
import DegreeModal from "./DegreeModal"
import Dialog from 'react-bootstrap-dialog'
import {onToast} from "../../../utils/toastUtil";

const DegreeList = (props) => {

    /** Degree Board Start **/

    const [degrees, setDegrees] = useState([])
    const [degreeModalShow, setDegreeModalShow] = useState(false)
    const [degree, setDegree] = useState()

    const [degreeDetail, setDegreeDetail] = useState([])

    let dialog = null;

    useEffect(() => {
        // here goes the data fetching
        const fetchDegreeList = async () => {
            let res = await axios.get('/admin/degrees', config)
            setDegrees(await res.data)
        }
        fetchDegreeList()
    }, [])

    const onDegreeCreate = async () => {
        setDegree(null)
        let res = await axios.get('/admin/degree/0', config)

        try {
            setDegreeDetail(res.data)
            setDegreeModalShow(true)
        } catch (err) {
            onToast('Server error!', 'error')
        }
    }

    const onDegreeEdit = async (degree) => {
        setDegree(degree)
        try {
            let res = await axios.get('/admin/degree/' + degree.degreeId, config)
            setDegreeDetail(res.data)
            setDegreeModalShow(true)
        } catch (err) {
            onToast('Server Error!', 'error')
        }
    }

    const onDegreeDelete = (degree) => {
        const deleteDegree = async () => {
            try {
                let res = await axios.delete('/admin/degree/' + degree.degreeId, config)
                onToast('Successfully deleted!', 'success')
                let _degrees = []
                degrees.forEach((dg) => {
                    if(dg.degreeId !== degree.degreeId) _degrees.push(dg)
                })
                setDegrees(_degrees)
            } catch (err) {
                onToast('Server Error!', 'error')
            }

        }

        dialog.show({
            title: 'Delete degree',
            body: 'Are you sure?',
            actions: [
                Dialog.CancelAction(),
                Dialog.DefaultAction(
                    'Remove',
                    () => {
                        deleteDegree()
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

    const onCreateDegree = (degree) => {
        let _degrees = degrees.slice()
        _degrees.push(degree)
        setDegrees(_degrees)
    }

    const onEditDegree = (degree) => {
        let _degrees = degrees.slice()
        _degrees = _degrees.map((dg) => {
            return (dg.degreeId === degree.degreeId) ? degree : dg
        })
        setDegrees(_degrees)
    }
    /** Degree Board Start **/

    return (
        <div>
            <Card>
                <Card.Header className="text-center">
                    <Card.Title as="h3">
                        List of Degrees
                        <Button size="sm" variant="outline-success" className="float-end mt-1 pb-2" onClick={onDegreeCreate}>
                            <FaPlus/>
                        </Button>
                    </Card.Title>
                </Card.Header>
                <ListGroup>
                    {degrees.map(degree => {
                        return <ListGroup.Item key={degree.degreeId}>
                            <Row className="pl-3">
                                <Col md={10} lg={9}>
                                    <Link to={'degree/' + degree.degreeId}>
                                        <h5>{degree.name}</h5>
                                    </Link>
                                    <h6>{degree.major} / {degree.faculty}</h6>
                                </Col>
                                <Col md={2} lg={3} className="text-right" style={{position:'relative'}}>
                                    <ButtonGroup className="list-btn-group">
                                        <Button
                                            className="list-edit-btn me-3"
                                            variant="outline-primary"
                                            size="sm"
                                            onClick={() => onDegreeEdit(degree)}
                                        >
                                            <FaPencilAlt />
                                        </Button>
                                        <Button
                                            className="list-delete-btn"
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => onDegreeDelete(degree)}
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
            <DegreeModal
                show={degreeModalShow}
                degreedetail={degreeDetail}
                degree={degree}
                onHide={() => setDegreeModalShow(false)}
                onCreateDegree={ onCreateDegree }
                onEditDegree={ onEditDegree }
            />
            <Dialog ref={(component) => { dialog = component }} />
        </div>

    )
}

export default DegreeList