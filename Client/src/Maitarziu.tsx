import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import './MaiTarziu.css';

type Book = {
  ID: number;
  name: string;
  author: string;
  genre: string;
  description: string;
  num_reviews: number;
};

interface BookResponse {
  success: boolean;
  book: Book;
}

type MaitarziuProps = {};

function Maitarziu({}: MaitarziuProps) {
  const [readLaterBooks, setReadLaterBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch "Citeste Mai Tarziu" books from the server
    const fetchReadLaterBooks = async () => {
      try {
        const response = await axios.get<number[]>(`http://localhost:3002/read-later-books`, {
          withCredentials: true,
        });

        const bookRequests = response.data.map(async (bookID) => {
          const bookResponse = await axios.get<BookResponse>(`http://localhost:3002/books/${bookID}`, {
            withCredentials: true,
          });
          return bookResponse.data.book;
        });

        const booksData = await Promise.all(bookRequests);
        setReadLaterBooks(booksData);
      } catch (error) {
        console.error('Error fetching "Citeste Mai Tarziu" books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReadLaterBooks();
  }, []);

  const handleRemoveFromReadLater = async (bookId: number) => {
    try {
      const response = await axios.post(
        'http://localhost:3002/update-read-later-books',
        { bookId, action: 'remove' },
        { withCredentials: true }
      );

      if (response.data.success) {
        // Update the local state after successful removal
        setReadLaterBooks((prevBooks) => prevBooks.filter((book) => book.ID !== bookId));
      } else {
        console.error('Failed to remove book from "Citeste Mai Tarziu".');
      }
    } catch (error) {
      console.error('Error removing book from "Citeste Mai Tarziu":', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="maitarziu-container">
      <div className="maitarziu-background-image"></div>
      <div className="maitarziu-content">
        <Header />
        <div className="relative flex flex-col justify-between gap-y-2 top-32 items-center">
          <div>
            <h1 className="text-3xl pb-3" style={{ fontWeight: 'bold' }}>
              Citeste mai tarziu
            </h1>
            {readLaterBooks.length > 0 ? (
              <ul>
                {readLaterBooks.map((book) => (
                  <li key={book.ID}>
                    {book.name}{' '}
                    <button onClick={() => handleRemoveFromReadLater(book.ID)}>Remove</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nu ai cărți pentru "Citeste Mai Tarziu"</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Maitarziu;
