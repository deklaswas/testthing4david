import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './Login';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { useEffect, useState, createContext } from 'react';

const router = createBrowserRouter([
  {
    path: '/homepage',
    element: <App/>,
  },
  {
    path: '/',
    element: <Login/>,
    errorElement: <h1>404 not found</h1>
  },
]);

//

ReactDOM.createRoot(document.getElementById('root')).render(

//  const [token, setToken] = useState([]);


  
 //   <tokenContext.Provider >
      <React.StrictMode>
        <RouterProvider router={router}/>
      </React.StrictMode>
   // </tokenContext.Provider>
  );


export const tokenContext = createContext();



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
