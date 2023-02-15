import React from 'react';
import logo from '../assets/images/logo.svg';
import { Button, createTheme ,ThemeProvider } from '@mui/material';
import Router from './Router';
import { Box } from '@mui/system';

const darkTheme = createTheme({
  palette:{
    mode: 'dark',
  },
});



function App() {
  return (
    <>
    <div style={{display:'flex', justifyContent:'space-evenly'}}>
      <Button variant='contained' href='/todo'>USER MAIN PAGE</Button>
      <Button variant='contained' href='/superAdmin'>SUPERADMIN MAIN PAGE</Button>
      <Button variant='contained' href='/admin'>ADMIN MAIN PAGE</Button>
    </div>
    {/* <ThemeProvider theme={darkTheme}> */}
      <Router/>
    {/* </ThemeProvider> */}
    </>
  );
}

export default App;
