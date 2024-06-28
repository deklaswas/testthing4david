
import { useState, } from 'react';
import axios from 'axios';

import React from 'react';
import {useNavigate} from 'react-router-dom';

import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';


export default function Login() {
  const [name, setName] = useState('');
  const [password, setpassword] = useState('');
  const [errorMessage, setError] = useState("");

  const homePageNavigator = useNavigate('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('159.89.239.40:5000/api/login', { name, password });
    //console.log(response.data);

    const token=response.data.accessToken
    setError("Loading...")
    setName('');
    setpassword('');

    if (response.data === 'error') setError("ERROR: Incorrect Username or Password"); else {
      localStorage.setItem("authToken", token);
      homePageNavigator("/homepage")
    }
  };

 

  return (
    <Container maxWidth="sm">
      <Typography variant="h2" color="primary"> <h2>Sign in</h2></Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3} >

          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            error={errorMessage!==""}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required 
            error={errorMessage!==""}
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            size="large"
          >Sign in</Button>

          <Typography 
            variant="overline"
            color="textSecondary"
          >{errorMessage}</Typography>

        </Stack>
      </form>
    </Container>
  );
};;
