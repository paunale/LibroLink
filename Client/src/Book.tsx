import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from './components/Header';

interface Book {
  ID: number;
  name: string;
  author: string;
  genre: string;
  description: string;
  num_reviews: number;
}

interface BookResponse {
  success: boolean;
  message: string;
  book: Book;
}

const Book: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [reviewText, setReviewText] = useState<string>('');
  const [rating, setRating] = useState<number | null>(null);
  const [submittingReview, setSubmittingReview] = useState<boolean>(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get<BookResponse>(`http://localhost:3002/books/${bookId}`);

        console.log('Response:', response); // Log the response for debugging

        if (response.data && response.data.success) {
          setBook(response.data.book);
        } else {
          console.error('Error fetching book:', response.data.message);
          setBook(null); // Set book to null in case of an error
        }
      } catch (error) {
        console.error('Error fetching book:', error);
        setBook(null); // Set book to null in case of an error
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  const handleReviewSubmit = async () => {
    if (!reviewText || rating === null || submittingReview) {
      return;
    }

    try {
      setSubmittingReview(true);
      // Make a request to your API to submit the review
      await axios.post(`http://localhost:3002/makereview/${bookId}`, { text: reviewText, rating });
      console.log('Review submitted successfully!');
      // You may want to fetch the book data again to update the number of reviews
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setSubmittingReview(false);
      setReviewText('');
      setRating(null);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-[#D5CEA3] h-screen">
      <Header />
      <div className="relative flex flex-col justify-between gap-y-2 top-28 items-center">
        <div>
          {book ? (
            <>
              <h1 className="text-xl" style={{ fontWeight: 'bold' }}>{book.name}</h1>
              <p>Autor: {book.author}</p>
              <p>Gen: {book.genre}</p>
              <p>Descriere: {book.description}</p>
              <p>Numar reviews: {book.num_reviews}</p>
            </>
          ) : (
            <p>Error loading book.</p>
          )}
        </div>
        <div className="flex flex-col items-center justify-center space-y-2">
          <h2 className="text-lg" style={{ fontWeight: 'bold' }}>Post a Review</h2>
          <div>
            <label htmlFor="rating">Rating (0-10):  </label>
            <input
              type="number"
              id="rating"
              min="0"
              max="10"
              value={rating !== null ? rating : ''}
              onChange={(e) => setRating(parseInt(e.target.value, 10))}
              className="bg-inherit border-black border rounded-full text-center"
            />
          </div>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here..."
            rows={4}
            cols={50}
            className="rounded-full text-center"
          />
          <button onClick={handleReviewSubmit} disabled={submittingReview}>
            {submittingReview ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Book;
