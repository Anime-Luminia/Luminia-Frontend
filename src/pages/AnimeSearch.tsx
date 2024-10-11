import React, { useState, useCallback, useRef, useEffect } from 'react';
import AnimeList from '../components/AnimeList'; 
import { api } from '../api/axios';
import { Anime } from '../types/Anime';
import { ApiResponse } from '../types/response';

const AnimeSearch: React.FC = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]); // 빈 배열로 초기화
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [animatedCards, setAnimatedCards] = useState<number[]>([]); // 애니메이션 카드 상태 추가
  const observer = useRef<IntersectionObserver | null>(null);

  const handleSearch = async () => {
    setPage(0); // 검색어가 변경되면 페이지 번호를 0으로 리셋
    setAnimeList([]); // 기존 결과 초기화
    setAnimatedCards([]); // 애니메이션 카드 초기화
    fetchAnimeList(0); // 첫 번째 페이지 데이터 가져오기
  };

  const fetchAnimeList = async (page: number) => {
    setLoading(true);
    try {
      const params: any = {
        sortBy: 'koreanName', 
        size: 10,
        searchQuery: searchQuery || undefined,
        lastKoreanName: animeList.length ? animeList[animeList.length - 1].koreanName : undefined,
        lastMalId: animeList.length ? animeList[animeList.length - 1].malId : undefined,
      };
  
      const response = await api.get<ApiResponse<{ animes: Anime[] }>>('/api/anime/list', {
        params,
      });
  
      const data = response.data;
  
      if (data.success && data.response?.animes) {
        const animes = data.response.animes || [];
        setAnimeList((prevList) => (page === 0 ? animes : [...prevList, ...animes]));
        setHasMore(animes.length > 0);
        setLoading(false);
  
        // 애니메이션 추가 로직
        animes.forEach((_, index) => {
          setTimeout(() => {
            setAnimatedCards((prev) => [...prev, index]);
          }, index * 30); // 각 카드 30ms 간격으로 추가
        });
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const lastAnimeElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1); // 페이지 증가
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    if (page > 0) {
      fetchAnimeList(page); // 페이지가 증가할 때마다 새로운 데이터 가져오기
    }
  }, [page]);

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

      <AnimeList animeList={animeList} lastAnimeElementRef={lastAnimeElementRef} animatedCards={animatedCards} />
      {loading && <p className="text-center">로딩 중...</p>}
      {!hasMore && !loading && <p className="text-center">더 이상 데이터가 없습니다.</p>}
    </div>
  );
};

export default AnimeSearch;
