import React from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { api } from '../api/axios';
import { useRecoilState } from 'recoil';
import { loggedInState, darkModeState } from '../recoil/atoms';
import darkModeIcon from '../assets/moon.svg';
import lightModeIcon from '../assets/sun.svg';

interface NavBarProps {
  handleLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ handleLogout }) => {
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [darkMode, setDarkMode] = useRecoilState(darkModeState);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <nav className='bg-primary dark:bg-darkNav text-gray-700 dark:text-gray-200 py-4 shadow-md'>
      <div className='container mx-auto flex justify-between items-center px-4'>
        <Link
          to='/'
          className='font-bold text-3xl tracking-wide text-accent dark:text-white px-4'
        >
          Lumina
        </Link>

        <div className='md:hidden flex items-center justify-start'>
          <button
            onClick={toggleMobileMenu}
            className='text-gray-700 dark:text-gray-200 p-2'
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        <div className='hidden md:flex space-x-8'>
          <button
            onClick={() => navigate('/plot-search')}
            className='hover:text-accent dark:hover:text-gray-300 transition-colors duration-200'
          >
            줄거리 찾기
          </button>
          <button
            onClick={() => navigate('/anime-search')}
            className='hover:text-accent dark:hover:text-gray-300 transition-colors duration-200'
          >
            애니 검색
          </button>
          <button
            onClick={() => navigate('/playlists')}
            className='hover:text-accent dark:hover:text-gray-300 transition-colors duration-200'
          >
            플레이리스트
          </button>
        </div>

        <div className='hidden md:flex space-x-4'>
          <button
            onClick={toggleDarkMode}
            className='inline-flex items-center justify-center rounded-md h-10 w-10 border border-gray-300 dark:border-[#2e3a48] bg-white dark:bg-[#1a1d24] hover:bg-gray-100 dark:hover:bg-[#313641] transition-colors focus:outline-none focus:ring-2 focus:ring-offset focus:ring-gray-500 dark:focus:ring-white'
          >
            <img
              src={darkMode ? darkModeIcon : lightModeIcon}
              alt='다크 모드 전환 아이콘'
              className='h-6 w-6 transition-transform duration-300'
              style={{
                filter: darkMode
                  ? 'brightness(0) invert(1) drop-shadow(0 0 2px white)'
                  : 'none', // 다크 모드일 때 하얀색 테두리 효과 추가
              }}
            />
          </button>
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className='bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 hover:bg-blue-600 dark:hover:bg-blue-400'
            >
              로그아웃
            </button>
          ) : (
            <>
              <Link
                to='/login'
                className='bg-gray-500 dark:bg-white text-white dark:text-black font-semibold py-2 px-6 rounded-lg transition-colors duration-200 hover:bg-gray-800 dark:hover:bg-gray-300'
              >
                로그인
              </Link>
              <Link
                to='/signup'
                className='bg-accent dark:bg-white text-white dark:text-black font-semibold py-2 px-6 rounded-lg transition-transform duration-200 hover:bg-hover hover:scale-105'
              >
                가입하기
              </Link>
            </>
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className='md:hidden flex flex-col items-center mt-6 space-y-6 bg-white dark:bg-gray-800 rounded-lg p-6'>
          <button
            onClick={() => navigate('/plot-search')}
            className='text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-accent dark:hover:text-gray-300 transition-colors duration-200'
          >
            줄거리 찾기
          </button>
          <button
            onClick={() => navigate('/anime-search')}
            className='text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-accent dark:hover:text-gray-300 transition-colors duration-200'
          >
            애니 검색
          </button>
          <button
            onClick={() => navigate('/playlists')}
            className='text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-accent dark:hover:text-gray-300 transition-colors duration-200'
          >
            플레이리스트
          </button>
          <button
            onClick={toggleDarkMode}
            className='bg-gray-500 dark:bg-gray-600 text-white py-2 px-6 rounded-lg transition-colors duration-200 hover:bg-gray-600 dark:hover:bg-gray-500'
          >
            {darkMode ? '라이트 모드' : '다크 모드'}
          </button>
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className='bg-blue-500 dark:bg-blue-400 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 hover:bg-blue-600 dark:hover:bg-blue-500'
            >
              로그아웃
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className='bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              >
                로그인
              </button>
              <button
                onClick={() => navigate('/signup')}
                className='bg-accent text-white font-semibold py-2 px-6 rounded-lg transition-transform duration-200 hover:bg-hover hover:scale-105'
              >
                가입하기
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
