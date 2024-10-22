import React, { useState } from 'react';
import { FaChevronDown, FaInfoCircle } from 'react-icons/fa';

interface ReviewFormProps {
  loggedIn: boolean;
  reviewText: string;
  setReviewText: (value: string) => void;
  isSpoiler: boolean;
  setIsSpoiler: (value: boolean) => void;
  selectedTier: string | null;
  setSelectedTier: (value: string | null) => void;
  handleSubmit: () => void;
}

const tierOptions = ['S', 'A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'];

const ReviewForm: React.FC<ReviewFormProps> = ({
  loggedIn,
  reviewText,
  setReviewText,
  isSpoiler,
  setIsSpoiler,
  selectedTier,
  setSelectedTier,
  handleSubmit,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const maxLength = 1000;

  return (
    <div className='mb-6'>
      <textarea
        placeholder={
          loggedIn
            ? '이 작품에 대한 내 평가를 남겨보세요!'
            : '로그인 후 리뷰를 남겨보세요!'
        }
        maxLength={maxLength}
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        className='w-full h-48 resize-none border border-gray-300 dark:border-darkInputBorder rounded-md p-4 bg-white dark:bg-darkInputBg text-sm text-gray-900 dark:text-darkTextPrimary shadow-sm focus:outline-none focus:border-purple-600 dark:focus:border-darkTextHighlight focus:ring-2 focus:ring-purple-600 dark:focus:ring-darkTextHighlight transition'
        disabled={!loggedIn}
      ></textarea>

      <div className='flex justify-between items-center text-sm text-gray-500 dark:text-darkTextSecondary mt-1'>
        <div>
          {reviewText.length}/{maxLength}자
        </div>

        <label className='flex items-center font-bold'>
          <input
            type='checkbox'
            checked={isSpoiler}
            onChange={(e) => setIsSpoiler(e.target.checked)}
            className='mr-2 dark:bg-darkInputBg dark:border-darkInputBorder'
            disabled={!loggedIn}
          />
          스포일러
        </label>
      </div>

      <div className='flex items-center justify-between mt-4 flex-wrap space-x-2'>
        <div className='relative flex items-center w-auto'>
          <label
            htmlFor='tier-select'
            className='text-2xl font-bold mr-2 text-gray-700 dark:text-darkTextPrimary flex items-center'
          >
            👑
          </label>

          <div className='relative'>
            <select
              id='tier-select'
              value={selectedTier || ''}
              onChange={(e) => setSelectedTier(e.target.value)}
              className='p-3 border border-gray-300 dark:border-darkInputBorder rounded-lg bg-white dark:bg-darkInputBg text-gray-700 dark:text-darkTextPrimary font-semibold hover:border-purple-500 focus:outline-none focus:border-purple-600 dark:focus:border-darkTextHighlight focus:ring-2 focus:ring-purple-600 dark:focus:ring-darkTextHighlight transition duration-200 appearance-none pr-8 w-auto'
              disabled={!loggedIn}
            >
              <option value=''>티어 선택</option>
              {tierOptions.map((tier) => (
                <option key={tier} value={tier}>
                  {tier}
                </option>
              ))}
            </select>
            <FaChevronDown className='absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 dark:text-darkTextSecondary pointer-events-none' />
          </div>

          <FaInfoCircle
            className='ml-4 text-gray-500 dark:text-darkTextSecondary cursor-pointer hover:text-darkTextHighlight transition-colors'
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          />
          {showTooltip && (
            <div className='absolute top-full mt-2 left-0 z-50 bg-white dark:bg-darkCard border border-gray-300 dark:border-darkInputBorder rounded-lg shadow-lg p-3 text-sm text-gray-700 dark:text-darkTextPrimary w-64'>
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

        <button
          className='bg-accent dark:bg-darkButton text-white dark:text-darkTextPrimary px-4 py-2 rounded-lg shadow-md hover:bg-hover dark:hover:bg-darkButtonHover transition-colors'
          disabled={!loggedIn}
          onClick={handleSubmit}
        >
          리뷰 남기기
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
