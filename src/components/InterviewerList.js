import React from "react";
import PropTypes from 'prop-types';


import InterviewerListItem from "components/InterviewerListItem";

import "components/InterviewerList.scss";

InterviewerList.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
};

export default function InterviewerList(props) {
    const interviewers = props.interviewers.map(item => {
        return <InterviewerListItem
            key={item.id}
            onChange={() => props.onChange(item.id)}
            selected = {item.id === props.value}
            name= {item.name}
            avatar={item.avatar}
        />
    })

    return <section>
                <h4 className="interviewers__header text--light">Interviewer</h4>
                <ul className="interviewers__list">
                    {interviewers}
                </ul>
            </section>
}



