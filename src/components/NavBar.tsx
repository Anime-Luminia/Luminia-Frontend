import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav className='bg-purple-700 text-white py-4 shadow-lg'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='flex items-center space-x-10'>
          <div className='hidden md:flex space-x-4'>
            <Link to='/' className='font-bold text-3xl tracking-wide'>
              Lumina
            </Link>
          </div>
          <div className='hidden md:flex space-x-8'>
            <Link
              to='/plot-search'
              className='hover:text-purple-300 transition-colors duration-200'
            >
              줄거리 찾기
            </Link>
            <Link
              to='/anime-search'
              className='hover:text-purple-300 transition-colors duration-200'
            >
              애니 검색
            </Link>
            <Link
              to='/premium'
              className='hover:text-purple-300 transition-colors duration-200'
            >
              애니 플레이리스트
            </Link>
          </div>
        </div>
        <div className='hidden md:flex space-x-4'>
          <button className='bg-purple-500 hover:bg-purple-600 text-white py-2 px-6 rounded-lg transition-colors duration-200'>
            회원가입
          </button>
          <button className='bg-purple-500 hover:bg-purple-600 text-white py-2 px-6 rounded-lg transition-colors duration-200'>
            로그인
          </button>
        </div>
      </div>
      <div className='md:hidden flex justify-center mt-2'>
        <Link to='/' className='font-bold text-3xl tracking-wide'>
          Lumina
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
