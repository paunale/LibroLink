import React from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import Home from './Home';
import Inregistrare from './Inregistrare';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Favorite from './Favorite';
import Logare from './Logare';
import Meniu from './Meniu';
import Maitarziu from './Maitarziu';
import Cautare from './Cautare';
import Adaugare from './Adaugare';
import Recomandari from './Recomandari';
import Genuri from './Genuri';
import GenuriExperiment from './GenuriExperiment';
import Book from './Book';
import Account from './Account';


function App() {
  return (
    <BrowserRouter><Routes><Route path="/Inregistrare" element={<Inregistrare/>}></Route>
    <Route path="/Favorite" element={<Favorite/>}></Route>
    <Route path="/Logare" element={<Logare/>}></Route>
    <Route index element={<Logare/>}></Route>
    <Route path="/Home" element={<Home/>}></Route>
    <Route path="/Meniu" element={<Meniu/>}></Route>
    <Route path="Maitarziu" element={<Maitarziu/>}></Route>
    <Route path="Cautare" element={<Cautare/>}></Route>
    <Route path="Adaugare" element={<Adaugare/>}></Route>
    <Route path="Recomandari" element={<Recomandari/>}></Route>
    <Route path="Genuri" element={<Genuri/>}></Route>
    <Route path="GenuriExperiment" element={<GenuriExperiment/>}></Route>
    <Route
          path="/Book/:bookId"
          element={<Book />}
        ></Route>
    <Route path="Account" element={<Account/>}></Route>
    </Routes>
    </BrowserRouter>
    
    
  );
}

export default App;
