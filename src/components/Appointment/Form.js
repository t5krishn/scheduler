import React, { useState } from "react";
// import classnames  from "classnames"; 
import "components/Appointment/styles.scss";
import Button from "../Button"
import InterviewerList from "../InterviewerList";


export default function Form(props) {

    const [name, setName] = useState(props.name || "");
    const [interviewer, setInterviewer] = useState(props.interviewer || null);

    return <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
            <input
                className="appointment__create-input text--semi-bold"
                name={name}
                type="text"
                placeholder="Enter Student Name"
            />
        </form>
        <InterviewerList interviewers={props.interviewers} value={props.interviewer} onChange={setInterviewer}/>
    </section>
    <section className="appointment__card-right">
        <section className="appointment__actions">
            <Button danger onClick={()=> {
                setName("");
                setInterviewer(null);
                props.onCancel();
            }}>
                Cancel
            </Button>
            <Button confirm onClick={()=> props.onSave(name,interviewer)}>Save</Button>
        </section>
    </section>
  </main>;
}