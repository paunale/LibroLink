import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';

type Book = {
  ID: number;
  name: string;
  author: string;
  genre: string;
  description: string;
  num_reviews: number;
};

const Recomandari: React.FC = () => {
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchRecommendedBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3002/recommended-books', {
          withCredentials: true, // Include credentials (cookies) with the request
        });

        if (response.data.success) {
          setRecommendedBooks(response.data.books);
        } else {
          console.error('Error fetching recommended books:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching recommended books:', error);
      }
    };

    fetchRecommendedBooks();
  }, []); // Run the effect only once when the component mounts

  return (
    <div className="h-screen bg-[#D5CEA3]">
      <Header />
      <div className="relative flex flex-col justify-between gap-y-2 top-32 items-center">
        <div>
          <h1 className="text-3xl pb-3" style={{ fontWeight: 'bold' }}>
            Recomandari
          </h1>
        </div>
        <div>
          <ul className="flex flex-col space-y-4">
            {recommendedBooks.map((book) => (
              <li key={book.ID}>
                <p>Name: {book.name}</p>
                <p>Author: {book.author}</p>
                <p>Genre: {book.genre}</p>
                <p>Description: {book.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Recomandari;
