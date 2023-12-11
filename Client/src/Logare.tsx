import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import './Logare.css';

function Logare() {
  return (
    <div className="logare-container">
      <div className="background-image">
        <div className="login-box">
          <div>
            <Link to="/Meniu" className="logo">
              LibroLink
            </Link>
          </div>
          <div>
          <div className="login-content">
            <h1 className="title">Autentificare</h1>
            </div>
            <LoginForm />
          </div>
          <Link to="/Inregistrare">
            <button className="create-account-button">Creeaza un cont</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Logare;
