import React from 'react';

interface AnimeCardProps {
  malId: number;
  koreanName: string;
  imageUrl: string;
  productionCompany: string;
  score: number;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ malId, koreanName, imageUrl, productionCompany, score }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-xs flex flex-col items-center">
      <div className="w-full h-80">
        <img
          src={imageUrl}
          alt={koreanName}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="w-full p-4 text-center flex-grow">
        <h2 className="text-lg font-semibold mb-1 line-clamp-2" title={koreanName}>
          {koreanName}
        </h2>
        <p className="text-sm text-gray-600">제작사: {productionCompany}</p>
        <p className="text-sm text-gray-800 font-bold">평점: {score}</p>
      </div>
    </div>
  );
};

export default AnimeCard;
