import React , {useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index.js";
import { 
        getAppointmentsForDay, 
        getInterview,
        getInterviewersByDay } from "helpers/selectors";
import useApplicationData from "../hooks/useApplicationData"


export default function Application(props) {
  
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
 
  // const setDays = days => {setState(prev => ({ ...prev, days }))};
  // const setAppointments = appointments => {setState(prev => ({ ...prev, appointments}))};
  // const setInterviewers = interviewers => {setState(prev => ({ ...prev, interviewers}))};

  // useEffect(() => {
    
  // }, [/* Nothing to keep track of */]);


  

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        
        <hr className="sidebar__separator sidebar--centered" />
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        <nav className="sidebar__menu" />
      
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
      {
        (getAppointmentsForDay(state, state.day)).map((appointment) => {
          const interview = getInterview(state, appointment.interview);
          const interviewers = getInterviewersByDay(state, state.day);
          return <Appointment 
            key={appointment.id}
            interview={interview}
            id={appointment.id}
            time={appointment.time}
            interviewers = {interviewers}
            bookInterview = {bookInterview}
            cancelInterview = {cancelInterview}
            />})
      }
      <Appointment key="last" id="last" time="5pm"/>
      </section>
​
    </main>
  );
}