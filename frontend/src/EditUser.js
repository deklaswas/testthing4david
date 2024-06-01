import React, { useState } from 'react';
import axios from 'axios';

const EditUser = ( {FetchCallBack} ) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.put('http://localhost:3000/api/users', { name, email });
    console.log(response.data);
    setName('');
    setEmail('');
    FetchCallBack();
  };

  return (
    <div>
      <h2>Edit Username (via email)</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Current Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>New Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <button type="submit">Edit User</button>
      </form>
    </div>
  );
};

export default EditUser;