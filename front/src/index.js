import React from "react";
import ReactDOM from "react-dom/client";

import store from './store'
import { Provider } from "react-redux";

// import './global.css'
import './global.css'
import './index.css'

import App from './App'

// StrictMode renders components twice (on dev but not production) in order to detect any problems with your code and warn you about them (which can be quite useful).
const root = ReactDOM.createRoot(document.getElementById("container"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
