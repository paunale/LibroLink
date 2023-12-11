import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import './Adaugare.css';

const Adaugare: React.FC = () => {
  const [bookData, setBookData] = useState({
    name: '',
    author: '',
    genre: '',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const handleAddBook = async () => {
    try {
      const response = await axios.post('http://localhost:3002/add-book', bookData);

      if (response.data.success) {
        setSuccessMessage('Cartea a fost adăugată cu succes!');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000); // Ascunde mesajul după 3 secunde
      } else {
        console.error('Error adding book:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className="adaugare-container">
      <div className="adaugare-background-image"></div>
      <div className="adaugare-content">
        <Header />
        <h2 className="text-3xl pb-12 font-bold scris-titlu">Adauga o carte</h2>
        <div className="flex flex-col justify-between gap-y-2 top-3 items-center scris-titlu">
          <label>Nume carte:</label>
          <input
            className="adaugare-input"
            type="text"
            name="name"
            value={bookData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col justify-between gap-y-2 top-3 items-center scris-titlu">
          <label>Autor:</label>
          <input
            className="adaugare-input"
            type="text"
            name="author"
            value={bookData.author}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col justify-between gap-y-2 top-3 items-center scris-titlu">
          <label>Gen:</label>
          <input
            className="adaugare-input"
            type="text"
            name="genre"
            value={bookData.genre}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col justify-between gap-y-2 top-3 items-center scris-titlu">
          <label>Descriere:</label>
          <textarea
            className="adaugare-input"
            name="description"
            value={bookData.description}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleAddBook} className='adaugare-button relative top-4'>Adaugare</button>
        <div className="adaugare-content">
          {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default Adaugare;
