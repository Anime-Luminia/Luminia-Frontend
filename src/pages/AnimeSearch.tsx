import React, { useState } from 'react';
import AnimeList from '../components/AnimeList'; 

const AnimeSearch: React.FC = () => {
  const [animeList, setAnimeList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null); 
    try {
      const response = await fetch(`http://localhost:8080/api/anime/list?searchQuery=${searchQuery}`);
      if (!response.ok) {
        throw new Error('API 요청이 실패했습니다.');
      }
      const data = await response.json();
      setAnimeList(data.content); 
    } catch (error: any) {
      setError(error.message); 
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-purple-700">애니 검색</h1>

      <div className="max-w-lg mx-auto mb-8">
        <input
          type="text"
          className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="애니 제목을 입력하세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="bg-purple-700 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg w-full transition-colors duration-200"
          onClick={handleSearch}
        >
          검색
        </button>
      </div>


      {isLoading && <p className="text-center text-gray-500">검색 중...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {animeList.length > 0 ? (
        <AnimeList animeList={animeList} /> 
      ) : (
        !isLoading && <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default AnimeSearch;
