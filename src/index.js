import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from "./context/userContext";
import ArticlesContextProvider from './context/articlesContext';

ReactDOM.render(
  <BrowserRouter>
      <UserContextProvider>
        <ArticlesContextProvider>
          <App />
        </ArticlesContextProvider>
      </UserContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);