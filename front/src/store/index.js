// third-party
import { configureStore } from '@reduxjs/toolkit';

import thunk from "redux-thunk";

// project import
import reducers from './reducers';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const middleware = [thunk];
const store = configureStore({
  // middleware: [thunk, routerMiddleware(history)],
  middleware: [thunk],
    reducer: reducers
});

const { dispatch } = store;

export { store, dispatch };
