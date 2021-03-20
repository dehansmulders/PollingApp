# PollingAssignment
A basic application where users create a question poll, submit an answer and view results

## To run the app

Navigate to the 'poller' folder.
From the root directory, this should simply be:

### 'cd poller'

Install the necessary libraries with

### 'npm install'

then just run the app with:

### 'npm start'

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Application features

The polling appication has the following features:

- The RESET button reverts all data to the initial state.
- The SAMPLE button populated the application with pre-fabricated data to demonstrate capability.  
- The application is split into 3 segments, each fulfilling a seperate purpose.
    ### Create polling options
        - The owner can specify the poll question, then add up to 10 options.
        - The options can be edited or removed at any time, however there must always be at least 2 options remaining.

    ### Vote for an option
        - The respondant can vote on an available option, repeatedly if they so choose.

    ### View poll results
        - The user can observe the poll results in a graphical manner

- All fields are limited to 80 characters.
