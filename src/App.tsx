import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
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
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const AppContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);
  const [darkMode, setDarkMode] = useRecoilState(darkModeState);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [statusCheckInterval, setStatusCheckInterval] =
    useState<NodeJS.Timeout | null>(null);

  const noNavBarRoutes = ['/login', '/signup'];

  // Axios 인스턴스 생성
  const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });

  // Axios Interceptor 설정
  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((config) => {
      if (accessToken) {
        console.log(accessToken + '으로 보냅니다');
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, [accessToken]);

  // Apollo Client 설정
  const httpLink = new HttpLink({
    uri: 'http://localhost:8080/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    if (accessToken) {
      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${accessToken}`,
        },
      };
    }
    // accessToken이 없으면 Authorization 헤더를 추가하지 않음
    return { headers };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  const handleLogout = async () => {
    try {
      const response = await api.post('/auth/logout', null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        setLoggedIn(false);
        setAccessToken(null);
        navigate('/');
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  // 토큰 상태 유효성 검사
  const checkTokenStatus = async () => {
    try {
      const response = await api.get('/auth/status');
      if (response.status === 200) {
        setLoggedIn(true);
        console.log('Token is valid');
      }
    } catch (error) {
      handleTokenStatusError(error);
    }
  };

  const handleTokenStatusError = async (error: unknown) => {
    const axiosError = error as AxiosError;

    if (
      axiosError.response &&
      (axiosError.response.status === 403 || axiosError.response.status === 401)
    ) {
      await attemptTokenReissue();
    } else {
      console.error(
        'Failed to check token status:',
        axiosError.response?.data || error
      );
      setLoggedIn(false);
      deactivateTokenStatusCheck();
    }
  };

  const attemptTokenReissue = async () => {
    try {
      const { data } = await api.post('/auth/reissue');
      const newAccessToken = data.response.accessToken;

      if (newAccessToken) {
        setAccessToken(newAccessToken);
        setLoggedIn(true);
        console.log(newAccessToken);
        console.log('Token reissued successfully');
      } else {
        setLoggedIn(false);
      }
    } catch (error) {
      console.error('Failed to reissue token:', error);
      setLoggedIn(false);
      deactivateTokenStatusCheck();
    }
  };

  const activateTokenStatusCheck = () => {
    deactivateTokenStatusCheck();
    const interval = setInterval(checkTokenStatus, 1 * 60 * 1000);
    setStatusCheckInterval(interval);
  };

  const deactivateTokenStatusCheck = () => {
    if (statusCheckInterval) {
      clearInterval(statusCheckInterval);
      setStatusCheckInterval(null);
    }
  };

  // 첫 로드 시 토큰 상태 검사
  useEffect(() => {
    const initialCheck = async () => {
      await checkTokenStatus();
    };

    initialCheck();
  }, []);

  // loggedIn 상태에 따른 검사 활성화/비활성화
  useEffect(() => {
    if (loggedIn) {
      activateTokenStatusCheck();
    } else {
      deactivateTokenStatusCheck();
      setAccessToken(null);
    }

    return () => {
      deactivateTokenStatusCheck();
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
    <ApolloProvider client={client}>
      {!noNavBarRoutes.includes(location.pathname) && (
        <NavBar handleLogout={handleLogout} />
      )}
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/plot-search' element={<PlotSearch />} />
        <Route path='/anime-search' element={<AnimeSearch />} />
        <Route path='/premium' element={<div>명품관</div>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      <Modal />
    </ApolloProvider>
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
