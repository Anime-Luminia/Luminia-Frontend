import React from 'react';
import { Link } from 'react-router-dom';

const MainPage: React.FC = () => {
  return (
    <div className='min-h-screen bg-secondary m-0'>
      <div className='flex flex-col justify-center items-center py-20'>
        <h1 className='text-6xl font-extrabold text-accent mb-8'>Luminia</h1>
        <p className='text-2xl text-center mb-10 text-gray-700'>
          당신의 애니메이션 세상을 발견하세요!
        </p>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl p-6'>
          <Link
            to='/plot-search'
            className='bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:bg-hover'
          >
            <div className='p-8'>
              <h2 className='text-3xl font-semibold text-accent'>
                줄거리 찾기
              </h2>
              <p className='mt-4 text-gray-600'>
                애니메이션 줄거리를 입력하여 관련된 애니메이션을 찾아보세요.
              </p>
            </div>
          </Link>

          <Link
            to='/anime-search'
            className='bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:bg-hover'
          >
            <div className='p-8'>
              <h2 className='text-3xl font-semibold text-accent'>애니 검색</h2>
              <p className='mt-4 text-gray-600'>
                애니메이션 제목을 입력하고 관련 애니메이션을 찾아보세요.
              </p>
            </div>
          </Link>

          <Link
            to='/playlists'
            className='bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:bg-hover'
          >
            <div className='p-8'>
              <h2 className='text-3xl font-semibold text-accent'>
                애니 플레이리스트
              </h2>
              <p className='mt-4 text-gray-600'>
                추천 애니메이션 리스트를 확인하고 나만의 플레이리스트를
                만들어보세요.
              </p>
            </div>
          </Link>
        </div>

        <div className='mt-12'>
          <Link
            to='/premium'
            className='bg-buttonHighlight text-white py-4 px-10 rounded-lg shadow-md hover:bg-yellow-500 transition-transform duration-200 transform hover:scale-110'
          >
            프리미엄 서비스 보기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
