import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    // Check if the user is logged in
    const axiosInstance = axios.create({ withCredentials: true });

    axiosInstance.get('http://localhost:3002/check-session')
      .then(response => {
        setLoggedIn(response.data.loggedIn);
      })
      .catch(error => {
        console.error('Error checking session:', error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false in all cases
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
    <div>
      <div className="relative flex flex-row justify-between top-5 mx-14 border-b-2 border-[#070707] pb-5">
        <div>
        <Link to="/Meniu"> <img src={logo} className="h-[50px] w-[100px]" alt="Logo"></img> </Link>
        </div>
        <div>
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
    </div>
  );
};

export default Header;
