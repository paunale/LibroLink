import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Link } from 'react-router-dom';
import Header from './components/Header';
import './Meniu.css';
type Props = {} 

const Meniu = () => {
  return (
    <div className="meniu-container">
      <div className="meniu-background-image"></div>
      <div className="meniu-content">
        <Header/>
        <h1 className="text-3xl pb-10 scris-titlu" style={{ fontWeight: 'bold' }}>
          Bine ati venit!
        </h1>
            <div>
            <Link to="/GenuriExperiment">
              <button className="text-center py-2 px-12 bg-[#3c2a21] rounded-full scris-titlu">Genuri de carti</button>
              </Link>
            </div>
            <div>
            <Link to="/Favorite">
              <button className="text-center py-2 px-12 bg-[#3c2a21] rounded-full scris-titlu">Lista de favorite</button>
              </Link>
            </div>
            <div>
              <Link to="/Maitarziu">
              <button className="text-center py-2 px-11 bg-[#3c2a21] rounded-full scris-titlu">Citeste mai tarziu</button>
              </Link>
            </div>
            <div>
            <Link to="/Cautare">
              <button className="text-center py-2 px-14 bg-[#3c2a21] rounded-full scris-titlu">Cauta o carte</button>
              </Link>
            </div>
            <div>
            <Link to="/Adaugare">
              <button className="text-center py-2 px-12 bg-[#3c2a21] rounded-full scris-titlu">Adauga o carte</button>
              </Link>
            </div>
            <div>
            <Link to="/Recomandari">
              <button className="text-center py-2 px-14 bg-[#3c2a21] rounded-full scris-titlu">Recomandari</button>
              </Link>
            </div>
          </div>
      </div>
  )
}

export default Meniu