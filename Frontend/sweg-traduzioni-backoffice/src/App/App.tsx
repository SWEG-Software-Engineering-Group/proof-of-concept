import React from 'react';
import logo from '../assets/images/logo.svg';
import '../assets/css/App.css';
import { createTheme ,ThemeProvider } from '@mui/material';
import Router from './Router';
import { Box } from '@mui/system';

const darkTheme = createTheme({
  palette:{
    mode: 'dark',
  },
});

function App() {
  return (
    //<ThemeProvider theme={darkTheme}>
      <Router/>
    //</ThemeProvider>
  );
}

export default App;
