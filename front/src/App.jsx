import React from 'react';
import ReactDOM from "react-dom/client";
import CssBaseline from '@material-ui/core/CssBaseline'
import Store from '@/store'


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
import Login from './pages/Login';
import WordCount from './pages/WordCount';
import WordCountChart from './pages/WordCountChart';
import ProtectedRoute from './pages/ProtectedRoute';
import SharedProductLayout from './pages/SharedProductLayout';

const App=()=>{
  const [user, setUser] = useState(null);

  return (
    <Store>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />

            <Route path='products' element={<SharedProductLayout />}>
              <Route index element={<Products />} />
              <Route path=':productId' element={<SingleProduct />} />
            </Route>

            <Route path='login' element={<Login setUser={setUser}></Login>} />

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
            <Route path='*' element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Store>
  )
}

export default App;
