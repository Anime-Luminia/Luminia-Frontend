import React, { useState, useCallback, useRef, useEffect } from 'react';
import AnimeList from '../components/AnimeList';
import FilterModal from '../components/FilterModal';
import SortDropdown from '../components/SortDropdown';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { api } from '../api/axios';
import { Anime } from '../types/Anime';
import { ApiResponse } from '../types/response';
import { useSearchParams } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa';

const AnimeSearch: React.FC = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  //검색 관련
  const [searchQuery, setSearchQuery] = useState('');
  const [currentQuery, setCurrentQuery] = useState(
    searchParams.get('searchQuery') || ''
  );
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [sortBy, setSortBy] = useState('koreanName');

  // 필터 상태
  const [excludeExplicit, setExcludeExplicit] = useState(true);
  const [selectedProducer, setSelectedProducer] = useState<
    string | undefined
  >();
  const [selectedGenres, setSelectedGenres] = useState<Record<string, string>>(
    {}
  );
  const [selectedTypes, setSelectedTypes] = useState<Record<string, string>>(
    {}
  ); // 애니 유형 선택 상태 추가
  const [selectedRating, setSelectedRating] = useState<Record<string, string>>(
    {}
  );
  const [selectedSource, setSelectedSources] = useState<Record<string, string>>(
    {}
  );
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);

  const [displayedAnimeIds, setDisplayedAnimeIds] = useState<Set<number>>(
    new Set()
  );

  // API에서 애니 데이터를 가져오는 함수
  const fetchAnimeList = async (page: number, query: string = currentQuery) => {
    if (loading) return;
    setLoading(true);
    try {
      const params: any = {
        sortBy,
        size: 50,
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

        //중복되지 않은 애니만 처리하기 (ID 기준)
        const newAnimes = animes.filter(
          (anime) => !displayedAnimeIds.has(anime.malId)
        );

        setAnimeList((prevList) =>
          page === 1 ? animes : [...prevList, ...newAnimes]
        );

        // 새로운 애니의를 Set에 넣어두기
        setDisplayedAnimeIds((prevIds) => {
          const updatedIds = new Set(prevIds);
          newAnimes.forEach((anime) => updatedIds.add(anime.malId));
          return updatedIds;
        });

        if (newAnimes.length > 0) {
          const lastAnime = newAnimes[newAnimes.length - 1];
          params.lastKoreanName = lastAnime.koreanName;
          params.lastMalId = lastAnime.malId;
        }

        setHasMore(animes.length === 50);
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
    setPage(1);
    setAnimeList([]);
    setCurrentQuery(searchQuery);
    if (searchQuery) {
      setSearchParams({ searchQuery });
    } else {
      setSearchParams({});
    }
    fetchAnimeList(1, searchQuery);
  };

  // 정렬 기준이 변경되었을 때 처리하는 함수
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    setPage(1);
    setAnimeList([]);
    fetchAnimeList(1, searchQuery);
  };

  useEffect(() => {
    if (page > 1) {
      fetchAnimeList(page);
    }
  }, [page]);

  useEffect(() => {
    if (initialLoad) {
      fetchAnimeList(1);
      setInitialLoad(false);
    }
  }, [initialLoad]);

  // Intersection Observer를 사용한 스크롤 감지
  const lastAnimeElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      console.log('테스트1' + loading + ' ' + hasMore);
      if (loading || !hasMore) return;
      if (observer.current) {
        console.log('테스트');
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prevPage) => prevPage + 1);
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

  return (
    <div className='p-8 bg-gray-100 min-h-screen'>
      <h1 className='text-4xl font-bold text-center mb-6 text-accent'>
        애니 검색 (아직 필터 작동 안됨)
      </h1>
      <div className='max-w-lg mx-auto mb-8'>
        <div className='max-w-lg mx-auto mb-8 flex space-x-2'>
          <input
            type='text'
            className='border border-lightGray p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-accent'
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
            className='bg-gray-800 text-white py-3 px-4 rounded-lg hover:bg-gray-700 flex items-center justify-center'
            onClick={() => setIsFilterVisible(!isFilterVisible)}
          >
            <FaFilter size={20} />
          </button>
        </div>

        <div className='max-w-lg mx-auto mb-8'>
          <button
            className='bg-accent hover:bg-hover text-white font-semibold py-3 px-4 rounded-lg w-full transition-colors duration-200'
            onClick={handleSearch}
          >
            검색
          </button>
        </div>
      </div>

      {isFilterVisible && (
        <FilterModal
          excludeExplicit={excludeExplicit}
          setExcludeExplicit={setExcludeExplicit}
          selectedProducer={selectedProducer}
          setSelectedProducer={setSelectedProducer}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
          selectedSource={selectedSource}
          setSelectedSources={setSelectedSources}
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
        />
      )}

      <div className='max-w-screen-xl mx-auto flex justify-between items-baseline mt-10 px-6'>
        <p className='text-gray-600 whitespace-nowrap'>
          총 {animeList.length}개의 작품이 검색되었어요!
        </p>
        <SortDropdown sortBy={sortBy} onSortChange={handleSortChange} />
      </div>

      <div className='max-w-screen-xl mx-auto border-t border-lightGray my-4'></div>

      <AnimeList
        animeList={animeList}
        lastAnimeElementRef={lastAnimeElementRef}
      />
      {loading && <p className='text-center'>로딩 중...</p>}

      <ScrollToTopButton showScrollTopButton={showScrollTopButton} />
    </div>
  );
};

export default AnimeSearch;
