import logo from './logo.svg';
import UserList from './UserList';
import AddUser from './AddUser';
import DeleteUser from './DeleteUser';
import EditUser from './EditUser';
import ShowUser from './ShowUser';
import { useEffect, useState, createContext } from 'react';
import axios from 'axios';

import './App.css';


function App() {
  
const [users, setUsers] = useState([]);
const [renderModal, setRenderModal] = useState(false)

const fetchUsers = async () => {
  const token = localStorage.getItem("authToken");
  const headers = { 'Authorization': 'Bearer '+token };

  const response = await axios.get('http://localhost:3000/api/users', {headers});
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

          <listContext.Provider value={users}>
          <UserList FetchCallBack={fetchUsers}></UserList>
          </listContext.Provider>

          <button onClick={ ()=> {
            setRenderModal( renderModal => !renderModal )
          } } >Add User</button>

          {renderModal && <AddUser  FetchCallBack={fetchUsers}></AddUser>}
          {renderModal && <EditUser FetchCallBack={fetchUsers}></EditUser>}
          

          
          <ShowUser FetchCallBack={fetchUsers}></ShowUser>

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

export const listContext = createContext();
export default App;
