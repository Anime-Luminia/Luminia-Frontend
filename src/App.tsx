import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import AnimeSearch from './pages/AnimeSearch';
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<AnimeSearch />} />
        <Route path="/plot-search" element={<div>줄거리 찾기</div>} />
        <Route path="/anime-search" element={<AnimeSearch />} />
        <Route path="/premium" element={<div>명품관</div>} />
      </Routes>
    </Router>
  );
};

export default App;
