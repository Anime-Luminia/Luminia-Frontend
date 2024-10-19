import React from 'react';
import { useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { ReactComponent as ThumbsUpIcon } from '../../icons/thumbs-up.svg';

interface ReviewCardProps {
  username: string;
  date: string;
  tier: string;
  content: string;
  likes: number;
  profileImage: string;
  isSpoiler: boolean;
}

const MAX_LENGTH = 200;

const ReviewCard: React.FC<ReviewCardProps> = ({
  username,
  date,
  tier,
  content,
  likes: initialLikes,
  profileImage,
  isSpoiler,
}) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [showSpoiler, setShowSpoiler] = useState(!isSpoiler);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

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
    content.length > MAX_LENGTH && !showFullContent
      ? `${content.slice(0, MAX_LENGTH)}...`
      : content;

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
    <li className='border-b py-4'>
      <div className='flex items-center mb-2'>
        <img
          src={profileImage}
          alt={username}
          className='w-10 h-10 rounded-full mr-4'
        />
        <div className='flex-grow'>
          <span className='font-semibold'>{username}</span>
          <span className='text-gray-500 text-sm ml-2'>{date}</span>
        </div>
        <span
          className={`px-2 py-1 rounded-full font-bold text-sm ${tierColor()}`}
        >
          {tier} 티어
        </span>
      </div>

      {isSpoiler && !showSpoiler ? (
        <p className='text-gray-500 cursor-pointer' onClick={toggleSpoiler}>
          스포일러가 있는 리뷰에요!
        </p>
      ) : (
        <>
          <p className='mb-2'>{shortenedContent}</p>
          {content.length > MAX_LENGTH && (
            <button className='text-accent' onClick={toggleContent}>
              {showFullContent ? '접기' : '더보기'}
            </button>
          )}
        </>
      )}

      <div className='flex items-center justify-between mt-2'>
        <div className='flex items-center'>
          <button
            className={`text-sm flex items-center ${isLiked ? 'text-accent' : 'text-accent'}`}
            onClick={handleLikeClick}
          >
            <ThumbsUpIcon
              className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current text-accent' : 'text-gray-500'}`}
            />
            좋아요
          </button>
          <span className='ml-2 text-sm text-gray-500'>{likes}</span>
        </div>
        <button className='text-gray-400 hover:text-gray-600'>신고하기</button>
      </div>
    </li>
  );
};

export default ReviewCard;
