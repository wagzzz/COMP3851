import React, {useState, useEffect} from "react"
import { FaPlus, FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import {Button, Card, ListGroup, Row, Col, ButtonGroup} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import axios from "axios"
import {config} from "../../../constants"
import Dialog from 'react-bootstrap-dialog'
import {onToast} from "../../../utils/toastUtil"

const DegreePlanList = (props) => {

    /** DegreePlan Board Start **/

    const [degreePlans, setDegreePlans] = useState([])
    const [degreePlan, setDegreePlan] = useState()

    const [degreePlanDetail, setDegreePlanDetail] = useState([])

    let dialog = null;

    useEffect(() => {
        setDegreePlans(props.degreePlans)
    }, [props])


    const onDegreePlanDelete = (degreePlan) => {
        const deleteDegreePlan = async () => {
            try {
                let res = await axios.delete('/user/degreePlan/' + degreePlan.id, config)
                onToast('Successfully deleted!', 'success')
                let _degreePlans = []
                degreePlans.forEach((dg) => {
                    if(dg.id !== degreePlan.id) _degreePlans.push(dg)
                })
                setDegreePlans(_degreePlans)
                props.onDeleteDegreePlan(degreePlan)
            } catch (error) {
                onToast('Server Error!', 'error')
            }

        }

        dialog.show({
            title: 'Delete degreePlan',
            body: 'Are you sure?',
            actions: [
                Dialog.CancelAction(),
                Dialog.DefaultAction(
                    'Remove',
                    () => {
                        deleteDegreePlan()
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

    /** DegreePlan Board Start **/

    return (
        <div>
            <Card>
                <Card.Header className="text-center">
                    <Card.Title as="h3">
                        List of Degree Plans
                    </Card.Title>
                </Card.Header>
                <ListGroup>
                    {degreePlans.map(degreePlan => {
                        return <ListGroup.Item key={degreePlan.id}>
                            <Row className="pl-3">
                                <Col md={10} lg={9}>
                                    <Link to={'degreePlan/' + degreePlan.id}>
                                        <h5>{degreePlan.savedName}</h5>
                                    </Link>
                                    <h6>{degreePlan.degree.name} / Start Semester {degreePlan.startSemester}</h6>
                                </Col>
                                <Col md={2} lg={3} className="text-right" style={{position:'relative'}}>
                                    <ButtonGroup className="list-btn-group">

                                        <Button
                                            className="list-delete-btn"
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => onDegreePlanDelete(degreePlan)}
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
            <Dialog ref={(component) => { dialog = component }} />
        </div>

    )
}

export default DegreePlanList