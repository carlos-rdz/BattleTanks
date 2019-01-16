DC-Capstone Project

# BattleTanks

## Synopsis
BattleTanks is an adaptation of the classic guessing game Battleship.  The game pairs two players together
and allows each to place their tanks in strategic locations before taking turns to guess each other's
tank locations and ultimately be the first one to destroy the other's tanks before being declared the winner.
This simple clone allows players to have fun without having to ever deal with the hassle of 
carrying a physical game around.  It's quick, easy and fun!

## Why?

- With two weeks to build our Digital Crafts capstone project, we chose BattleTanks because we wanted a relatively simple idea/mechanic that could become a highly polished project finished within that timeframe. This project would help solidify our understanding of React and component lifecycles
- We built upon our prior knowledge of React components, state, and React Router 

## Features
- Immediate responsiveness with React
- Matchmaking and live chat with Websockets
- Unique artwork and sound FX

## Successes
- Maintained focus on creating a simple product with few bugs
- Set up server to assign every two players and handle message/data passing integral to game mechanics 
- Wrote code to take into account edge cases and deal with identified abnormal user interactions

## Challenges
- Switching from a local client with distinct Player 1 and Player 2 to a message passing model with Websockets posed some interesting puzzles. With the Websocket server we now have a client always set in logic as Player 1 with messages received pertaining to the opponent. Without moving our game logic to the server it became difficult to differentiate players.
- Fixing React rendering issues to deal with both png's and gifs
- State never seemed to be updated when we needed it to be for sequential method calls



Play Live:

<http://battletanks.online>





******************************************************************************************************************************
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
