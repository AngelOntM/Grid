import './App.css';
import Grid from "./componentes/grid";
import Menu from './componentes/app';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Grid />} />
        <Route path='/a' element={<Menu />} />
      </Routes>

    </Router>
  );
}

export default App;
