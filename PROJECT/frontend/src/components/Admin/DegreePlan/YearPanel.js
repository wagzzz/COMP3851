import React, {Component} from 'react';

const YearPanel = ({...props}) => {
    return (
        <div className="year-panel">
            <label className="year-label">
                Year {props.year}
            </label>
        </div>
    );
}

export default YearPanel;