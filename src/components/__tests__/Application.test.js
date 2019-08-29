import React from "react";

import axios from "axios";

import { 
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  queryByAltText,
  getByPlaceholderText,
  queryByText,
  prettyDOM
 } from "@testing-library/react";

// import axios from "../../__mocks__/axios"
import Application from "components/Application";

afterEach(cleanup);

describe ("Application", ()=>{
  xit("renders without crashing", () => {
    render(<Application />);
  });

  xit("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
  
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });


  xit("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    
    // await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    // console.log(prettyDOM(container));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    });


    xit("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
      // 1. Render the Application.
      const { container } = render(<Application />);
    
      // 2. Wait until the text "Archie Cohen" is displayed.
      await waitForElement(() => getByText(container, "Archie Cohen"));
    
      // 3. Click the "Delete" button on the booked appointment.
      const appointment = getAllByTestId(container, "appointment").find(
        appointment => queryByText(appointment, "Archie Cohen")
      );
    
      fireEvent.click(queryByAltText(appointment, "Delete"));
    
      // 4. Check that the confirmation message is shown.
      expect(
        getByText(appointment, "Are you sure you want to delete?")
      ).toBeInTheDocument();
    
      // 5. Click the "Confirm" button on the confirmation.
      fireEvent.click(queryByText(appointment, "Confirm"));
    
      // 6. Check that the element with the text "Deleting" is displayed.
      expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    
      // 7. Wait until the element with the "Add" button is displayed.
      await waitForElement(() => getByAltText(appointment, "Add"));
    
      // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
      const day = getAllByTestId(container, "day").find(day =>
        queryByText(day, "Monday")
      );
    
      // expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    });


    /* test number five */
    xit("shows the save error when failing to save an appointment", async () => {
      
      axios.put.mockRejectedValueOnce();
      
      const { container } = render(<Application />);
    
      await waitForElement(() => getByText(container, "Archie Cohen"));
    
      const appointments = getAllByTestId(container, "appointment");
      const appointment = appointments[0];
  
      fireEvent.click(getByAltText(appointment, "Add"));
  
      fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
        target: { value: "Lydia Miller-Jones" }
      });
      fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
      
      fireEvent.click(getByText(appointment, "Save"));

      await waitForElement(() => getByText(appointment, "Saving failed. Server Error"));
      
      expect(getByText(appointment, "Saving failed. Server Error")).toBeInTheDocument();

    });

    // test number six
    xit("shows the delete error when failing to delete an existing appointment", async () => {

      axios.delete.mockRejectedValue();

      const { container } = render(<Application />);

      await waitForElement(() => getByText(container, "Archie Cohen"));

      const appointment = getAllByTestId(container, "appointment").find(
        appointment => queryByText(appointment, "Archie Cohen")
      );
    
      fireEvent.click(queryByAltText(appointment, "Delete"));
    
      expect(
        getByText(appointment, "Are you sure you want to delete?")
      ).toBeInTheDocument();
    
      fireEvent.click(queryByText(appointment, "Confirm"));
    
      expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    
      await waitForElement(() => getByText(appointment, /deleting/i));
    
      expect(getByText(appointment, "Deleting failed. Server Error.")).toBeInTheDocument();
    });
  
  })