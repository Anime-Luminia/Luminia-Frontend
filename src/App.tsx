import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { useRecoilState } from 'recoil';
import NavBar from './components/NavBar';
import AnimeSearch from './pages/AnimeSearch';
import Modal from './components/AnimeInfo/Modal';
import PlotSearch from './pages/PlotSearch';
import MainPage from './pages/Mainpage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { api } from './api/axios';
import { loggedInState, darkModeState } from './recoil/atoms';
import './index.css';

const AppContent: React.FC = () => {
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);
  const [darkMode, setDarkMode] = useRecoilState(darkModeState);
  const [sessionInterval, setSessionInterval] = useState<NodeJS.Timeout | null>(
    null
  );
  const noNavBarRoutes = ['/login', '/signup'];

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const response = await api.get('/api/user/status');
      if (response.status === 200) {
        setLoggedIn(true);
      }
    } catch (error) {
      if (error instanceof Error && (error as any).response?.status === 403) {
        setLoggedIn(false);
        if (sessionInterval) {
          clearInterval(sessionInterval);
          setSessionInterval(null);
        }
        console.log('세션 만료');
      } else {
        console.error('세션 체크 중 오류 발생:', error);
      }
    }
  };

  const startSessionCheck = () => {
    checkSession();
    const interval = setInterval(checkSession, 5 * 60 * 1000);
    setSessionInterval(interval);
  };

  useEffect(() => {
    if (loggedIn) {
      if (!sessionInterval) {
        startSessionCheck();
      }
    } else {
      if (sessionInterval) {
        clearInterval(sessionInterval);
        setSessionInterval(null);
      }
    }

    return () => {
      if (sessionInterval) {
        clearInterval(sessionInterval);
      }
    };
  }, [loggedIn]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, [setDarkMode]);

  return (
    <>
      {!noNavBarRoutes.includes(location.pathname) && <NavBar />}

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
    <RecoilRoot>
      <Router>
        <AppContent />
      </Router>
    </RecoilRoot>
  );
};

export default App;
