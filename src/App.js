import './App.css';
import Grid from "./componentes/grid"
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Grid />} />
      </Routes>

    </Router>
  );
}

export default App;
