import React from 'react';
import RegisterForm from './components/RegisterForm';
import './Inregistrare.css'; // Asigură-te că ai importat fișierul CSS

const Inregistrare = () => {
  return (
    <div className="register-container">
      <div className="register-background-image"></div>
      <div className="blur-overlay"></div>
      <div className="register-box">
        <h1 className="logo">LibroLink</h1>
        <div className="register-content">
          <h2 className="title scris-ing">Creează-ți cont</h2>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Inregistrare;
