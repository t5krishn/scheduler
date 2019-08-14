/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render } from "@testing-library/react";

/*
  We import the component that we are testing
*/
import Appointment from "../Appointment/index";

/*
  A test that renders a React Component
*/
describe("Appointment rendering without crashing", () =>{
    it("renders without crashing", () => {
        render(<Appointment
            key={1}
            interview={{}}
            id={1}
            time="12pm"
            interviewers={{}}
            bookInterview={()=>{}}
            cancelInterview={()=>{}}
        />);
    });

    
});