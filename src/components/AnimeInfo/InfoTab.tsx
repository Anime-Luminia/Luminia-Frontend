import React from 'react';
import { AnimeDetails } from '../../types/AnimeDetails';

interface InfoTabProps {
  animeDetails: AnimeDetails | null;
}

const InfoTab: React.FC<InfoTabProps> = ({ animeDetails }) => {
  const handleReport = () => {
    // 여기에 잘못된 정보 신고 처리 로직 추가
    alert('잘못된 정보를 신고하셨습니다.');
  };

  return (
    <div className='p-4'>
      <h3 className='text-2xl font-semibold mb-4'>트레일러</h3>
      {animeDetails?.trailerUrl ? (
        <iframe
          width='100%'
          height='500'
          src={animeDetails.trailerUrl.replace('watch?v=', 'embed/')}
          title={animeDetails.koreanName}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      ) : (
        <p>트레일러 정보가 없습니다.</p>
      )}

      <h3 className='text-2xl font-semibold mt-8 mb-4'>줄거리</h3>

      <button
        onClick={handleReport}
        className='mt-6 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors'
      >
        잘못된 정보 신고하기
      </button>
    </div>
  );
};

export default InfoTab;
