import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { UserContextProvider } from "./context/userContext";
import ArticlesContextProvider from './context/articlesContext';

ReactDOM.render(
  <HashRouter>
      <UserContextProvider>
        <ArticlesContextProvider>
          <App />
        </ArticlesContextProvider>
      </UserContextProvider>
  </HashRouter>,
  document.getElementById('root')
);