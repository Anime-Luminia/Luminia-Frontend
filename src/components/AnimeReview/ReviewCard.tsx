import React from 'react';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ReactComponent as ThumbsUpIcon } from '../../icons/thumbs-up.svg';

interface ReviewCardProps {
  username: string;
  createdAt: string;
  tier: string;
  reviewText: string;
  likes: number;
  profileImage: string;
  isSpoiler: boolean;
  isMyReview?: boolean;
  onEditClick?: () => void;
}

const MAX_LENGTH = 200;

const ReviewCard: React.FC<ReviewCardProps> = ({
  username,
  createdAt,
  tier,
  reviewText,
  likes: initialLikes,
  profileImage,
  isSpoiler,
  isMyReview,
  onEditClick,
}) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [showSpoiler, setShowSpoiler] = useState(!isSpoiler);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const formattedTime = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    locale: ko,
  });

  const handleLikeClick = () => {
    if (isLiked) {
      setLikes((prevLikes) => prevLikes - 1);
    } else {
      setLikes((prevLikes) => prevLikes + 1);
    }
    setIsLiked((prev) => !prev);
  };

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const toggleSpoiler = () => {
    setShowSpoiler(true);
  };

  const shortenedContent =
    reviewText.length > MAX_LENGTH && !showFullContent
      ? `${reviewText.slice(0, MAX_LENGTH)}...`
      : reviewText;

  const tierColor = () => {
    switch (tier) {
      case 'S':
        return 'bg-purple-700 text-white';
      case 'A':
        return 'bg-green-600 text-white';
      case 'B':
        return 'bg-blue-600 text-white';
      case 'C':
        return 'bg-yellow-600 text-white';
      case 'D':
        return 'bg-red-600 text-white';
      default:
        return 'bg-accent text-white';
    }
  };

  return (
    <li className='border-b dark:border-darkBorder py-4'>
      <div className='flex items-center mb-2'>
        <img
          src={profileImage}
          alt={username}
          className='w-10 h-10 rounded-full mr-4'
        />
        <div className='flex-grow'>
          <div className='flex items-center'>
            <span className='font-semibold dark:text-darkTextPrimary'>
              {username}
            </span>
          </div>
          <span className='text-gray-500 dark:text-darkTextSecondary text-sm'>
            {formattedTime}
          </span>
          {isMyReview && (
            <span className='text-xs bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 px-2 py-1 rounded-full ml-2'>
              내 평가
            </span>
          )}
        </div>
        <span
          className={`px-2 py-1 rounded-full font-bold text-sm ${tierColor()} dark:text-darkTextHighlight`}
        >
          {tier} 티어
        </span>
      </div>

      {isSpoiler && !isMyReview && !showSpoiler ? (
        <p
          className='text-gray-500 dark:text-darkTextSecondary cursor-pointer'
          onClick={toggleSpoiler}
        >
          스포일러가 있는 리뷰에요!
        </p>
      ) : (
        <>
          <p className='mb-2 dark:text-darkTextPrimary'>{shortenedContent}</p>
          {reviewText.length > MAX_LENGTH && (
            <button
              className='text-accent dark:text-darkTextHighlight'
              onClick={toggleContent}
            >
              {showFullContent ? '접기' : '더보기'}
            </button>
          )}
        </>
      )}

      <div className='flex items-center justify-between mt-2'>
        <div className='flex items-center'>
          <button
            className={`text-sm flex items-center ${
              isLiked
                ? 'text-accent dark:text-darkTextHighlight'
                : 'text-accent dark:text-darkTextHighlight'
            }`}
            onClick={handleLikeClick}
          >
            <ThumbsUpIcon
              className={`w-4 h-4 mr-1 ${
                isLiked
                  ? 'fill-current text-accent dark:text-darkTextHighlight'
                  : 'text-gray-500 dark:text-darkTextSecondary'
              }`}
            />
            좋아요
          </button>
          <span className='ml-2 text-sm text-gray-500 dark:text-darkTextSecondary'>
            {likes}
          </span>
        </div>
        {isMyReview ? (
          <button
            className='text-gray-400 dark:text-darkTextSecondary hover:text-gray-600 dark:hover:text-darkTextHighlight'
            onClick={onEditClick}
          >
            수정하기
          </button>
        ) : (
          <button className='text-gray-400 dark:text-darkTextSecondary hover:text-gray-600 dark:hover:text-darkTextHighlight'>
            신고하기
          </button>
        )}
      </div>
    </li>
  );
};

export default ReviewCard;
