import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AnimeCardProps {
  malId: number;
  koreanName: string;
  imageUrl: string;
  productionCompany: string;
  score: number;
  index: number;
}

const AnimeCard: React.FC<AnimeCardProps> = ({
  malId,
  koreanName,
  imageUrl,
  productionCompany,
  score,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`?modal=${malId}`);
  };

  return (
    <div
      className='bg-white shadow-md rounded-lg overflow-hidden max-w-xs cursor-pointer flex flex-col justify-between transform transition-transform duration-300 hover:scale-105'
      onClick={handleCardClick}
    >
      <div className='w-full h-56 sm:h-64'>
        <img
          src={imageUrl}
          alt={koreanName}
          className='w-full h-full object-cover'
        />
      </div>

      <div className='p-4 flex flex-col justify-between text-center'>
        <div className='flex items-center justify-center h-10 sm:h-14'>
          <h2 className='text-base sm:text-lg font-semibold mb-1 line-clamp-2'>
            {koreanName}
          </h2>
        </div>
        <div>
          <p className='text-sm text-gray-600 truncate'>
            제작사: {productionCompany}
          </p>
          <p className='text-sm text-gray-800 font-bold'>평점: {score}</p>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
