import React from "react";
import { Button, Card } from 'react-bootstrap';
import { FaPen, FaTrash } from 'react-icons/fa'

const DisabledCoursePlanItem = ({...props}) => {

    return (
        <Card
            className={ props.classname }
            draggable={ false }
        >
            <div id="a" className="course-item-div"></div>
            <div className="course-item-div"></div>
            <div className="course-item-div"></div>
            <div className="course-item-btn-group"></div>
        </Card>
    )


};

export default DisabledCoursePlanItem;