import React, { useState, useRef, useEffect } from 'react';
import ReviewCard from './ReviewCard';
import { FaChevronDown, FaInfoCircle } from 'react-icons/fa';
import { useQuery } from '@apollo/client';
import {
  GET_ANIME_WITH_STATISTICS,
  GET_MORE_REVIEWS,
} from '../../graphql/queries';

interface Review {
  id: number;
  username: string;
  date: string;
  tier: string;
  content: string;
  likes: number;
  profileImage: string;
  isSpoiler: boolean;
}

const sampleReviews: Review[] = [
  {
    id: 1,
    username: '하츄핑',
    date: '2024년 10월 12일',
    tier: 'F',
    content: '쓰레기 같은 작품',
    likes: 1,
    profileImage: 'Luminia.webp',
    isSpoiler: false,
  },
  {
    id: 2,
    username: '좇문가',
    date: '2024년 10월 10일',
    tier: 'F',
    content:
      '너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ 너무 별로던뎅 ㅋㅋ ',
    likes: 5,
    profileImage: 'Luminia.webp',
    isSpoiler: false,
  },
  {
    id: 3,
    username: '김철수',
    date: '2024년 10월 10일',
    tier: 'C+',
    content: '솔직히 이 작품은 크게 기대하지 않았는데, 생각보다 괜찮았어요!',
    likes: 5,
    profileImage: 'Luminia.webp',
    isSpoiler: true,
  },
  {
    id: 4,
    username: '김철수',
    date: '2024년 10월 10일',
    tier: 'C+',
    content:
      '솔직히 이 작품은 크게 기대하지 않았는데, 생각보다 괜찮았어요!솔직히 이 작품은 크게 기대하지 않았는데, 생각보다 괜찮았어요!솔직히 이 작품은 크게 기대하지 않았는데, 생각보다 괜찮았어요!솔직히 이 작품은 크게 기대하지 않았는데, 생각보다 괜찮았어요!솔직히 이 작품은 크게 기대하지 않았는데, 생각보다 괜찮았어요!솔직히 이 작품은 크게 기대하지 않았는데, 생각보다 괜찮았어요!솔직히 이 작품은 크게 기대하지 않았는데, 생각보다 괜찮았어요!솔직히 이 작품은 크게 기대하지 않았는데, 생각보다 괜찮았어요!솔직히 이 작품은 크게 기대하지 않았는데, 생각보다 괜찮았어요!솔직히 이 작품은 크게 기대하지 않았는데, 생각보다 괜찮았어요!솔직히 이 작품은 크게 기대하지 않았는데, 생각보다 괜찮았어요!솔직히 이 작품은 크게 기대하지 않았는데, 생각보다 괜찮았어요!솔직히 이 작품은 크게 기대하지 않았는데, 생각보다 괜찮았어요!솔직히 이 작품은 크게 기대하지 않았는데, 생각보다 괜찮았어요!솔직히 이 작품은 크게 기대하지 않았는데, 생각보다 괜찮았어요!솔직히 이 작품은 크게 기대하지 않았는데, 생각보다 괜찮았어요!솔직히 이 작품은 크게 기대하지 않았는데, 생각보다 괜찮았어요!솔직히 이 작품은 크게 기대하지 않았는데, 생각보다 괜찮았어요!솔직히 이 작품은 크게 기대하지 않았는데, 생각보다 괜찮았어요!솔직히 이 작품은 크게 기대하지 않았는데, 생각보다 괜찮았어요!솔직히 이 작품은 크게 기대하지 않았는데, 생각보다 괜찮았어요!솔직히 이 작품은 크게 기대하지 않았는데, 생각보다 괜찮았어요!솔직히 이 작품은 크게 기대하지 않았는데, 생각보다 괜찮았어요!솔직히 이 작품은 크게 기대하지 않았는데, 생각보다 괜찮았어요!솔직히 이 작품은 크게 기대하지 않았는데, 생각보다 괜찮았어요!솔직히 이 작품은 크게 기대하지 않았는데, 생각보다 괜찮았어요!솔직히 이 작품은 크게 기대하지 않았는데, 생각보다 괜찮았어요!솔직히 이 작품은 크게 기대하지 않았는데, 생각보다 괜찮았어요!솔직히 이 작품은 크게 기대하지 않았는데, 생각보다 괜찮았어요!',
    likes: 5,
    profileImage: 'Luminia.webp',
    isSpoiler: true,
  },
];

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

interface ReviewsTabProps {
  malId: string;
}

