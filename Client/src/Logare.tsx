import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import axios from 'axios';
import { useState } from 'react';


type Props = {}


function Logare({}: Props) {
  
  return (
    <div className="h-screen bg-[#D5CEA3]">
        <div className="relative flex flex-col justify-between top-48 items-center">
            <div>
                <Link to="/Meniu" className="text-4xl  text-[#3C2A21]" style={{ fontWeight: 'bold' }}>LibroLink</Link>
            </div>
            <div className="py-12 relative flex flex-col justify-evenly items-center">
                <h1 className="text-l">Autentificare</h1>
                <LoginForm/>
            </div>
            <Link to="/Inregistrare">
                    <button className="text-center py-2 px-2 bg-[#E5E5CB] rounded-full">Creeaza un cont</button>
            </Link>
        </div>

    </div>
  )
}

export default Logare