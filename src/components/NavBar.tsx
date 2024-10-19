import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { api } from '../api/axios';

const isLoggedIn = () => {
  return (
    document.cookie.split('; ').find((row) => row.startsWith('JSESSIONID')) !==
    undefined
  );
};

const NavBar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await api.post('/api/auth/logout');
      if (response.status === 200) {
        document.cookie =
          'JSESSIONID=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';
        setLoggedIn(false);

        window.location.href = '/';
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav className='bg-primary text-gray-700 py-4 shadow-md'>
      <div className='container mx-auto flex justify-between items-center px-4'>
        <Link
          to='/'
          className='font-bold text-3xl tracking-wide text-accent px-4'
        >
          Lumina
        </Link>

        <div className='md:hidden flex items-center justify-start'>
          <button onClick={toggleMobileMenu} className='text-gray-700 p-2'>
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        <div className='hidden md:flex space-x-8'>
          <Link
            to='/plot-search'
            className='hover:text-accent transition-colors duration-200'
          >
            줄거리 찾기
          </Link>
          <Link
            to='/anime-search'
            className='hover:text-accent transition-colors duration-200'
          >
            애니 검색
          </Link>
          <Link
            to='/playlists'
            className='hover:text-accent transition-colors duration-200'
          >
            플레이리스트
          </Link>
        </div>

        <div className='hidden md:flex space-x-4'>
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className='bg-red-500 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 hover:bg-red-600'
            >
              로그아웃
            </button>
          ) : (
            <>
              <Link
                to='/login'
                className='bg-gray-200 text-gray-700 font-semibold py-2 px-6 rounded-lg transition-colors duration-200 hover:bg-gray-300'
              >
                로그인
              </Link>
              <Link
                to='/signup'
                className='bg-accent text-white font-semibold py-2 px-6 rounded-lg transition-transform duration-200 hover:bg-hover hover:scale-105'
              >
                가입하기
              </Link>
            </>
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className='md:hidden flex flex-col items-center mt-6 space-y-6 bg-white rounded-lg p-6'>
          <Link
            to='/plot-search'
            className='text-lg font-medium text-gray-700 hover:text-accent transition-colors duration-200'
          >
            줄거리 찾기
          </Link>
          <Link
            to='/anime-search'
            className='text-lg font-medium text-gray-700 hover:text-accent transition-colors duration-200'
          >
            애니 검색
          </Link>
          <Link
            to='/playlists'
            className='text-lg font-medium text-gray-700 hover:text-accent transition-colors duration-200'
          >
            플레이리스트
          </Link>
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className='bg-red-500 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 hover:bg-red-600'
            >
              로그아웃
            </button>
          ) : (
            <>
              <Link
                to='/login'
                className='bg-gray-200 text-gray-700 font-semibold py-2 px-6 rounded-lg transition-colors duration-200 hover:bg-gray-300'
              >
                로그인
              </Link>
              <Link
                to='/signup'
                className='bg-accent text-white font-semibold py-2 px-6 rounded-lg transition-transform duration-200 hover:bg-hover hover:scale-105'
              >
                가입하기
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
