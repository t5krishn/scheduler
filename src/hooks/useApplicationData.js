import React, { useState,  useReducer } from 'react';
import axios from 'axios';

export default function useApplicationData() {

    const SET_DAY = "SET_DAY";
    const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
    const SET_INTERVIEW = "SET_INTERVIEW";

    function reducer(state, action) {
        console.log(state);
        switch (action.type) {
            case SET_DAY:
                return { ...state, day: action.day };

            case SET_APPLICATION_DATA:
                return {
                    ...state,
                    days: action.days,
                    appointments: action.appointments,
                    interviewers: action.interviewers
                }

            case SET_INTERVIEW: {
                const appointment = {
                    ...state.appointments[action.id],
                    interview: { ...action.interview }
                };
                const appointments = {
                    ...state.appointments,
                    [action.id]: appointment
                };
                return {
                    ...state,
                    appointments
                }
            }

            default:
                throw new Error(
                    `Tried to reduce with unsupported action type: ${action.type}`
                );
        }
    }

    const [state, dispatch] = useReducer(reducer, {
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {}
    });


    Promise.all([
        axios.get(`http://localhost:3001/api/days`),
        axios.get(`http://localhost:3001/api/appointments`),
        axios.get(`http://localhost:3001/api/interviewers`)
    ]).then((resp) => {
        dispatch({
            type: SET_APPLICATION_DATA,
            days: resp[0].data,
            appointments: resp[1].data,
            interviewers: resp[2].data
        });
    })


    const setDay = day => (dispatch({ type: SET_DAY, day }));

    function bookInterview(id, interview) {

        return axios.put(`http://localhost:3001/api/appointments/${id}`, { interview })
            .then(() =>
                dispatch({
                    type: SET_INTERVIEW,
                    id,
                    interview
                })
            );
    };

    function cancelInterview(id) {

        return axios.delete(`http://localhost:3001/api/appointments/${id}`)
            .then(() =>
                dispatch({
                    type: SET_INTERVIEW,
                    id,
                    interview: null
                })
            );
    }

    return { state, setDay, bookInterview, cancelInterview };
}