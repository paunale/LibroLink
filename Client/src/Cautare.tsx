import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './components/Header';

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
    <div className="h-screen bg-[#D5CEA3]">
      <div>
        <Header />
        <div className="relative flex flex-col justify-between gap-y-2 top-28 items-center">
          <div>
            <h1 className="text-3xl pb-16 font-bold">Cauta o carte</h1>
          </div>
          <div className="relative flex flex-col justify-between gap-y-2 top-3 items-center">
            <input
              className="text-center py-2 px-12 bg-[#E5E5CB] rounded-full"
              type="text"
              placeholder="Cautare"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="py-2 px-4 bg-[#E5E5CB] text-gray-500 rounded-full"
              onClick={handleSearch}
            >
              Cauta
            </button>
      <table className="flex flex-col items-center justify-center space-y-2">
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
    </div>
  );
};

export default Cautare;
