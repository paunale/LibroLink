import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from './components/Header';
import './Book.css';

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
  message: string;
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

const Book: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [reviewText, setReviewText] = useState<string>('');
  const [rating, setRating] = useState<number | null>(null);
  const [submittingReview, setSubmittingReview] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isReadLater, setIsReadLater] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get<BookResponse>(`http://localhost:3002/books/${bookId}`);
  
        if (response.data && response.data.success) {
          setBook(response.data.book);
  
          // Check user authentication status
          const isAuthenticated = await checkAuthentication();
          setIsAuthenticated(isAuthenticated);
  
          // Fetch the user's favorite books
          const favoriteBooksResponse = await axios.get<number[]>(`http://localhost:3002/favorite-books`, {
            withCredentials: true,
          });
  
          // Check if the current book is in the user's favorite books
          const isBookInFavorites = favoriteBooksResponse.data.includes(response.data.book.ID);
          
          // Set isFavorite based on whether the book is in the user's favorite books
          setIsFavorite(isBookInFavorites);

          // Fetch the user's "Citeste Mai Tarziu" books
          const readLaterBooksResponse = await axios.get<number[]>(`http://localhost:3002/late-books`, {
            withCredentials: true,
          });

          // Check if the current book is in the user's "Citeste Mai Tarziu" books
          const isBookInReadLater = readLaterBooksResponse.data.includes(response.data.book.ID);

          // Set isReadLater based on whether the book is in the user's "Citeste Mai Tarziu" books
          setIsReadLater(isBookInReadLater);
  
          // Fetch reviews for the book
          try{
          const reviewsResponse = await axios.get(`http://localhost:3002/reviews/${bookId}`);
          setReviews(reviewsResponse.data.reviews);
          }
          catch(error) {
            console.error('Cartea nu are review-uri');
          }
        } else {
          console.error('Error fetching book:', response.data.message);
          setBook(null);
        }
      } catch (error) {
        console.error('Error fetching book:', error);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  const handleToggleFavorite = async () => {
    try {
      const isAuthenticated = await checkAuthentication();
      if (!isAuthenticated) {
        // Handle unauthorized action or redirect to login
        return;
      }

      await axios.post(`http://localhost:3002/update-favorite-books`, {
        bookId: book?.ID,
        action: isFavorite ? 'remove' : 'add',
      }, { withCredentials: true });

      const response = await axios.get(`http://localhost:3002/favorite-books`, { withCredentials: true });
      setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleToggleReadLater = async () => {
    try {
      const isAuthenticated = await checkAuthentication();
      if (!isAuthenticated) {
        // Handle unauthorized action or redirect to login
        return;
      }

      await axios.post(`http://localhost:3002/update-late-books`, {
        bookId: book?.ID,
        action: isReadLater ? 'remove' : 'add',
      }, { withCredentials: true });

      setIsReadLater((prevIsReadLater) => !prevIsReadLater);
    } catch (error) {
      console.error('Error toggling "Citeste Mai Tarziu":', error);
    }
  };
  
  const handleReviewSubmit = async () => {
    try {
      const isAuthenticated = await checkAuthentication();
      if (!isAuthenticated) {
        // Handle unauthorized action or redirect to login
        return;
      }

      await axios.post(`http://localhost:3002/makereview/${bookId}`, { text: reviewText, rating }, { withCredentials: true });
      try{
        const reviewsResponse = await axios.get(`http://localhost:3002/reviews/${bookId}`);
        setReviews(reviewsResponse.data.reviews);
        }
        catch(error) {
          console.error('Cartea nu are review-uri');
        }
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      // Reset review state
    }
  };

  useEffect(() => {
    // Calculate average rating from reviews
    const calculateAverageRating = () => {
      if (reviews.length > 0) {
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const avgRating = totalRating / reviews.length;
        setAverageRating(avgRating);
      } else {
        setAverageRating(null);
      }
    };

    // Call the function to calculate average rating
    calculateAverageRating();
  }, [reviews]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-[#D5CEA3] h-[100%]">
      <Header />
      <div className="container mx-auto px-4 py-8 book-content">
        {book ? (
          <>
            <div className="mb-4 flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold mb-2 scris-carte">{book.name}</h1>
                <p className="text-lg">
                  <span className="font-bold">Autor:</span> {book.author}
                </p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handleToggleFavorite}
                  className={`bg-[#3c2a21] text-white py-2 px-4 rounded-full ${isFavorite ? 'bg-red-500' : ''}`}
                >
                  {isFavorite ? 'În Favorite' : 'Adaugă la Favorite'}
                </button>
                <button
                  onClick={handleToggleReadLater}
                  className={`bg-[#3c2a21] text-white py-2 px-4 rounded-full ${isReadLater ? 'bg-red-500' : ''}`}
                >
                  {isReadLater ? 'În Citeste Mai Tarziu' : 'Adaugă la Citeste Mai Tarziu'}
                </button>
              </div>
            </div>
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
        ) : (
          <p>Eroare la încărcare</p>
        )}

{averageRating !== null && (
          <div className="mt-8">
            <p className="text-2xl font-bold mb-4">Medie review-uri: {averageRating.toFixed(2)}</p>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Adaugă un review</h2>
          <div className="mb-4">
            <label htmlFor="rating" className="block text-lg font-bold">
              Rating (0-10):
            </label>
            <input
              type="number"
              id="rating"
              min="0"
              max="10"
              value={rating !== null ? rating : ''}
              onChange={(e) => setRating(parseInt(e.target.value, 10))}
              className="bg-inherit border-black border rounded-full text-center w-16 py-2"
            />
          </div>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Scrie un review aici"
            rows={4}
            className="rounded-lg border border-black p-2 w-full"
          />
          <button
            onClick={handleReviewSubmit}
            disabled={submittingReview}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full"
          >
            {submittingReview ? 'Se trimite...' : 'Trimite review'}
          </button>
        </div>
      </div>

      {reviews.length > 0 && (
        <div className="flex flex-col justify-center items-center text-center">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          <ul className="flex flex-col space-y-2">
            {reviews.map((review: any, index: number) => (
              <li key={index}>
                <p>Rating: {review.rating}</p>
                <p>Comment: {review.review_text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Book;
