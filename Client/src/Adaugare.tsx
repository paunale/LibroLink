import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';

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

  const handleAddBook = async () => {
    try {
      const response = await axios.post('http://localhost:3002/add-book', bookData);

      if (response.data.success) {
        console.log('Book added successfully');
        // Optionally, you can redirect or perform other actions upon successful addition
      } else {
        console.error('Error adding book:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className="h-screen bg-[#D5CEA3]">
      <div>
        <Header />
        <div className="relative flex flex-col justify-between gap-y-2 top-12 items-center">
          <div>
            <h2 className="text-3xl pb-12 font-bold">Adauga o carte</h2>
          </div>
          <div className="relative flex flex-col justify-between gap-y-2 top-3 items-center">
            <label>Nume carte:</label>
            <input
              className="text-center py-2 px-12 bg-[#E5E5CB] rounded-full"
              type="text"
              name="name"
              value={bookData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="relative flex flex-col justify-between gap-y-2 top-3 items-center">
            <label>Autor:</label>
            <input
              className="text-center py-2 px-12 bg-[#E5E5CB] rounded-full"
              type="text"
              name="author"
              value={bookData.author}
              onChange={handleInputChange}
            />
          </div>
          <div className="relative flex flex-col justify-between gap-y-2 top-3 items-center">
            <label>Gen:</label>
            <input
              className="text-center py-2 px-12 bg-[#E5E5CB] rounded-full"
              type="text"
              name="genre"
              value={bookData.genre}
              onChange={handleInputChange}
            />
          </div>
          <div className="relative flex flex-col justify-between gap-y-2 top-3 items-center">
            <label>Descriere:</label>
            <textarea
              className="text-center py-2 px-12 bg-[#E5E5CB] rounded-full"
              name="description"
              value={bookData.description}
              onChange={handleInputChange}
            />
          </div>
          <button onClick={handleAddBook} className='relative top-4'>Adaugare</button>
        </div>
      </div>
    </div>
  );
};

export default Adaugare;
