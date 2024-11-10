import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { api } from '../api/axios';
import { loggedInState, accessTokenState } from '../recoil/atoms'; // Recoil 상태 가져오기
import {
  FaUserAlt,
  FaLock,
  FaGoogle,
  FaFacebook,
  FaTwitter,
} from 'react-icons/fa';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (loggedIn) {
      navigate('/'); // 로그인 상태이면 홈으로 이동
    }
  }, [loggedIn, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setErrorMessage(null);
      setSuccessMessage(null);

      const response = await api.post('/api/auth/login', {
        email: username,
        password: password,
        rememberMe: rememberMe,
      });

      if (response.status === 200) {
        setSuccessMessage('로그인 성공!');
        setErrorMessage(null);

        // accessToken 저장
        const token = response.data.response.accessToken;
        setAccessToken(token); // 전역 상태 업데이트
        setLoggedIn(true); // 로그인 상태 업데이트
        navigate(redirectPath);
      } else {
        setErrorMessage('로그인 실패: ' + response.data.message);
        setSuccessMessage(null);
        setLoggedIn(false);
      }
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        setErrorMessage(
          '로그인 실패: ' + (error.response.data.message || '알 수 없는 오류')
        );
        setLoggedIn(false);
      } else {
        setErrorMessage('로그인 실패: 서버와 통신 중 오류가 발생했습니다.');
        setLoggedIn(false);
      }
      setSuccessMessage(null);
    }
  };

  return (
    <div
      className='min-h-screen flex flex-col justify-center items-center bg-cover bg-center dark:bg-darkBack'
      style={{ backgroundImage: 'url(/path-to-background-image.jpg)' }}
    >
      <div className='bg-white dark:bg-darkCard shadow-2xl rounded-lg p-8 max-w-md w-full'>
        <Link to='/'>
          <h1 className='text-5xl font-extrabold text-accent dark:text-darkTitle text-center mb-6'>
            Luminia
          </h1>
        </Link>
        <h2 className='text-2xl text-center text-gray-700 dark:text-gray-200 mb-8'>
          로그인
        </h2>

        {errorMessage && (
          <div className='bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-3 rounded-lg mb-4'>
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className='bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 p-3 rounded-lg mb-4'>
            {successMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className='space-y-6'>
          <div className='relative'>
            <FaUserAlt className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500' />
            <input
              type='text'
              placeholder='유저 이름'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='pl-10 p-3 w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-darkInputBg rounded-lg focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-darkTextHover transition text-gray-700 dark:text-gray-300'
            />
          </div>
          <div className='relative'>
            <FaLock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500' />
            <input
              type='password'
              placeholder='비밀번호'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='pl-10 p-3 w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-darkInputBg rounded-lg focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-darkTextHover transition text-gray-700 dark:text-gray-300'
            />
          </div>

          <div className='flex items-center'>
            <input
              type='checkbox'
              id='remember-me'
              name='remember-me'
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className='mr-2 dark:bg-darkInputBg dark:border-darkInputBorder'
            />
            <label
              htmlFor='remember-me'
              className='text-gray-600 dark:text-gray-300'
            >
              Remember Me
            </label>
          </div>

          <button
            type='submit'
            className='w-full bg-accent dark:bg-darkButton text-white py-3 rounded-lg hover:bg-hover dark:hover:bg-darkButtonHover transition duration-200 font-semibold'
          >
            로그인
          </button>
        </form>

        <div className='mt-6 text-center'>
          <p className='text-gray-600 dark:text-gray-300 mb-4'>또는</p>
          <div className='flex justify-center space-x-4'>
            <button className='bg-white dark:bg-darkButton border border-gray-300 dark:border-gray-600 p-3 rounded-full text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-darkHover'>
              <FaGoogle size={20} />
            </button>
            <button className='bg-white dark:bg-darkButton border border-gray-300 dark:border-gray-600 p-3 rounded-full text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-darkHover'>
              <FaFacebook size={20} />
            </button>
            <button className='bg-white dark:bg-darkButton border border-gray-300 dark:border-gray-600 p-3 rounded-full text-blue-400 dark:text-blue-300 hover:bg-gray-100 dark:hover:bg-darkHover'>
              <FaTwitter size={20} />
            </button>
          </div>
        </div>

        <p className='mt-8 text-center text-gray-600 dark:text-gray-300'>
          계정이 없으신가요?{' '}
          <Link
            to='/signup'
            className='text-accent dark:text-darkTextHover hover:underline'
          >
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
