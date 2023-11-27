import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from './components/Header';
import { useState } from 'react';
import RegisterForm from './components/RegisterForm';
type Props = {}


function Inregistrare({}: Props) {
  return (
    <div className="h-screen bg-[#D5CEA3]">
      <div className="relative flex flex-col justify-between gap-y-2 top-44 items-center">
          <h1 className="text-3xl pb-3 text-center" style={{ fontWeight: 'bold' }}>LibroLink</h1>
          <RegisterForm/>
      </div>
    </div>
  );
}

export default Inregistrare;