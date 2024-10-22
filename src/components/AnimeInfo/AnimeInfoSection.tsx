import React from 'react';
import { AnimeDetails } from '../../types/AnimeDetails';

interface AnimeInfoSectionProps {
  animeDetails: AnimeDetails | null;
}

const AnimeInfoSection: React.FC<AnimeInfoSectionProps> = ({
  animeDetails,
}) => {
  if (!animeDetails) {
    return (
      <p className='text-gray-700 dark:text-darkTextPrimary'>
        정보를 불러오는 중입니다...
      </p>
    );
  }

  return (
    <div className='flex flex-col md:flex-row border-b border-gray-300 dark:border-darkDropdownBorder pb-6 mb-6'>
      <div className='flex-shrink-0 w-full md:w-1/3'>
        <img
          src={animeDetails.largeImageUrl}
          alt={animeDetails.koreanName}
          className='rounded-lg object-cover w-full'
        />
      </div>

      <div className='mt-4 md:mt-0 md:ml-6 flex-grow'>
        <h2 className='text-3xl font-bold mb-2 text-gray-900 dark:text-darkTextHighlight'>
          {animeDetails.koreanName}
        </h2>
        <p className='text-gray-500 dark:text-darkTextSecondary mb-4'>
          {animeDetails.japanesesName}
        </p>
        <p className='text-gray-700 dark:text-darkTextPrimary mb-2'>
          <strong>제작사:</strong> {animeDetails.productionCompany}
        </p>
        <p className='text-gray-700 dark:text-darkTextPrimary mb-2'>
          <strong>장르:</strong> {animeDetails.genre}
        </p>
        <p className='text-gray-700 dark:text-darkTextPrimary mb-2'>
          <strong>평점:</strong> {animeDetails.score} / 10
        </p>
        <p className='text-gray-700 dark:text-darkTextPrimary mb-2'>
          <strong>등급:</strong> {animeDetails.rating}
        </p>
        <p className='text-gray-700 dark:text-darkTextPrimary mb-2'>
          <strong>출처:</strong> {animeDetails.source}
        </p>
        <p className='mt-2'>
          <a
            href={animeDetails.animelistUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-500 hover:underline dark:text-blue-400 dark:hover:text-blue-300'
          >
            MyAnimeList에서 보기
          </a>
        </p>
      </div>
    </div>
  );
};

export default AnimeInfoSection;
