import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import AnimeSearch from './pages/AnimeSearch';
import Modal from './components/Modal';
import PlotSearch from './pages/PlotSearch';
import MainPage from './pages/Mainpage';
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/plot-search' element={<PlotSearch />} />
        <Route path='/anime-search' element={<AnimeSearch />} />
        <Route path='/premium' element={<div>명품관</div>} />
      </Routes>
      <Modal />
    </Router>
  );
};

export default App;
