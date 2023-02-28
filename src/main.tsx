// eslint-disable-next-line no-use-before-define
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { mainTheme } from './styles/theme';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import { UserProvider } from './Contexts/UserContext';
import { CartProvider } from './Contexts/CartContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ThemeProvider theme={mainTheme}>
          <App />
        </ThemeProvider>
        <ToastContainer />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
