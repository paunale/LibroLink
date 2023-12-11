import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import './Cautare.css';

type Props = {};

interface Book {
  ID: number;
  name: string;
  author: string;
  genre: string;
  description: string;
  num_reviews: number;
}


const Cautare: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [books, setBooks] = useState<Book[]>([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/search?query=${searchQuery}`);
      if (response.data.success) {
        setBooks(response.data.books);
        console.log(response.data.books);
      } else {
        console.error('Error fetching books:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };
  

  return (
    <div className="cautare-container">
      <div className="cautare-background-image"></div>
      <div className="cautare-content">
        <Header />
        <h1 className="text-3xl pb-16 font-bold scris-titlu">Cauta o carte</h1>
        <div className="flex flex-col items-center gap-y-2">
          <input
            className="cautare-input"
            type="text"
            placeholder="Cautare"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="cautare-button"
            onClick={handleSearch}
          >
            Cauta
          </button>
      <table className="flex flex-col items-center justify-center space-y-2 cautare-books-table">
        <thead>
          <tr className="flex flex-row text-center justify-center space-x-2">
            <th>Nume carte</th>
            <th>Autor</th>
          </tr>
        </thead>
        <tbody>
        {books.map((book) => (
          <tr key={book.ID} className="flex flex-row text-center justify-center space-x-2">
           <td>
              <div>
              <Link to={`/Book/${book.ID}`}>{book.name}</Link>
              </div>
            </td>
           <td>{book.author}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
};

export default Cautare;
