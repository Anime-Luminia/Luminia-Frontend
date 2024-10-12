import React from 'react';
import AnimeCard from './AnimeCard';
import { Anime } from '../types/Anime';
import Grid from './Grid';

interface AnimeListProps {
  animeList: Anime[];
  lastAnimeElementRef: (node: HTMLDivElement | null) => void;
}

const AnimeList: React.FC<AnimeListProps> = ({
  animeList,
  lastAnimeElementRef,
}) => {
  return (
    <Grid>
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
            index={index}
          />
        </div>
      ))}
    </Grid>
  );
};

export default AnimeList;
