import React from 'react';
import {useContext} from 'react';
import axios from 'axios';

import { listContext } from "./App.js";

import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.disabledBackground ,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const UserList = ( {FetchCallBack, editCallBack} ) => {

  const users = useContext(listContext);
  
  const handleDelete = ID => async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("authToken");
    const headers = { 'Authorization': 'Bearer '+token };
    
    const response = await axios.delete('http://localhost:3000/api/users/'+ID, {headers} );
    FetchCallBack();
  };

  /*
  const handleSubmit = ID => async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("authToken");
    const headers = { 'Authorization': 'Bearer '+token };
    
    const response = await axios.put('http://localhost:3000/api/users',+ID, {headers, name, email });
    console.log(response.data);
    setName('');
    setEmail('');
    FetchCallBack();
  };*/

  return (
    <div>


      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">Email</StyledTableCell>
            <StyledTableCell align="left">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <StyledTableRow 
              key={user.ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.ID}
              </TableCell>
              <TableCell align="left">{user.name}</TableCell>
              <TableCell align="left">{user.email}</TableCell>
              <TableCell align="left">
                <Stack direction="row" spacing={2}>
                <form onSubmit={handleDelete(user.ID)}>
                  <Button
                    variant="contained"
                    type="submit"
                    color="error"
                  >Delete</Button>
                </form>
                <Button
                  variant="contained"
                  color="success"
                  onClick={ ()=> {
                    editCallBack(user.ID, user.name, user.email)
                  }}
                >Update</Button>
                </Stack>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </div>
  );
};

export default UserList;