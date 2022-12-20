import React from 'react';
//import logo from './logo.svg'; //Sembra che non lo veda, in alternativa sotto il comando (dopo gli import ho messo il require)
import './App.css';
const logo = require("./logo.svg") as string;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
