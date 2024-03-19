import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './pages/Navbar';

import ShowCountry from './pages/ShowCountry';
import AddCountry from './pages/AddCountry';
import EditCountry from './pages/EditCountry';
import ViewCountry from './pages/ViewCountry';

import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8000/";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ShowCountry />} />
          <Route path="/country" element={<AddCountry />} />
          <Route path="/edit-country/:id" element={<EditCountry />} />
          <Route path="/view-country/:id" element={<ViewCountry/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;