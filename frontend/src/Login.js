
import { useState, } from 'react';
import axios from 'axios';

import React from 'react';
import {useNavigate} from 'react-router-dom';

import './Login.css';



function Login() {
  const [name, setName] = useState('');
  const [password, setpassword] = useState('');
  const [errorMessage, setError] = useState('');
  const [authToken, setToken] = useState('');

  const homePageNavigator = useNavigate('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:3000/api/login', { name, password });
    console.log(response.data);

    const token=response.data.accessToken
    console.log(token);
    setError("Loading...")
    setName('');
    setpassword('');

    if (response.data === 'error') setError("Incorrect Username or Password"); else {

      localStorage.setItem("authToken", token);
      const tokenTest = localStorage.getItem("authToken");
      console.log(tokenTest);

      setToken(token)
      homePageNavigator("/homepage")
    }
    

    //console.log(errorMessage)
  };

  return (
    <div className="Login">
      <h2 className="Login-header">Login
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username </label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label>Password </label>
            <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} required />
          </div>
          <button type="submit">Login</button>
        </form>
        {errorMessage}
      </h2>
    </div>
  );
};

export default Login;
