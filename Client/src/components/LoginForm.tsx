import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3002/login',
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json', // Set content type to JSON
          },
        }
      );

      console.log('Login response:', response.data);

      if (response.status === 200 && response.data.success) {
        // Check user's login status after successful login
        const checkSessionResponse = await axios.get('http://localhost:3002/check-session', {
          withCredentials: true,
        });

        console.log('Check session response:', checkSessionResponse.data);

        if (checkSessionResponse.data.loggedIn) {
          // User is logged in, redirect to the desired page
          navigate('/Meniu');
        } else {
          // Handle the case where the user is not logged in
          console.error('Login failed:', 'User not logged in');
        }
      } else {
        // Handle other cases, e.g., show an error message
        console.error('Login failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="items-center">
      <form className="text-center">
        <div className="py-4">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#E5E5CB] text-center rounded-full"
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#E5E5CB] text-center rounded-full"
          />
        </div>
        <div>
          <button className="text-center py-2 text-l" type="button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
