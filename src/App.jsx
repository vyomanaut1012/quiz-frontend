import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import routes from './routes';
import SignIn from './components/pages/authentication/signIn/SignIn';
import SignUp from './components/pages/authentication/signUp/SignUp';

function App() {

  const adminId = localStorage.getItem('adminID');

  return (
    <div>
      <BrowserRouter>

        <Routes>
          {routes.map((data, index) => (
            <Route key={index} path={data.path} element={React.createElement(data.component)} />
          ))}
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
