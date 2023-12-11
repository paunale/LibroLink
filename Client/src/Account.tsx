import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import './Account.css';

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
  'SF',
];

const Account: React.FC = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);


  const handleGenreSelection = (genre: string) => {
    // Toggle the selected genre
    const isSelected = selectedGenres.includes(genre);
    if (isSelected) {
      setSelectedGenres(selectedGenres.filter((selectedGenre) => selectedGenre !== genre));
    } else {
      if (selectedGenres.length < 3) {
        setSelectedGenres([...selectedGenres, genre]);
      } else {
        alert('You can select up to three genres.');
      }
    }
  };

  const handleSaveGenres = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3002/update-genres',
        {
          genres: selectedGenres,
        },
        { withCredentials: true }
      );
  
      if (response.data.success) {
        setSuccessMessage('Genurile au fost salvate cu succes!');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000); // Ascunde mesajul după 3 secunde
      } else {
        console.error('Error saving genres:', response.data.message);
      }
    } catch (error) {
      console.error('Error saving genres:', error);
    }
  };
  

  return (
    <div className="account-container">
      <div className="account-background-image"></div>
      <div className="account-blur-overlay"></div>
      <div className="account-box">
        <Header />
        <div className="account-content">
          <h1>Selecteaza genurile de cărți preferate (maxim 3)</h1>
          <ul className="genres-list">
            {genres.map((genre) => (
              <li key={genre}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(genre)}
                    onChange={() => handleGenreSelection(genre)}
                  />
                  {genre}
                </label>
              </li>
            ))}
          </ul>
          <div className="save-button-container">
            <button className="save-button" onClick={handleSaveGenres}>
              Salvare
            </button>
            <div className="account-content">
             {successMessage && <p className="success-message">{successMessage}</p>}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
