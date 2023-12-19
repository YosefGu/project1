import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { UsersContextProvider } from './context/userContext.jsx'
import { AuthContextProvider } from './context/authContext.jsx'
import './index.css'
// import dotenv from 'dotenv';
// dotenv.config();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
    <UsersContextProvider>
      <App />
    </UsersContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
