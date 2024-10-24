import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { RecoilRoot, useRecoilState } from 'recoil';
import NavBar from './components/NavBar';
import AnimeSearch from './pages/AnimeSearch';
import Modal from './components/AnimeInfo/Modal';
import PlotSearch from './pages/PlotSearch';
import MainPage from './pages/Mainpage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import axios, { AxiosError } from 'axios';
import { API_URL } from './api/env';
import { accessTokenState, loggedInState, darkModeState } from './recoil/atoms';
import './index.css';

const AppContent: React.FC = () => {
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);
  const [darkMode, setDarkMode] = useRecoilState(darkModeState);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [statusCheckInterval, setStatusCheckInterval] =
    useState<NodeJS.Timeout | null>(null);

  const noNavBarRoutes = ['/login', '/signup'];

  const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  });

  const startTokenStatusCheck = () => {
    // 기존 타이머가 있으면 정지
    if (statusCheckInterval) {
      clearInterval(statusCheckInterval);
    }

    // 새로운 타이머 설정
    const newInterval = setInterval(checkTokenStatus, 5 * 60 * 1000); // 5분 간격
    setStatusCheckInterval(newInterval);
  };

  const checkTokenStatus = async () => {
    try {
      const response = await api.get('/auth/status');
      if (response.status === 200) {
        setLoggedIn(true);
        console.log('Token is valid');
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.log(axiosError);
        if (
          axiosError.response.status === 403 ||
          axiosError.response.status === 401
        ) {
          try {
            const { data } = await api.post('/auth/reissue', {
              withCredentials: true,
            });
            const newAccessToken = data.accessToken;

            if (newAccessToken && newAccessToken !== accessToken) {
              setAccessToken(newAccessToken);
              setLoggedIn(true);
              startTokenStatusCheck();
            }
          } catch (reissueError) {
            const reissueAxiosError = reissueError as AxiosError;
            setLoggedIn(false);
            clearInterval(statusCheckInterval!);
          }
        } else {
          console.error(
            'Failed to check token status:',
            axiosError.response.data
          );
          setLoggedIn(false);
        }
      } else {
        console.error(
          'An unexpected error occurred while checking token status:',
          error
        );
        setLoggedIn(false);
      }
    }
  };

  useEffect(() => {
    const initialCheck = async () => {
      await checkTokenStatus(); // 초기 로드 시 토큰 상태 확인
      startTokenStatusCheck(); // 초기 타이머 시작
    };

    initialCheck(); // 컴포넌트 마운트 시 초기 확인

    return () => {
      if (statusCheckInterval) {
        clearInterval(statusCheckInterval); // 컴포넌트 언마운트 시 타이머 정리
      }
    };
  }, [accessToken]); // accessToken 변경 시 효과 실행

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
