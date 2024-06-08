import React, { useState } from 'react';
import axios from 'axios';

const AddUser = ( {FetchCallBack} ) => {


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("authToken");
    const headers = { 'Authorization': 'Bearer '+token };

    const response = await axios.post('http://localhost:3000/api/users', { name, email }, {headers});
    console.log(response.data);
    setName('');
    setEmail('');
    FetchCallBack();
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;