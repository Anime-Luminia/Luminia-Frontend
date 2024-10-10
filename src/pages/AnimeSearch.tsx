import React, { useState } from 'react';

const AnimeSearch: React.FC = () => {
  const [animeList, setAnimeList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    const response = await fetch(`http://localhost:8080/api/anime/list?searchQuery=${searchQuery}`);
    const data = await response.json();
    setAnimeList(data.content);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-purple-700">애니 검색</h1>
      <div className="max-w-lg mx-auto mb-8">
        <input
          type="text"
          className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="애니 제목을 검색하세요"
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

      {animeList.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-purple-700 text-white text-left">
                <th className="p-4">이미지</th>
                <th className="p-4">한글 이름</th>
                <th className="p-4">일본어 이름</th>
                <th className="p-4">제작사</th>
                <th className="p-4">장르</th>
                <th className="p-4">평점</th>
              </tr>
            </thead>
            <tbody>
              {animeList.map((anime: any, index: number) => (
                <tr key={anime.malId} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors`}>
                  <td className="p-4"><img src={anime.imageUrl} alt={anime.koreanName} className="w-20 h-28 object-cover" /></td>
                  <td className="p-4">{anime.koreanName}</td>
                  <td className="p-4">{anime.japaneseName}</td>
                  <td className="p-4">{anime.productionCompany}</td>
                  <td className="p-4">{anime.genre}</td>
                  <td className="p-4">{anime.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default AnimeSearch;
