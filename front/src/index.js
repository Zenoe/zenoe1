// import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
// scroll bar
// import 'simplebar/src/simplebar.css';

// third-party
import { Provider as ReduxProvider } from 'react-redux'

// import 'assets/third-party/apex-chart.css';

import App from './App'
import { store } from './store'
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('container'))
root.render(
  // <StrictMode>
        <ReduxProvider store={store}>
            <BrowserRouter basename="/tools">
                <App />
            </BrowserRouter>
        </ReduxProvider>
  // </StrictMode>
)

// import store from './store'
// import { Provider } from "react-redux";

// import './global.css'
// import './index.css'

// // StrictMode renders components twice (on dev but not production) in order to detect any problems with your code and warn you about them (which can be quite useful).
// const root = ReactDOM.createRoot(document.getElementById("container"));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );
