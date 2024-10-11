import React from 'react';
import AnimeCard from './AnimeCard';
import Grid from './Grid'; // Grid 컴포넌트 import

const AnimeList: React.FC<{ animeList: any[]; showResults: boolean; animatedCards: number[] }> = ({ animeList, showResults, animatedCards }) => {
  return (
    <Grid>
      {animeList.map((anime, index) => (
        <AnimeCard
          key={anime.malId}
          malId={anime.malId}
          koreanName={anime.koreanName}
          imageUrl={anime.imageUrl}
          productionCompany={anime.productionCompany}
          score={anime.score}
          index={index}
          showResults={animatedCards.includes(index)} // 애니메이션 상태 전달
        />
      ))}
    </Grid>
  );
};

export default AnimeList;
