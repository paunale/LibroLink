import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Link } from 'react-router-dom';
import Header from './components/Header';
type Props = {} 

const Meniu = () => {
  return (
    <div className="h-screen bg-[#D5CEA3]">
      <Header/>
        <div className="relative flex flex-col justify-between gap-y-2 top-20 items-center">
          <div>
            <h1 className="text-3xl pb-10" style={{ fontWeight: 'bold' }}>Bine ati venit!</h1>
          </div>
            <div>
            <Link to="/GenuriExperiment">
              <button className="text-center py-2 px-12 bg-[#E5E5CB] rounded-full">Genuri de carti</button>
              </Link>
            </div>
            <div>
            <Link to="/Favorite">
              <button className="text-center py-2 px-12 bg-[#E5E5CB] rounded-full">Lista de favorite</button>
              </Link>
            </div>
            <div>
              <Link to="/Maitarziu">
              <button className="text-center py-2 px-11 bg-[#E5E5CB] rounded-full">Citeste mai tarziu</button>
              </Link>
            </div>
            <div>
            <Link to="/Cautare">
              <button className="text-center py-2 px-14 bg-[#E5E5CB] rounded-full">Cauta o carte</button>
              </Link>
            </div>
            <div>
            <Link to="/Adaugare">
              <button className="text-center py-2 px-12 bg-[#E5E5CB] rounded-full">Adauga o carte</button>
              </Link>
            </div>
            <div>
            <Link to="/Recomandari">
              <button className="text-center py-2 px-14 bg-[#E5E5CB] rounded-full">Recomandari</button>
              </Link>
            </div>
          </div>
      </div>
  )
}

export default Meniu