# Interview Scheduler

Scheduler is a React application that allows students to setup interview appointments with mentors at Lighthouse Labs. This is a simple application relying on an api connected to a PostgreSQL database to persist data.

**The main objective of this project was to get comfortable in React, state management, hooks and testing using Jest, Cypress, CircleCI.**

Try it: https://t-scheduler.netlify.com

## Final Product

!["Screenshot of Main view"](https://github.com/t5krishn/scheduler/blob/master/readme_thumbnails/main_page.png?raw=true)
!["Screenshot of Form Element"](https://github.com/t5krishn/scheduler/blob/master/readme_thumbnails/make_appointment.png?raw=true)



## Learning Milestones
- Creating a functional React application using Hooks
- Directing a flow of information for components to render
- Understand the nesting of components and how to test each one using storybook
- Use Hooks with functional components to render components with new information

## Setup for your own Scheduler

1. Clone this repo with `git clone https://github.com/t5krishn/scheduler.git`
2. Clone the api repo with `git clone https://github.com/t5krishn/scheduler-api.git`
3. Install dependencies with `npm install`, in both the directories: `/scheduler` and `/scheduler-api`
4. Follow the instructions on how to set-up the database from `https://github.com/t5krishn/scheduler-api`
5. Run the API server using `npm start` in the `/scheduler-api` folder
6. Run the Webpack server that is the React application using `npm start` in the `/scheduler` folder



## Running Jest Test Framework
If you want to run the pre-defined tests, use: 
```sh
npm test
```

## Dependencies
- React: ^16.9.0
- Axios: ^0.19.0
- React-dom: ^16.9.0
- React-scripts: 3.0.0

**If you have any questions or want to get in touch, feel free to shoot me an email at [t5krishn@gmail.com](mailto:t5krishn@gmail.com)**
