import { gql } from '@apollo/client';

export const GET_ANIME_WITH_STATISTICS = gql`
  query GetAnimeWithStatistics($animeId: ID!, $limit: Int!, $cursor: String) {
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
        isSpoiler
      }
      pageInfo {
        hasNext
      }
      stats {
        totalReviews
        averageScore
      }
      myReview {
        createdAt
        id
        isSpoiler
        reviewText
        tier
      }
    }
  }
`;

// 추가 리뷰를 가져오는 쿼리
export const GET_MORE_REVIEWS = gql`
  query GetMoreReviews($animeId: ID!, $limit: Int!, $cursor: String) {
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

export const POST_REVIEW = gql`
  mutation CreateReview($input: reviewPostInput!) {
    createReview(input: $input) {
      id
      reviewText
      tier
      isSpoiler
      createdAt
    }
  }
`;

export const UPDATE_REVIEW = gql`
  mutation UpdateReview($input: reviewUpdateInput!) {
    updateReview(input: $input) {
      id
      reviewText
      tier
      isSpoiler
      updatedAt
    }
  }
`;
