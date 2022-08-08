import React, {useEffect} from 'react';
import ReactDOM from "react-dom/client";

import { useSelector } from "react-redux";

import { ThemeProvider } from '@mui/material/styles';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Error from './pages/Error';
import SharedLayout from './pages/SharedLayout';
import SingleProduct from './pages/SingleProduct';
import Dashboard from './pages/Dashboard';
import Login from './pages/users/Login';
import Logout from './pages/users/Logout';
import Register from './pages/users/Register';
import WordCount from './pages/WordCount';
import WordCountChart from './pages/WordCountChart';
import ProtectedRoute from './pages/ProtectedRoute';
import SharedProductLayout from './pages/SharedProductLayout';

import MyNotes from './pages/notes/MyNotes';
import { IntlProvider } from 'react-intl';

import muiTheme from './theme'
import IdleTimer from  '@/components/logic/IdleTimer'

const App=()=>{
  const [user, setUser] = useState(null);
  const [isTimeout, setIsTimeout] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);

  useEffect(() => {
    if(userLogin.userInfo){
      console.log('startIdleTimer', userLogin);
      const timer = new IdleTimer({
        // expire after x seconds
        // timeout: 3,
        timeout: 3600,
        onTimeout: () => {
          setIsTimeout(true);
          window.location.href='/logout'
        }
      });

      return () => {
        timer.cleanUp();
      };
    }
  }, [userLogin]);

  return (
    <ThemeProvider theme={muiTheme}>
      <IntlProvider locale="en" messages={{}}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<SharedLayout />}>
              <Route index element={<Home />} />
              <Route path='about' element={<About />} />
              <Route path='products' element={<SharedProductLayout />}>
                <Route index element={<Products />} />
                <Route path=':productId' element={<SingleProduct />} />
              </Route>

              <Route path='wordcount' element={<WordCount />} />
              <Route path='wordcount/:fileName' element={<WordCountChart />} />
              <Route
                path='dashboard'
                element={
                  <ProtectedRoute user={user}>
                    <Dashboard user={user} />
                  </ProtectedRoute>
                }
              />

              <Route path='/login' element={<Login />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/register' element={<Register />} />

              <Route path='/mynotes' element={<MyNotes />} />
              <Route path='*' element={<Error />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </IntlProvider>
    </ThemeProvider>
  )
}

export default App;
