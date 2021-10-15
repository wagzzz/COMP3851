import React, {Component} from 'react';

const SemesterPanel = ({...props}) => {
    return (
        <div className="row" style={{paddingLeft: '8.5%'}}>
            <div className="col semester-panel">
                <label className="semester-label">
                    Semester 1
                </label>
            </div>
            <div className="col semester-panel">
                <label className="semester-label">
                    Semester 2
                </label>
            </div>
        </div>
    );
}

export default SemesterPanel;