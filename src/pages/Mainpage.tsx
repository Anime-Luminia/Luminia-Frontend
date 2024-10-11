import React from 'react';
import { Link } from 'react-router-dom';

const MainPage: React.FC = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='mt-20'>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-5xl font-bold text-purple-700 mb-6'>Luminia</h1>
          <p className='text-xl text-center mb-8'>
            당신의 애니메이션 세상을 발견하세요!
          </p>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl p-4'>
            <Link
              to='/plot-search'
              className='bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105'
            >
              <div className='p-6'>
                <h2 className='text-2xl font-semibold text-purple-700'>
                  줄거리 찾기
                </h2>
                <p className='mt-2 text-gray-600'>
                  애니메이션 줄거리를 입력하여 관련된 애니메이션을 찾아보세요.
                </p>
              </div>
            </Link>

            <Link
              to='/anime-search'
              className='bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105'
            >
              <div className='p-6'>
                <h2 className='text-2xl font-semibold text-purple-700'>
                  애니 검색
                </h2>
                <p className='mt-2 text-gray-600'>
                  애니메이션 제목을 입력하고 관련 애니메이션을 찾아보세요.
                </p>
              </div>
            </Link>

            <Link
              to='/premium'
              className='bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105'
            >
              <div className='p-6'>
                <h2 className='text-2xl font-semibold text-purple-700'>
                  애니 플레이리스트
                </h2>
                <p className='mt-2 text-gray-600'>
                  추천 애니메이션 리스트를 확인하고 나만의 플레이리스트를
                  만들어보세요.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
