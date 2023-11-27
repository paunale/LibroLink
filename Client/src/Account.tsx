import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';

const genres = [
  'Copii',
  'Poezie',
  'Crestinism',
  'Gatit',
  'Fictiune',
  'Istorice',
  'Horror',
  'Mister',
  'Romane',
  'Tineri',
];

const Account: React.FC = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

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
      const response = await axios.post('http://localhost:3002/update-genres', {
        genres: selectedGenres,
      }, {withCredentials: true});

      if (response.data.success) {
        console.log('Genres saved successfully!');
      } else {
        console.error('Error saving genres:', response.data.message);
      }
    } catch (error) {
      console.error('Error saving genres:', error);
    }
  };

  return (
    <div className="h-screen bg-[#D5CEA3]">
      <Header />
      <div className="flex relative top-12 flex-col items-center justify-center">
        <div className="relative flex flex-col justify-between gap-y-2 top-7 items-center">
            <h1>Selecteaza genurile de carti preferate (maxim 3)</h1>
        </div>
        <ul>
        <div className="relative flex flex-col justify-between gap-y-2 top-12 items-center">
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
        </div>
        </ul>
        <div className="relative flex flex-col justify-between gap-y-2 top-20 items-center">
        <div className="text-center py-2 px-14 bg-[#E5E5CB] rounded-full">
        <button onClick={handleSaveGenres}>Salvare</button>
        </div>
        </div>
    </div>
    </div>
  );
};

export default Account;
