import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Tabs from './Tabs';  

interface AnimeDetails {
  malId: number;
  koreanName: string;
  japanesesName: string;
  productionCompany: string;
  genre: string;
  animelistUrl: string;
  imageUrl: string;
  largeImageUrl: string;
  trailerUrl: string;
  score: number;
  rating: string;
  source: string;
}

const Modal: React.FC = () => {
  const [animeDetails, setAnimeDetails] = useState<AnimeDetails | null>(null);
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('info');
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const malId = searchParams.get('modal');

  useEffect(() => {
    if (malId) {
      document.body.style.overflow = 'hidden';
      setActiveTab('info');
      setIsVisible(true);
      fetchAnimeDetails(malId);
    } else {
      document.body.style.overflow = 'auto';
      setIsVisible(false);
      setAnimeDetails(null);
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [malId]);

  const fetchAnimeDetails = async (malId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/anime/${malId}`);
      const data = await response.json();
      setAnimeDetails(data);
    } catch (error) {
      console.error('Failed to fetch anime details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      navigate('/anime-search');
    }, 300);
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  if (!malId || (isLoading && !animeDetails)) {
    return null;  
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <div className="p-4">
            <h3 className="text-2xl font-semibold mb-4">트레일러</h3>
            {animeDetails?.trailerUrl && (
              <iframe
                width="100%"
                height="350"  
                src={animeDetails.trailerUrl.replace("watch?v=", "embed/")}
                title={animeDetails.koreanName}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
        );
      case 'reviews':
        return (
          <div className="p-4">
            <p>리뷰 기능 추가 예정 (리뷰는 클릭했을 때 GraphQL로 Fetch하도록 해주세요. Over 및 Under Fetching 방지)</p>
            <ul>
              <li>리뷰 1: 이걸 보고 암이 낳았습니다. 응애</li>
              <li>리뷰 2: 위에분 맏춤뻡이 너무 극혐이네요 ㅠㅠ 왠만해서는 댇글을 안다는데</li>
              <li>리뷰 3: 너네 일부로 이러는 거지? 어의가 없네. 이러면 않됀다.</li>
            </ul>
          </div>
        );
      case 'similar':
        return (
          <div className="p-4">
            <p>비슷한 작품 목록이 여기 나옵니다. (Labmda로 Modal 접속했을 때 받아오도록 해주세요. 매번 계산하면 Latency가 증가합니다. Elastic Cache에 이미 캐싱된 데이터 있으면 받아오지 말고)</p>
            <ul>
              <li>토 나오는 작품 1</li>
              <li>토 나오는 작품 2</li>
              <li>토 나오는 작품 3</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleOutsideClick}
    >
      <div
        className={`bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 relative transition-transform duration-300 ${
          isVisible ? 'animate-fade-in' : 'animate-fade-out'
        }`}
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
          ✖️
        </button>

        <div className="flex flex-col md:flex-row border-b border-gray-300 pb-6 mb-6">
          <div className="flex-shrink-0 w-full md:w-1/3">
            <img src={animeDetails?.largeImageUrl} alt={animeDetails?.koreanName} className="rounded-lg object-cover w-full" />
          </div>

          <div className="mt-4 md:mt-0 md:ml-6 flex-grow">
            <h2 className="text-3xl font-bold mb-2">{animeDetails?.koreanName}</h2>
            <p className="text-gray-500 mb-4">{animeDetails?.japanesesName}</p>
            <p className="text-gray-700 mb-2"><strong>제작사:</strong> {animeDetails?.productionCompany}</p>
            <p className="text-gray-700 mb-2"><strong>장르:</strong> {animeDetails?.genre}</p>
            <p className="text-gray-700 mb-2"><strong>평점:</strong> {animeDetails?.score} / 10</p>
            <p className="text-gray-700 mb-2"><strong>등급:</strong> {animeDetails?.rating}</p>
            <p className="text-gray-700 mb-2"><strong>출처:</strong> {animeDetails?.source}</p>
            <p className="mt-2">
              <a href={animeDetails?.animelistUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                MyAnimeList에서 보기
              </a>
            </p>
          </div>
        </div>

        <Tabs onTabChange={setActiveTab} />

        <div className="mt-4">
          {isLoading ? <p>로딩 중...</p> : renderTabContent()} 
        </div>
      </div>
    </div>
  );
};

export default Modal;
