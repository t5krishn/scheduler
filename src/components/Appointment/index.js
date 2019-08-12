import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Confirm from "./Confirm";
import Error from "./Error";


import useVisualMode from "../../hooks/useVisualMode";
import Status from "./Status";

export default function Appointment(props) {

    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const SAVING = "SAVING";
    const CREATE = "CREATE";
    const DELETE = "DELETE";
    const EDIT = "EDIT";
    const ERROR_SAVE = "ERROR_SAVE";
    const ERROR_DELETE = "ERROR_DELETE";
    const DELETING = "DELETING";

    let initMode = (props.interview) ? SHOW : EMPTY;
    const [ mode, transition, back ] = useVisualMode(initMode);

    function save(name, interviewer) {
        transition(SAVING);
        props.bookInterview(
            props.id, {student: name, interviewer}
        )
        .then(() => transition(SHOW))
        .catch(()=> transition(ERROR_SAVE, true));
    };

    function deleteApp() {
        transition(DELETING, true);
        props.cancelInterview(props.id)
            .then(() => transition(EMPTY))
            .catch(()=> transition(ERROR_DELETE, true));
    }


    return  (
        <article className="appointment">

            <Header time={props.time} />
            
            { mode === SHOW &&
                <Show 
                    student={(props.interview) ? props.interview.student : null} 
                    interviewer={(props.interview) ? props.interview.interviewer : null}
                    onEdit={()=>{transition(EDIT)}} 
                    onDelete={()=>{transition(DELETE)}} /> 
            }
            { mode === EMPTY &&
                    <Empty 
                        onAdd = {()=>{transition(CREATE)}}
                    />
            }
            { mode === SAVING &&
                    <Status 
                        message = "Saving"
                    />
            }
            { mode === DELETING &&
                    <Status 
                        message = "Deleting"
                    />
            }
            { mode === ERROR_SAVE &&
                    <Error 
                        message = "Saving failed. Server Error"
                        onClose = {() => {
                            // transition(EDIT);
                            back();
                        }}
                    />
            }
            { mode === ERROR_DELETE &&
                    <Error 
                        message = "Deleting failed. Server Error."
                        onClose = {() => {
                            // transition(SHOW);
                            back();
                        }}
                    />
            }
            { mode === DELETE &&
                    <Confirm 
                        message = "Are you sure you want to delete?"
                        onCancel ={() => {back()}}
                        onConfirm = {() => {deleteApp()}}
                    />
            }
            { mode === EDIT &&
                <Form
                    interviewer={(props.interview) ? props.interview.interviewer.id : null}
                    interviewers={props.interviewers}
                    name={props.interview && props.interview.student}
                    onSave={(name, interviewer) => {
                        save(name, interviewer);
                    }}
                    onCancel={() => { transition(SHOW) }}
                />
            }
            { mode === CREATE &&
                <Form
                    interviewer={(props.interview) ? props.interview.interviewer.id : null}
                    interviewers={props.interviewers}
                    name={props.interview && props.interview.student}
                    onSave={(name, interviewer) => {
                        save(name, interviewer);
                    }}
                    onCancel={() => { transition(EMPTY) }}
                />
            }
        </article>
    );
}
