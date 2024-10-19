import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/axios';
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
  const navigate = useNavigate();

  // 세션 쿠키가 있는지 확인하는 함수
  const isLoggedIn = () => {
    return (
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('JSESSIONID')) !== undefined
    );
  };

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/');
    }
  }, [navigate]);

  // 로그인된 상태라면 로그인 페이지에 접근하지 않도록 설정
  useEffect(() => {
    const hasSession = isLoggedIn();
    if (hasSession) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 백엔드로 로그인 요청 보내기
      const response = await api.post('/api/auth/login', {
        email: username,
        password: password,
        rememberMe: rememberMe,
      });

      setSuccessMessage('로그인 성공!');
      setErrorMessage(null);

      navigate('/');
    } catch (error) {
      setErrorMessage('로그인 실패. 다시 시도해주세요.');
      setSuccessMessage(null);
    }
  };

  return (
    <div
      className='min-h-screen flex flex-col justify-center items-center bg-cover bg-center'
      style={{ backgroundImage: 'url(/path-to-background-image.jpg)' }}
    >
      <div className='bg-white shadow-2xl rounded-lg p-8 max-w-md w-full'>
        <Link to='/'>
          <h1 className='text-5xl font-extrabold text-accent text-center mb-6'>
            Luminia
          </h1>
        </Link>
        <h2 className='text-2xl text-center text-gray-700 mb-8'>로그인</h2>

        {errorMessage && (
          <div className='bg-red-100 text-red-700 p-3 rounded-lg mb-4'>
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className='bg-green-100 text-green-700 p-3 rounded-lg mb-4'>
            {successMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className='space-y-6'>
          <div className='relative'>
            <FaUserAlt className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
            <input
              type='text'
              placeholder='유저 이름'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='pl-10 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition'
            />
          </div>
          <div className='relative'>
            <FaLock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
            <input
              type='password'
              placeholder='비밀번호'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='pl-10 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition'
            />
          </div>

          <div className='flex items-center'>
            <input
              type='checkbox'
              id='remember-me'
              name='remember-me'
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className='mr-2'
            />
            <label htmlFor='remember-me'>Remember Me</label>
          </div>

          <button
            type='submit'
            className='w-full bg-accent text-white py-3 rounded-lg hover:bg-hover transition duration-200 font-semibold'
          >
            로그인
          </button>
        </form>

        <div className='mt-6 text-center'>
          <p className='text-gray-600 mb-4'>또는</p>
          <div className='flex justify-center space-x-4'>
            <button className='bg-white border border-gray-300 p-3 rounded-full text-red-600 hover:bg-gray-100'>
              <FaGoogle size={20} />
            </button>
            <button className='bg-white border border-gray-300 p-3 rounded-full text-blue-600 hover:bg-gray-100'>
              <FaFacebook size={20} />
            </button>
            <button className='bg-white border border-gray-300 p-3 rounded-full text-blue-400 hover:bg-gray-100'>
              <FaTwitter size={20} />
            </button>
          </div>
        </div>

        <p className='mt-8 text-center text-gray-600'>
          계정이 없으신가요?{' '}
          <Link to='/signup' className='text-accent hover:underline'>
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
