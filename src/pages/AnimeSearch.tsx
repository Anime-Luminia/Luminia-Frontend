import React, { useState, useCallback, useRef, useEffect } from 'react';
import AnimeList from '../components/AnimeList';
import { api } from '../api/axios';
import { Anime } from '../types/Anime';
import { ApiResponse } from '../types/response';
import { useSearchParams } from 'react-router-dom';

const AnimeSearch: React.FC = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentQuery, setCurrentQuery] = useState(
    searchParams.get('searchQuery') || ''
  );
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  // API에서 애니 데이터를 가져오는 함수
  const fetchAnimeList = async (page: number, query: string = currentQuery) => {
    if (loading) return;
    setLoading(true);
    try {
      console.log(query + ' ' + currentQuery);
      const params: any = {
        sortBy: 'koreanName',
        size: 20,
        searchQuery: query || undefined,
        lastKoreanName:
          page === 1
            ? undefined
            : animeList.length
              ? animeList[animeList.length - 1].koreanName
              : undefined,
        lastMalId:
          page === 1
            ? undefined
            : animeList.length
              ? animeList[animeList.length - 1].malId
              : undefined,
      };

      const response = await api.get<ApiResponse<{ animes: Anime[] }>>(
        '/api/anime/list',
        {
          params,
        }
      );

      const data = response.data;

      if (data.success && data.response?.animes) {
        const animes = data.response.animes || [];
        setAnimeList((prevList) =>
          page === 1 ? animes : [...prevList, ...animes]
        );
        setHasMore(animes.length === 20);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // 검색어가 변경되면 페이지를 초기화하고 검색
  const handleSearch = () => {
    setPage(1); // 페이지를 1로 설정
    setAnimeList([]); // 애니메이션 리스트 초기화
    setCurrentQuery(searchQuery);
    if (searchQuery) {
      setSearchParams({ searchQuery });
    } else {
      setSearchParams({});
    }
    fetchAnimeList(1, searchQuery);
  };

  useEffect(() => {
    if (page > 1) {
      fetchAnimeList(page);
    }
  }, [page]);

  useEffect(() => {
    if (initialLoad) {
      fetchAnimeList(1); // 기본 목록 가져오기
      setInitialLoad(false); // 초기 로딩 완료 후 상태 변경
    }
  }, [initialLoad]);

  // Intersection Observer를 사용한 스크롤 감지
  const lastAnimeElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prevPage) => prevPage + 1); // 페이지 증가
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // 스크롤 위치 추적 및 플로팅 버튼 표시
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTopButton(true);
      } else {
        setShowScrollTopButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 맨 위로 스크롤
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className='p-8 bg-gray-100 min-h-screen'>
      <h1 className='text-4xl font-bold text-center mb-6 text-purple-700'>
        애니 검색
      </h1>
      <div className='max-w-lg mx-auto mb-8'>
        <input
          type='text'
          className='border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500'
          placeholder='애니 제목을 검색하세요'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <button
          className='bg-purple-700 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg w-full transition-colors duration-200'
          onClick={handleSearch}
        >
          검색
        </button>
      </div>

      <AnimeList
        animeList={animeList}
        lastAnimeElementRef={lastAnimeElementRef}
      />
      {loading && <p className='text-center'>로딩 중...</p>}

      {showScrollTopButton && (
        <button
          onClick={scrollToTop}
          className='fixed bottom-10 right-10 bg-purple-700 text-white p-2.5 rounded-full shadow-lg hover:bg-purple-600 transition-colors duration-200'
        >
          ▲
        </button>
      )}
    </div>
  );
};

export default AnimeSearch;
