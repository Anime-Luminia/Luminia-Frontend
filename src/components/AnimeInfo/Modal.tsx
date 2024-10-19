import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Tabs from '../Tabs';
import { api } from '../../api/axios';
import { ApiResponse } from '../../types/response';
import { AnimeDetails } from '../../types/AnimeDetails';
import AnimeInfoSection from './AnimeInfoSection';
import SimilarTab from './SimilarTab';
import ReviewsTab from './ReviewsTab';
import InfoTab from './InfoTab';

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
      const response = await api.get<ApiResponse<AnimeDetails>>(
        `/api/anime/${malId}`
      );

      const data = response.data;

      if (data.success && data.response) {
        setAnimeDetails(data.response);
      } else {
        console.error('Failed to fetch anime details:', data.message);
      }
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return <InfoTab animeDetails={animeDetails} />;
      case 'reviews':
        return <ReviewsTab malId={malId ?? ''} />;
      case 'similar':
        return <SimilarTab />;
      default:
        return null;
    }
  };

  if (!malId || (isLoading && !animeDetails)) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleOutsideClick}
    >
      <div
        className={`bg-white rounded-lg modal-content shadow-lg w-full max-w-4xl p-6 relative transition-transform duration-300 ${
          isVisible ? 'animate-fade-in' : 'animate-fade-out'
        }`}
        style={{ maxHeight: '90vh', overflowY: 'auto', scrollbarWidth: 'none' }}
      >
        <button
          onClick={handleCloseModal}
          className='absolute top-4 right-4 text-gray-600 hover:text-gray-900'
        >
          ✖️
        </button>

        <AnimeInfoSection animeDetails={animeDetails} />

        <Tabs onTabChange={setActiveTab} />

        <div className='mt-4'>
          {isLoading ? <p>로딩 중...</p> : renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Modal;
