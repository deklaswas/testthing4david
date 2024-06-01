import React, { useState } from 'react';
import axios from 'axios';

const DeleteUser = ( {FetchCallBack} ) => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    const response = await axios.delete('http://localhost:3000/api/users/'+email );
    console.log(response.data);
    setEmail('');
    FetchCallBack();
  };

  return (
    <div>
      <h2>Delete User (via email)</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit">Delete User</button>
      </form>
    </div>
  );
};

export default DeleteUser;