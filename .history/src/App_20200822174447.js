import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Header from './componentes/Header'
import Routes from './routes';

function App() {
  return (
    <div>
      <Header />
      <Routes />
    </div>
  );
}

export default App;
