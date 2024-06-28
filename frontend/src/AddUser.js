import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

const AddUser = ( {FetchCallBack} ) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("authToken");
    const headers = { 'Authorization': 'Bearer '+token };

    const response = await axios.post('159.89.239.40:3000/api/users', { name, email }, {headers});
    console.log(response.data);
    setName('');
    setEmail('');
    FetchCallBack();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Container maxWidth="sm">
          <h2>Add User</h2>
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
            >Add User</Button>
          </Stack>
        </Container>
      </form>
    </div>
  );
};

export default AddUser;