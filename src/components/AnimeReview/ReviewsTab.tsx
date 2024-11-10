import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReviewCard from './ReviewCard';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useRecoilValue } from 'recoil';
import { loggedInState } from '../../recoil/atoms';
import { tierToEnum, scoreToTier } from '../../types/tierToEnum';
import ReviewForm from './ReviewForm';
import {
  GET_ANIME_WITH_STATISTICS,
  GET_MORE_REVIEWS,
  POST_REVIEW,
  UPDATE_REVIEW,
} from '../../graphql/queries';
import throttle from 'lodash/throttle';

interface Review {
  id: number;
  username: string;
  createdAt: string;
  tier: number;
  reviewText: string;
  likes: number;
  profileImage: string;
  isSpoiler: boolean;
}

interface ReviewsTabProps {
  malId: string;
}

const ReviewsTab: React.FC<ReviewsTabProps> = ({ malId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [averageTier, setAverageTier] = useState('S');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [hasNextPage, setHasNextPage] = useState(true);
  const [cursor, setCursor] = useState<string | null>(null);

  const [myReview, setMyReview] = useState<Review | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loggedIn = useRecoilValue(loggedInState);
  const observer = useRef<IntersectionObserver | null>(null);

  const [postReview] = useMutation(POST_REVIEW);
  const [updateReview] = useMutation(UPDATE_REVIEW);

  const tierDescriptions: Record<string, string> = {
    S: '누구나 인정하는 훌륭한 명작입니다!',
    'A+': '대부분이 인정하는 훌륭한 작품입니다!',
    A: '많은 사람들이 즐기는 좋은 작품입니다!',
    'B+': '기대 이상으로 좋았던 작품입니다.',
    B: '나쁘지 않고, 재밌는 부분이 있는 작품입니다.',
    'C+': '평범한 수준이었지만, 나름 괜찮은 작품입니다.',
    C: '조금 아쉬운 부분이 많은 작품입니다.',
    'D+': '별로 추천하지 않는 작품입니다.',
    D: '재미가 없었고, 아쉬운 점이 많습니다.',
    F: '보는 데 시간이 아까운 작품입니다.',
  };

  const [fetchAnimeStatistics, { loading, data }] = useLazyQuery(
    GET_ANIME_WITH_STATISTICS,
    {
      variables: { animeId: malId, limit: 10, cursor: null },
      fetchPolicy: 'cache-and-network',
      onError: (err) => console.error('Error fetching reviews', err),
    }
  );

  const [fetchMoreReviews] = useLazyQuery(GET_MORE_REVIEWS, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (newData) => {
      if (newData?.getReviewsByAnime) {
        const newReviews = newData.getReviewsByAnime.reviews;
        setReviews((prevReviews) => [...prevReviews, ...newReviews]);
        setHasNextPage(newData.getReviewsByAnime.pageInfo.hasNext);
        setCursor(
          newData.getReviewsByAnime.reviews[
            newData.getReviewsByAnime.reviews.length - 1
          ]?.id
        );
      } else {
        setHasNextPage(false);
      }
    },
  });

  const throttledFetchMore = useCallback(
    throttle(() => {
      if (hasNextPage && !loading) {
        fetchMoreReviews({ variables: { animeId: malId, limit: 10, cursor } });
      }
    }, 1000),
    [hasNextPage, loading, cursor]
  );

  const lastReviewElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || !hasNextPage) return; // 이미 로딩 중이거나 마지막 페이지인 경우 중지

      // 기존 Observer 해제
      if (observer.current) observer.current.disconnect();

      // 새로운 Observer 생성
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          throttledFetchMore();
        }
      });

      // 노드가 존재할 경우 감시 시작
      if (node) observer.current.observe(node);
    },
    [throttledFetchMore, loading, hasNextPage]
  );

  useEffect(() => {
    if (data) {
      setReviews(data.getReviewsByAnime.reviews);
      setMyReview(data.getReviewsByAnime.myReview);
      setHasNextPage(data.getReviewsByAnime.pageInfo.hasNext);
      setCursor(
        data.getReviewsByAnime.reviews[
          data.getReviewsByAnime.reviews.length - 1
        ]?.id
      );

      if (observer.current) observer.current.disconnect();
    }
  }, [data]);

  useEffect(() => {
    fetchAnimeStatistics();
  }, [malId]);

  const handleSortChange = (sortType: string) => {
    let sortedReviews = [...reviews];
    if (sortType === 'mostLiked') {
      sortedReviews = sortedReviews.sort((a, b) => b.likes - a.likes);
    } else if (sortType === 'newest') {
      sortedReviews = sortedReviews.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    setReviews(sortedReviews);
  };

  const handleSubmitReview = () => {
    const tierEnumValue = tierToEnum(selectedTier);

    if (isEditMode && myReview) {
      updateReview({
        variables: {
          input: {
            id: myReview.id,
            reviewText,
            tier: tierEnumValue,
            isSpoiler,
          },
        },
      })
        .then((response) => {
          console.log('리뷰 수정 완료:', response.data.updateReview);
          setMyReview({
            ...myReview,
            reviewText: response.data.updateReview.reviewText,
            tier: response.data.updateReview.tier,
            isSpoiler: response.data.updateReview.isSpoiler,
          });
          setIsEditMode(false);
        })
        .catch((error) => {
          console.error('리뷰 수정 중 오류 발생:', error);
        });
    } else {
      postReview({
        variables: {
          input: {
            animeId: malId,
            reviewText,
            tier: tierEnumValue,
            isSpoiler,
          },
        },
      })
        .then((response) => {
          console.log('리뷰 생성 완료:', response.data.createReview);
          setMyReview(response.data.createReview);
          setReviewText('');
          setSelectedTier(null);
          setIsSpoiler(false);
        })
        .catch((error) => {
          console.error('리뷰 생성 중 오류 발생:', error);
        });
    }
  };

  const handleEditClick = () => {
    setReviewText(myReview?.reviewText || '');
    setSelectedTier(scoreToTier(myReview?.tier || null));
    setIsSpoiler(myReview?.isSpoiler || false);
    setIsEditMode(true);
  };

  return (
    <div className='p-4'>
      {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
      <div className='flex flex-row justify-center mb-2 gap-16'>
        <div className='flex flex-col items-center justify-center text-center'>
          <h2 className='text-4xl font-bold text-black mb-2'>D+</h2>
          <p className='text-lg text-gray-500 dark:text-darkTitle mb-2'>
            34,431개의 리뷰
          </p>
          <hr className='w-2/3 border-t-2 border-gray-200 mb-3 dark:border-darkInputBorder' />
          <p className='text-sm text-gray-600 dark:text-darkTextSecondary'>
            {tierDescriptions[averageTier]}
          </p>
        </div>
      </div>

      {!myReview && (
        <ReviewForm
          loggedIn={loggedIn}
          reviewText={reviewText}
          setReviewText={setReviewText}
          isSpoiler={isSpoiler}
          setIsSpoiler={setIsSpoiler}
          selectedTier={selectedTier}
          setSelectedTier={setSelectedTier}
          handleSubmit={handleSubmitReview}
        />
      )}

      {isEditMode && (
        <ReviewForm
          loggedIn={loggedIn}
          reviewText={myReview?.reviewText || ''}
          setReviewText={setReviewText}
          isSpoiler={myReview?.isSpoiler || false}
          setIsSpoiler={setIsSpoiler}
          selectedTier={scoreToTier(myReview?.tier || null)}
          setSelectedTier={setSelectedTier}
          handleSubmit={handleSubmitReview}
        />
      )}

      <hr className='my-8 border-gray-300' />

      <div className='flex items-center justify-between mb-4'>
        <span className='font-bold dark:text-darkTextPrimary'>
          리뷰 {reviews.length}
        </span>
        <div className='flex items-center'>
          <button className='mr-2' onClick={() => handleSortChange('newest')}>
            최신순
          </button>
          <button onClick={() => handleSortChange('mostLiked')}>
            좋아요순
          </button>
        </div>
      </div>

      <ul>
        {myReview && (
          <ReviewCard
            key={myReview.id}
            {...myReview}
            isMyReview={true}
            onEditClick={handleEditClick}
          />
        )}
        {reviews.map((review) => (
          <ReviewCard key={review.id} {...review} isMyReview={false} />
        ))}
      </ul>

      {(myReview || reviews.length) === 0 && (
        <p className='text-center text-gray-500 dark:text-darkTextSecondary'>
          첫번째 리뷰를 남겨주세요!
        </p>
      )}

      {/* IntersectionObserver를 여기에만 설정 */}
      <div ref={lastReviewElementRef} className='h-10' />
    </div>
  );
};

export default ReviewsTab;
