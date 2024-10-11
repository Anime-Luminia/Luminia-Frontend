import React, { useState } from 'react';
import AnimeList from '../components/AnimeList'; 

interface Anime {
  malId: number;
  koreanName: string;
  imageUrl: string;
  productionCompany: string;
  score: number;
}

const AnimeSearch: React.FC = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [animatedCards, setAnimatedCards] = useState<number[]>([]); 

  const handleSearch = async () => {
    const response = await fetch(`http://localhost:8080/api/anime/list?searchQuery=${searchQuery}`);
    const data = await response.json();
    
    setAnimeList(data.content);
    setShowResults(true); 
    setAnimatedCards([]); 

    data.content.forEach((_: Anime, index: number) => {
      setTimeout(() => {
        setAnimatedCards((prev) => [...prev, index]); 
      }, index * 30); 
    });
  };


  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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
          onKeyDown={handleKeyPress} 
        />
        <button
          className="bg-purple-700 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg w-full transition-colors duration-200"
          onClick={handleSearch}
        >
          검색
        </button>
      </div>

      {showResults && animeList.length > 0 ? (
        <AnimeList animeList={animeList} animatedCards={animatedCards} showResults={showResults} /> 
      ) : (
        <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default AnimeSearch;