const ReviewsTab: React.FC<ReviewsTabProps> = ({ malId }) => {
  const [reviews, setReviews] = useState(sampleReviews);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [averageTier, setAverageTier] = useState('S');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [hasNextPage, setHasNextPage] = useState(true);
  const [cursor, setCursor] = useState<string | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { loading, data, fetchMore, error } = useQuery(
    GET_ANIME_WITH_STATISTICS,
    {
      variables: { animeId: malId, limit: 10, cursor: cursor ?? '' },
      onError: (err) => {
        console.error('Error fetching reviews', err);
        setErrorMessage('리뷰 데이터를 불러오는 중 문제가 발생했습니다.');
      },
    }
  );

  const maxLength = 1000;

  useEffect(() => {
    if (data) {
      setReviews(data.getReviewsByAnime.reviews);
      setHasNextPage(data.getReviewsByAnime.pageInfo.hasNext);
      setCursor(data.getReviewsByAnime.pageInfo.cursor);
    }
  }, [data]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage) {
        // 추가 리뷰 요청
        fetchMore({
          query: GET_MORE_REVIEWS,
          variables: { animeId: malId, limit: 10, cursor },
        }).then((newData) => {
          const newReviews = newData.data.reviews.edges.map(
            (edge: any) => edge.node
          );
          setReviews((prev) => [...prev, ...newReviews]);
          setHasNextPage(newData.data.reviews.pageInfo.hasNextPage);
          setCursor(newData.data.reviews.pageInfo.cursor);
        });
      }
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [cursor, hasNextPage]);

  const handleSortChange = (sortType: string) => {
    let sortedReviews = [...reviews];
    if (sortType === 'mostLiked') {
      sortedReviews = sortedReviews.sort((a, b) => b.likes - a.likes);
    } else if (sortType === 'newest') {
      sortedReviews = sortedReviews.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
    setReviews(sortedReviews);
  };

  return (
    <div className='p-4'>
      {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
      <div className='flex flex-row justify-center mb-2 gap-16'>
        <div className='flex flex-col items-center justify-center text-center'>
          <h2 className='text-4xl font-bold text-black mb-2'>D+</h2>

          <p className='text-lg text-gray-500 mb-2'>34,431개의 리뷰</p>

          <hr className='w-2/3 border-t-2 border-gray-200 mb-3' />
          <p className='text-sm text-gray-600'>
            {tierDescriptions[averageTier]}
          </p>
        </div>
        <div className='hidden md:flex flex-row justify-between mb-4'>
          {['S', 'A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'].map(
            (tier, index) => {
              const percentage = Math.random() * 100;
              const isMax = percentage > 90; // 90% 이상인 값에 대해 강조
              return (
                <div key={tier} className='flex flex-col items-center mx-2'>
                  <span className='text-gray-700 mb-1'>{tier}</span>
                  <div className={`w-10 h-48 bg-gray-200 rounded relative`}>
                    <div
                      className={`w-full rounded absolute bottom-0 ${isMax ? 'bg-superAccent' : 'bg-accent'}`}
                      style={{ height: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>

      <div className='mb-6'>
        <textarea
          placeholder='이 작품에 대한 내 평가를 남겨보세요!'
          maxLength={1000}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className='w-full h-48 resize-none border border-gray-300 rounded-md p-4 bg-white text-sm text-gray-900 shadow-sm focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600 transition'
        ></textarea>

        <div className='flex justify-between items-center text-sm text-gray-500 mt-1'>
          <div>
            {reviewText.length}/{maxLength}자
          </div>

          <label className='flex items-center font-bold'>
            <input
              type='checkbox'
              checked={isSpoiler}
              onChange={(e) => setIsSpoiler(e.target.checked)}
              className='mr-2'
            />
            스포일러
          </label>
        </div>

        <div className='flex items-center justify-between mt-4 flex-wrap space-x-2'>
          <div className='relative flex items-center w-auto'>
            <label
              htmlFor='tier-select'
              className='text-2xl font-bold mr-2 text-gray-700 flex items-center'
            >
              👑
            </label>

            <div className='relative'>
              <select
                id='tier-select'
                value={selectedTier || ''}
                onChange={(e) => setSelectedTier(e.target.value)}
                className='p-3 border border-gray-300 rounded-lg bg-white text-gray-700 font-semibold hover:border-purple-500 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600 transition duration-200 appearance-none pr-8 w-auto'
              >
                <option value=''>티어 선택</option>
                {['S', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'].map(
                  (tier) => (
                    <option key={tier} value={tier}>
                      {tier}
                    </option>
                  )
                )}
              </select>
              <FaChevronDown className='absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 pointer-events-none' />
            </div>

            <FaInfoCircle
              className='ml-4 text-gray-500 cursor-pointer hover:text- transition-colors'
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            />
            {showTooltip && (
              <div className='absolute top-full mt-2 left-0 z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-3 text-sm text-gray-700 w-64'>
                <p className='font-semibold mb-2'>티어 기준:</p>
                <ul className='list-disc pl-4'>
                  <li>S: 걸작</li>
                  <li>A: 매우 좋음</li>
                  <li>B+: 좋음</li>
                  <li>B: 괜찮음</li>
                  <li>C+: 보통</li>
                  <li>C: 약간 부족</li>
                  <li>D+: 부족</li>
                  <li>D: 매우 부족</li>
                  <li>F: 완전 실패</li>
                </ul>
              </div>
            )}
          </div>

          <button className='bg-accent text-white px-4 py-2 rounded-lg shadow-md hover:bg-hover transition-colors'>
            리뷰 남기기
          </button>
        </div>
      </div>

      <hr className='my-8 border-gray-300' />

      <div className='flex items-center justify-between mb-4'>
        <div>
          <span className='font-bold'>리뷰 {reviews.length}</span>
        </div>
        <div className='flex items-center'>
          <button
            className='mr-2 text-superAccent'
            onClick={() => handleSortChange('newest')}
          >
            최신순
          </button>
          <button
            className='text-superAccent'
            onClick={() => handleSortChange('mostLiked')}
          >
            좋아요순
          </button>
        </div>
      </div>

      <ul>
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            username={review.username}
            date={review.date}
            tier={review.tier}
            content={review.content}
            likes={review.likes}
            profileImage={review.profileImage}
            isSpoiler={review.isSpoiler}
          />
        ))}
      </ul>

      <div ref={observerRef} className='h-10'></div>
    </div>
  );
};

export default ReviewsTab;
