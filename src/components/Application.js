import React , {useState, useEffect } from "react";
import axios from 'axios';
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index.js";
import { 
        getAppointmentsForDay, 
        getInterview,
        getInterviewersByDay } from "helpers/selectors";


export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}

  });

  const setDay = day => {setState({ ...state, day })};
  // const setDays = days => {setState(prev => ({ ...prev, days }))};
  // const setAppointments = appointments => {setState(prev => ({ ...prev, appointments}))};
  // const setInterviewers = interviewers => {setState(prev => ({ ...prev, interviewers}))};

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:3001/api/days`),
      axios.get(`http://localhost:3001/api/appointments`),
      axios.get(`http://localhost:3001/api/interviewers`)
    ]).then((resp) => {
      setState( prev => 
        ({...prev,
          days: resp[0].data,
          appointments:resp[1].data,
          interviewers:resp[2].data}));
  })
  }, [/* Nothing to keep track of, only run on mount */]);


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`http://localhost:3001/api/appointments/${id}`, { interview })
    .then(() => 
      setState({
        ...state,
        appointments
    }));
  };

  function deleteInterview (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`http://localhost:3001/api/appointments/${id}`)
    .then(() => 
      setState({
        ...state,
        appointments
    }));
  }

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
            deleteInterview = {deleteInterview}
            />})
      }
      <Appointment id={"last"} time="5pm"/>
      </section>
​
    </main>
  );
}