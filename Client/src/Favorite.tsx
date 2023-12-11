import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import './Favorite.css';

interface Book {
  ID: number;
  name: string;
  author: string;
  genre: string;
  description: string;
  num_reviews: number;
  isFavorite: boolean;
}

interface BookResponse {
  success: boolean;
  book: Book;
}


const checkAuthentication = async () => {
  try {
    const response = await axios.get(`http://localhost:3002/check-session`, { withCredentials: true });
    return response.data.loggedIn;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

const Favorite: React.FC = () => {
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFavoriteBooks = async () => {
      try {
        const isAuthenticated = await checkAuthentication();
        if (!isAuthenticated) {
          // Handle unauthorized action or redirect to login
          // For example, you can set a state to redirect to the login page
          return;
        }

        const response = await axios.get<number[]>(`http://localhost:3002/favorite-books`, {
          withCredentials: true,
        });

        const bookRequests = response.data.map(async (bookID) => {
          const bookResponse = await axios.get<BookResponse>(`http://localhost:3002/books/${bookID}`, {
            withCredentials: true,
          });
          return bookResponse.data.book; // Extract 'book' from the response
        });

        const booksData = await Promise.all(bookRequests);
        setFavoriteBooks(booksData);
      } catch (error) {
        console.error('Error fetching favorite books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteBooks();
  }, []);


  if (loading) {
    return <p>Loading...</p>;
  }

  return (
      <div className="favorite-container">
      <div className="favorite-background-image"></div>
      <div className="favorite-content">
      <Header />
      <h1 className="text-3xl pb-20" style={{ fontWeight: 'bold', color: '#e5e5cb' }}>
          Lista de favorite
        </h1>
      {favoriteBooks.length > 0 ? (
  favoriteBooks.map((book, index) => (
    <div key={`${book?.ID}-${index}`} className="mb-4">
      {book && (
        <div className="mb-4 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2 scris-carte">{book.name}</h1>
            <p className="text-lg">
              <span className="font-bold">Autor:</span> {book.author}
            </p>
          </div>
          {/* Add favorite button logic here */}
        </div>
      )}
      {book && (
        <>
          <div className="mb-4">
            <p className="text-lg">
              <span className="font-bold">Gen:</span> {book.genre}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-lg">
              <span className="font-bold">Descriere:</span> {book.description}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-lg">
              <span className="font-bold">Numar reviews:</span> {book.num_reviews}
            </p>
          </div>
        </>
      )}
    </div>
  ))
) : (
  <p>Nu ai cărți favorite</p>
)}

      </div>
      </div>
  );
};

export default Favorite;
