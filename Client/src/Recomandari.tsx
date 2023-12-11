import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import './Recomandari.css';

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
          withCredentials: true,
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
  }, []);

  return (
    <div className="recomandari-container">
      <div className="recomandari-background-container">
      <div className="recomandari-background-image"></div>
    </div>
      <Header />
      <div className="recomandari-content">
        <h1 className="text-3xl pb-20" style={{ fontWeight: 'bold', color: '#e5e5cb' }}>
          Recomandari
        </h1>
        <ul className="recomandari-list">
          {recommendedBooks.map((book) => (
            <li key={book.ID} className="recomandari-book">
              <p>Nume: {book.name}</p>
              <p>Autor: {book.author}</p>
              <p>Gen: {book.genre}</p>
              <p>Descriere: {book.description}</p>
            </li>
          ))}
        </ul>
      </div>
      </div>
  );
};

export default Recomandari;