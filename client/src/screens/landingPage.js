import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';
import { userLogin } from '../actions/userAction';

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

  const [username, setUsername] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (username) {
      console.log('username:', username);
      dispatch(userLogin({username}, navigate, setAuthUser));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Enter your username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center w-full">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Signin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LandingPage;