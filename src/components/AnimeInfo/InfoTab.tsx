import React from 'react';
import { AnimeDetails } from '../../types/AnimeDetails';

interface InfoTabProps {
  animeDetails: AnimeDetails | null;
}

const InfoTab: React.FC<InfoTabProps> = ({ animeDetails }) => {
  return (
    <div className='p-4'>
      <h3 className='text-2xl font-semibold mb-4'>트레일러</h3>
      {animeDetails?.trailerUrl && (
        <iframe
          width='100%'
          height='350'
          src={animeDetails.trailerUrl.replace('watch?v=', 'embed/')}
          title={animeDetails.koreanName}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default InfoTab;
