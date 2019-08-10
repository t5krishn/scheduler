export function getAppointmentsForDay(state, day) {
    let result = [];
    let apps = [];
    let stateApps = {...state.appointments};

    for (let d of [...state.days]) {
        if (d.name === day) {
            apps = d.appointments;
            break;
        }
    }

    for (let a of apps) {
        if (stateApps[a]) {
            result.push(stateApps[a]);
        }
    }

    return result;
};



export function getInterview (state, interview) {
    let stateInterviewers = { ...state.interviewers };
    
    if (interview) {
        let newInterview = { ...interview };
        newInterview["interviewer"] = stateInterviewers[newInterview.interviewer];
        // console.log(newInterview);
        return newInterview;
    }
    
};


export function getInterviewersByDay (state, day) {
    let result = [];
    let ints = [];
    let stateInts = {...state.interviewers};

    for (let d of [...state.days]) {
        if (d.name === day) {
            ints = d.interviewers;
            break;
        }
    }

    for (let i of ints) {
        if (stateInts[i]) {
            result.push(stateInts[i]);
        }
    }

    return result;
};