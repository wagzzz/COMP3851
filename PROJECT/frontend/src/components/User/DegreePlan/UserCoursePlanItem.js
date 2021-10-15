import React from "react";
import {Button, Card} from 'react-bootstrap';
import {FaPen, FaTrash} from 'react-icons/fa'

const UserCoursePlanItem = ({...props}) => {


    const editPlan = (item) => {
        props.onEdit(item);
    };

    const deletePlan = (item) => {
        props.onDelete(item);
    };

    return (
        <Card
            className={props.classname}
            draggable={props.draggable}
            onDragStart={props.onDragStart({id: props.item.id})}
            onDragOver={props.onDragOver({id: props.item.id})}
            onDrop={props.onDrop({id: props.item.id})}
            style={{cursor: (props.item.type == '' ? 'initial' : 'move')}}
        >
            <div className="course-item-div">{props.item.course ? props.item.course.code : ''}</div>
            <div className="course-item-div">{props.item.course ? props.item.course.name : ''}</div>
            <div className="course-item-div">{props.item.type ? props.item.type : ''}</div>
            <div className="course-item-btn-group">
                {
                    (props.item.type !== 'Core') ?
                        <div>
                            <FaPen className="edit-btn"
                                   onClick={() => editPlan(props.item)}
                            />
                            <FaTrash className="delete-btn"
                                     onClick={() => deletePlan(props.item)}
                            />
                        </div>
                        :
                        ''
                }

            </div>
        </Card>
    )


};

export default UserCoursePlanItem;