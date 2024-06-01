import logo from './logo.svg';
import UserList from './UserList';
import AddUser from './AddUser';
import DeleteUser from './DeleteUser';
import EditUser from './EditUser';
import ShowUser from './ShowUser';
import { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';

function App() {
  
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:3000/api/users');
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          <UserList users={users}></UserList>
          <AddUser FetchCallBack={fetchUsers}></AddUser>

          <EditUser FetchCallBack={fetchUsers}></EditUser>
          <ShowUser></ShowUser>

          <DeleteUser FetchCallBack={fetchUsers}></DeleteUser>
          
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
