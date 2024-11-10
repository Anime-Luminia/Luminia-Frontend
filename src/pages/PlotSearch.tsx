import React, { useState } from 'react';
import NavBar from '../components/NavBar';

const PlotSearch: React.FC = () => {
  const [plotQuery, setPlotQuery] = useState('');
  const [animeList, setAnimeList] = useState<any[]>([]);

  const handleSearch = async () => {
    const response = await fetch(
      `http://luminia.kr/api/anime/search?plot=${plotQuery}`
    );
    const data = await response.json();
    setAnimeList(data.content);
  };

  return (
    <div className='p-8 bg-gray-100 min-h-screen flex flex-col items-center'>
      <h1 className='text-4xl font-bold text-center mb-6 text-purple-700'>
        줄거리 찾기
      </h1>
      <div className='max-w-3xl w-full mb-8'>
        <textarea
          className='border border-gray-300 p-3 rounded-lg w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500'
          placeholder='애니 줄거리를 입력하세요'
          value={plotQuery}
          onChange={(e) => setPlotQuery(e.target.value)}
        />
        <button
          className='bg-purple-700 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg w-full mt-4 transition-colors duration-200'
          onClick={handleSearch}
        >
          검색
        </button>
      </div>

      {animeList.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {animeList.map((anime: any) => (
            <div
              key={anime.malId}
              className='bg-white shadow-md rounded-lg overflow-hidden'
            >
              <img
                src={anime.imageUrl}
                alt={anime.koreanName}
                className='w-full h-48 object-cover'
              />
              <div className='p-4'>
                <h2 className='text-lg font-semibold'>{anime.koreanName}</h2>
                <p className='text-sm text-gray-600'>
                  제작사: {anime.productionCompany}
                </p>
                <p className='text-sm text-gray-800 font-bold'>
                  평점: {anime.score}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-center text-gray-500'>검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default PlotSearch;
