import React from 'react';
import AnimeCard from './AnimeCard';
import Grid from './Grid';  

interface AnimeListProps {
  animeList: Array<{ 
    malId: number;
    koreanName: string;
    imageUrl: string;
    productionCompany: string;
    score: number;
  }>;
}

const AnimeList: React.FC<AnimeListProps> = ({ animeList }) => {
  return (
    <Grid> 
      {animeList.map((anime) => (
        <AnimeCard
          key={anime.malId} 
          malId={anime.malId}
          koreanName={anime.koreanName}
          imageUrl={anime.imageUrl}
          productionCompany={anime.productionCompany}
          score={anime.score}
        />
      ))}
    </Grid>
  );
};

export default AnimeList;
