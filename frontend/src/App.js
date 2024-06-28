import UserList from './UserList';
import AddUser from './AddUser';
import EditUser from './EditUser';
import { useEffect, useState, createContext } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';



function App() {
  
const [users, setUsers] = useState([]);
const [renderModalAdd, setRenderModalAdd] = useState(false)
const [renderModalEdit, setRenderModalEdit] = useState(false)

const fetchUsers = async () => {
  const token = localStorage.getItem("authToken");
  const headers = { 'Authorization': 'Bearer '+token };

  const response = await axios.get('159.89.239.40:3000/api/users', {headers});
  setUsers(response.data);
};

const [editID, setEditID] = useState(0);
const [editName, setEditName] = useState("");
const [editEmail, setEditEmail] = useState("");
const showEditUsers = async (ID, name, email) => {
  setRenderModalEdit(true);
  setRenderModalAdd(false);
  setEditID(ID);
  setEditName(name);
  setEditEmail(email);

  console.log(name)
  console.log(ID)
  console.log(email)
};



useEffect(() => {
  fetchUsers();
}, []);



  return (
    <Container >
      <header className="App-header">
        <p>

          <h2>Database</h2>
          
          <Button
            variant="contained"
            type="submit"
            color="primary"
            size="large"
            onClick={ ()=> {
              setRenderModalAdd( renderModalAdd => !renderModalAdd );
              setRenderModalEdit(false);
            }}
          >Add User</Button>


          <listContext.Provider value={users}>
          <UserList FetchCallBack={fetchUsers} editCallBack={showEditUsers}></UserList>
          </listContext.Provider>

          {renderModalAdd && <AddUser  FetchCallBack={fetchUsers}></AddUser>}
          
          <editContext.Provider value={editID}>
          {renderModalEdit && <EditUser FetchCallBack={fetchUsers} OriginalName={editName} OriginalEmail={editEmail} ></EditUser>}
          </editContext.Provider>

        </p>
      </header>
    </Container>
  );
}

export const listContext = createContext();
export const editContext = createContext();
export default App;
