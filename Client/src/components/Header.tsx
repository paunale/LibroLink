// Header.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const axiosInstance = axios.create({ withCredentials: true });

    axiosInstance.get('http://localhost:3002/check-session')
      .then(response => {
        setLoggedIn(response.data.loggedIn);
      })
      .catch(error => {
        console.error('Error checking session:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    try {
      const axiosInstance = axios.create({ withCredentials: true });

      const response = await axiosInstance.post('http://localhost:3002/logout');
      if (response.status === 200) {
        setLoggedIn(false);
        navigate('/Logare');
      } else {
        console.error('Logout failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="header-container">
      <div>
        <Link to="/Meniu" className="logo">
          <img src={logo} className="h-[50px] w-[100px]" alt="Logo" />
        </Link>
      </div>
      <div className="header-buttons">
        {loading ? (
          <p>Loading...</p>
        ) : (
          loggedIn ? (
            <>
              <Link to="/Account" className="text-2xl text-[#3C2A21]" style={{ fontWeight: 'bold' }}>Cont</Link>
              <button onClick={handleLogout} className="ml-4">Logout</button>
            </>
          ) : (
            <Link to="/Logare" className="text-2xl text-[#3C2A21]" style={{ fontWeight: 'bold' }}>Logare</Link>
          )
        )}
      </div>
    </div>
  );
};

export default Header;
