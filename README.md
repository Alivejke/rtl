## Notes

### Improvements

Immutable structures lib should be also used, like Immer, to optimize state managment. Or @redux/toolkit could be used to just replace most of the boilerplate code in this app, which already includes Immer.

### HOCs vs Hooks

While I'm [aware](https://blog.isquaredsoftware.com/2019/07/blogged-answers-thoughts-on-hooks/) of different tradeoffs beteen HOCs and Hooks, Hooks were picked up for this app only for self-educating reasons, because I don't have a lot of oppurtunities to try them at my current job :)

### Styles

We could use bem helpers to create classes, or we could use css modules as a main css solution, or we could also use some of the css in js solutions, depends on team preferences and use case usually

## Commands

### `npm i`

Install all dependancies

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.
