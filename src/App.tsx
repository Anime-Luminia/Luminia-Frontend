import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import NavBar from './components/NavBar';
import AnimeSearch from './pages/AnimeSearch';
import Modal from './components/AnimeInfo/Modal';
import PlotSearch from './pages/PlotSearch';
import MainPage from './pages/Mainpage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import './index.css';

const AppContent: React.FC = () => {
  const location = useLocation();
  const noNavBarRoutes = ['/login', '/signup']; // 네비게이션바를 숨길 경로 목록

  return (
    <>
      {!noNavBarRoutes.includes(location.pathname) && <NavBar />}{' '}
      {/* 네비게이션바 조건부 렌더링 */}
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/plot-search' element={<PlotSearch />} />
        <Route path='/anime-search' element={<AnimeSearch />} />
        <Route path='/premium' element={<div>명품관</div>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      <Modal />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
