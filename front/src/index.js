import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
// scroll bar
// import 'simplebar/src/simplebar.css';

// third-party
import { Provider as ReduxProvider } from 'react-redux'

// apex-chart
// import 'assets/third-party/apex-chart.css';

// project import
import App from './App'
import { store } from './store'
// import reportWebVitals from './reportWebVitals';

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

const root = ReactDOM.createRoot(document.getElementById('container'))
root.render(
    <StrictMode>
        <ReduxProvider store={store}>
            <BrowserRouter basename="/tools">
                <App />
            </BrowserRouter>
        </ReduxProvider>
    </StrictMode>
)

// import React from "react";
// import ReactDOM from "react-dom/client";

// import store from './store'
// import { Provider } from "react-redux";

// // import './global.css'
// import './global.css'
// import './index.css'

// import App from './App'

// // StrictMode renders components twice (on dev but not production) in order to detect any problems with your code and warn you about them (which can be quite useful).
// const root = ReactDOM.createRoot(document.getElementById("container"));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );
