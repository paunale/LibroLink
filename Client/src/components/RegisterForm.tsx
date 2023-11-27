import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [prenume, setPrenume] = useState('');
  const [nume, setNume] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3002/register', {
        prenume,
        nume,
        email,
        password,
      });

      console.log(response.data);

      if (response.status === 200 && response.data.success) {
        // Redirect to the desired page upon successful registration
        navigate('/Meniu'); // Replace '/dashboard' with your desired route
      } else {
        // Handle other cases, e.g., show an error message
        console.error('Registration failed:', response.data.message);
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="items-center">
      <form className="text-center">
        <div className="py-2">
          <input
            type="text"
            id="prenume"
            name="prenume"
            placeholder="Prenume"
            onChange={(e) => setPrenume(e.target.value)}
            className="bg-[#E5E5CB] text-center rounded-full"
          />
        </div>
        <div className="py-2">
          <input
            type="text"
            id="nume"
            name="nume"
            placeholder="Nume"
            onChange={(e) => setNume(e.target.value)}
            className="bg-[#E5E5CB] text-center rounded-full"
          />
        </div>
        <div className="py-2">
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#E5E5CB] text-center rounded-full"
          />
        </div>
        <div className="py-2">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Parola"
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#E5E5CB] text-center rounded-full"
          />
        </div>
        <div>
          <button className="text-center py-2 text-l" type="button" onClick={handleRegister}>
            Creeaza cont
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
