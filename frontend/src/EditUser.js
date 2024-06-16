import React, { useState, useEffect } from 'react';
import {useContext} from 'react';

import { editContext } from "./App.js";

import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

const EditUser = ( {FetchCallBack, OriginalName, OriginalEmail } ) => {
  const editID = useContext(editContext);


  const [name, setName] = useState(OriginalName);
  const [email, setEmail] = useState(OriginalEmail);


  useEffect(() => {
    setName(OriginalName)
    setEmail(OriginalEmail)
  }, [editID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("authToken");
    const headers = { 'Authorization': 'Bearer '+token };

    const response = await axios.put('http://localhost:3000/api/users', { editID, name, email }, {headers});
    console.log(response.data);
    setName('');
    setEmail('');
    FetchCallBack();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Container maxWidth="sm">
          <h2>Edit User #{editID} {OriginalName} </h2>
          <Stack spacing={3} >
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              variant="contained"
              type="submit"
              color="primary"
            >Edit User</Button>
          </Stack>
        </Container>
      </form>
    </div>
  );
};

export default EditUser;