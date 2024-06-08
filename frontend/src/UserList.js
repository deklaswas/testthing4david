import React from 'react';
import {useContext} from 'react';
import axios from 'axios';

import { listContext } from "./App.js";

const UserList = ( {FetchCallBack} ) => {

  const users = useContext(listContext);
  console.log(users)

  
  const handleDelete = ID => async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("authToken");
    const headers = { 'Authorization': 'Bearer '+token };
    
    const response = await axios.delete('http://localhost:3000/api/users/'+ID, {headers} );
    console.log(response.data);
    FetchCallBack();
  };

  return (
    <div>
      <h2>User List</h2>
      <table>
          <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
          </tr>
          {users.map(user => {
              return (
                  <tr key={user.ID}>
                      <td>{user.ID}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <form onSubmit={handleDelete(user.ID)}>
                          <button type="submit">Delete</button>
                        </form>
                      </td>
                  </tr>
              )
          })}
      </table>
    </div>
  );
};

export default UserList;