import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import './Genuri.css';

interface Book {
  ID: number;
  name: string;
  author: string;
  genre: string;
  description: string;
  num_reviews: number;
}

interface ApiResponse {
  success: boolean;
  books?: Book[];
  message?: string;
}

const Genuri: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooksByGenre = async () => {
      try {
        const response = await axios.get<ApiResponse>(`http://localhost:3002/books?genre=${selectedGenre}`);

        if (response.data.success) {
          setBooks(response.data.books || []);
        } else {
          console.error('Error fetching books:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    if (selectedGenre) {
      fetchBooksByGenre();
    }
  }, [selectedGenre]);

  const genres = [
    'Copii',
    'Poezie',
    'Afaceri',
    'Gatit',
    'Fictiune',
    'Istorice',
    'Horror',
    'Mister',
    'Romane',
    'Tineri',
    'Romantice',
    'SF'
  ];

  const chunkArray = (array: string[], size: number) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  };

  const chunkedGenres = chunkArray(genres, 4);

  return (
    <div className="genuri-container">
      <div className="genuri-background-image"></div>
      <div className="genuri-content">
      <Header/>
        <h1 className="text-3xl pb-16 font-bold scris-titlu">Genuri de carti</h1>
        {chunkedGenres.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-x-4 top-10">
            {row.map((genre) => (
              <button
                key={genre}
                className={`genuri-button ${selectedGenre === genre ? 'selected' : ''}`}
                onClick={() => setSelectedGenre(genre)}
              >
                <span>{genre}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
      {selectedGenre && (
        <div className="h-screen flex relative flex-col items-center justify-start">
          <div className="relative top-24">
            <div className="relative flex flex-row gap-y-2 items-center justify-center">
              <div className="relative flex flex-col items-center text-center justify-center w-24 h-24 bg-[#D5CEA3] rounded-full">
                <h2 className="text-xl " style={{ fontWeight: 'bold' }}>{selectedGenre}</h2>
              </div>
            </div>
            <table className="genuri-books-table">
              <thead>
                <tr className="flex flex-row space-x-56 justify-between">
                  <th >Nume carte</th>
                  <th >Autor</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.ID} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">
                      <Link to={`/Book/${book.ID}`}>
                        <div className="font-bold">{book.name}</div>
                      </Link>
                    </td>
                    <td className="py-2 px-4 border-b">{book.author}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Genuri;
