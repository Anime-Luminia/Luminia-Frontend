import React from 'react';
import AnimeCard from './AnimeCard';
import { Anime } from '../types/Anime';

interface AnimeListProps {
  animeList: Anime[]; // 애니 목록
  lastAnimeElementRef: (node: HTMLDivElement | null) => void; // Ref 콜백 함수
}

const AnimeList: React.FC<AnimeListProps> = ({ animeList, lastAnimeElementRef }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-screen-xl mx-auto p-4">
      {animeList.map((anime, index) => (
        <div
          key={anime.malId}
          ref={animeList.length === index + 1 ? lastAnimeElementRef : null}
        >
          <AnimeCard
            malId={anime.malId}
            koreanName={anime.koreanName}
            imageUrl={anime.imageUrl}
            productionCompany={anime.productionCompany}
            score={anime.score}
            index={index} // index 추가
          />
        </div>
      ))}
    </div>
  );
};

export default AnimeList;
