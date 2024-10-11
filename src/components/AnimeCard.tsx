import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AnimeCardProps {
  malId: number;
  koreanName: string;
  imageUrl: string;
  productionCompany: string;
  score: number;
  index: number;
  showResults: boolean; // showResults 추가
}

const AnimeCard: React.FC<AnimeCardProps> = ({ malId, koreanName, imageUrl, productionCompany, score, index, showResults }) => {
  const navigate = useNavigate(); 

  const handleCardClick = () => {
    navigate(`?modal=${malId}`);
  };

  return (
    <div
      className={`bg-white shadow-md rounded-lg overflow-hidden max-w-xs cursor-pointer transform transition-all duration-500 ease-in-out 
        ${showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} // 애니메이션 효과 추가
      style={{ transitionDelay: `${index * 100}ms` }} // 각 카드에 시간차 애니메이션 적용
      onClick={handleCardClick}  
    >
      <div className="w-full h-80">
        <img src={imageUrl} alt={koreanName} className="w-full h-full object-cover" />
      </div>

      <div className="p-4 text-center">
        <h2 className="text-lg font-semibold mb-1 truncate">{koreanName}</h2>
        <p className="text-sm text-gray-600">제작사: {productionCompany}</p>
        <p className="text-sm text-gray-800 font-bold">평점: {score}</p>
      </div>
    </div>
  );
};

export default AnimeCard;
