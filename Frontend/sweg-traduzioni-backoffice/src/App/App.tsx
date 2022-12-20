import React from 'react';
import logo from '../assets/images/logo.svg';
import '../assets/css/App.css';

import TranslationCard from '../components/TranslationCard';
import Router from './Router';
import { Box } from '@mui/system';

function App() {
  return (
    <Box>
      <Router/>
    </Box>
  );
}

export default App;
