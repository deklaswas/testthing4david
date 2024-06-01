import React, { useState } from 'react';
import axios from 'axios';

const ShowUser = () => {
  const [users, setUsers] = useState([]);
    const [id, setID] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(id);
    const response = await axios.head('http://localhost:3000/api/users/'+id );
    console.log(response.data)
    setID('');
    setUsers(response.data);
  };


  return (
    <div>
      <h2>Show User by ID</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID:</label>
          <input type="text" value={id} onChange={(e) => setID(e.target.value)} required />
        </div>
        <button type="submit">Show User</button>
      </form>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
};

export default ShowUser;