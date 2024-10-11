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

const AnimeCard: React.FC<AnimeCardProps> = ({ malId, koreanName, imageUrl, productionCompany, score }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`?modal=${malId}`);
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg overflow-hidden max-w-xs cursor-pointer min-h-[450px] flex flex-col justify-between"
      onClick={handleCardClick}
    >
      <div className="w-full h-80">
        <img src={imageUrl} alt={koreanName} className="w-full h-full object-cover" />
      </div>

      <div className="p-4 flex flex-col justify-between h-full text-center"> {/* 텍스트를 가운데 정렬 */}
        <div>
          <h2 className="text-lg font-semibold mb-1 line-clamp-2 h-16">{koreanName}</h2> {/* KoreanName 부분 */}
        </div>
        <div>
          <p className="text-sm text-gray-600 truncate">제작사: {productionCompany}</p> {/* 제작사 한 줄로 제한 */}
          <p className="text-sm text-gray-800 font-bold">평점: {score}</p> {/* 평점 */}
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
