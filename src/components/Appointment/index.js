import React from "react";
import classnames  from "classnames"; 
import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";

export default function Appointment(props) {

    return  <article className="appointment">
        <Header time={props.time} />
       
        {props.interview? <Show student={props.interview.student} interviewer={props.interview.interviewer} onEdit={()=>{console.log("Edit clicked")}} onDelete={()=>{console.log("Delete clicked")}} /> : null }
    </article>;
}
