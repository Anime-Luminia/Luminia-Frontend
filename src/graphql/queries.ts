import { gql } from '@apollo/client';

export const GET_ANIME_WITH_STATISTICS = gql`
  query GetAnimeWithStatistics($animeId: ID!, $limit: Int!, $cursor: String!) {
    getReviewsByAnime(
      animeId: $animeId
      after: $cursor
      sortedOrder: LATEST
      size: $limit
    ) {
      reviews {
        id
        reviewText
        tier
        createdAt
      }
      pageInfo {
        hasNext
      }
      stats {
        totalReviews
        averageScore
      }
    }
  }
`;

// 추가 리뷰를 가져오는 쿼리
export const GET_MORE_REVIEWS = gql`
  query GetMoreReviews($animeId: ID!, $limit: Int!, $cursor: String!) {
    getReviewsByAnime(
      animeId: $animeId
      after: $cursor
      sortedOrder: LATEST
      size: $limit
    ) {
      reviews {
        id
        reviewText
        tier
        createdAt
      }
      pageInfo {
        hasNext
      }
    }
  }
`;
