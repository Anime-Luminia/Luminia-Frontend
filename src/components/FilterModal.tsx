import React, { useState, useEffect, useRef } from 'react';
import Grid from './Grid'; // Grid 컴포넌트를 가져옴
import { genreOptions } from '../types/genreOptions';
import Dropdown from './Dropdown';

interface FilterModalProps {
  excludeExplicit: boolean;
  setExcludeExplicit: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProducer: string | undefined;
  setSelectedProducer: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedType: string | undefined;
  setSelectedType: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedOriginalType: string | undefined;
  setSelectedOriginalType: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  selectedGenres: Record<string, string>; // 장르 선택 상태 ('+', '-', 없음)
  setSelectedGenres: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
  selectedRating: string | undefined;
  setSelectedRating: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const FilterModal: React.FC<FilterModalProps> = ({
  excludeExplicit,
  setExcludeExplicit,
  selectedProducer,
  setSelectedProducer,
  selectedType,
  setSelectedType,
  selectedOriginalType,
  setSelectedOriginalType,
  selectedGenres,
  setSelectedGenres,
  selectedRating,
  setSelectedRating,
}) => {
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false); // 장르 드롭다운 상태 관리
  const genreDropdownRef = useRef<HTMLDivElement | null>(null); // 드롭다운 감지용 ref

  // 장르 상태 처리 함수 (3단계: 추가 `+`, 제거 `-`, 선택 해제 `x`)
  const toggleGenre = (genre: string) => {
    if (selectedGenres[genre] === '+') {
      setSelectedGenres({ ...selectedGenres, [genre]: '-' });
    } else if (selectedGenres[genre] === '-') {
      setSelectedGenres({ ...selectedGenres, [genre]: 'x' });
    } else if (selectedGenres[genre] === 'x') {
      const updatedGenres = { ...selectedGenres };
      delete updatedGenres[genre];
      setSelectedGenres(updatedGenres);
    } else {
      setSelectedGenres({ ...selectedGenres, [genre]: '+' });
    }
  };

  // 드롭다운 바깥 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        genreDropdownRef.current &&
        !genreDropdownRef.current.contains(event.target as Node)
      ) {
        setIsGenreDropdownOpen(false); // 바깥 클릭 시 닫기
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 각 상태별 SVG 아이콘 정의
  // 각 상태별 SVG 아이콘 정의 (체크와 마이너스 아이콘 분리)
  const renderGenreIcon = (status: string) => {
    if (status === '+') {
      // 체크 상태 (네모박스 없음)
      return (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          color='#2ECC71' // 체크 상태의 색상
        >
          <rect
            x='3'
            y='3'
            width='18'
            height='18'
            rx='2'
            ry='2'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M5 12l5 5L19 7l-1.5-1.5L10 14l-3.5-3.5L5 12z'
            fill='currentColor'
          ></path>
        </svg>
      );
    } else if (status === '-') {
      // 마이너스 상태 (빨간 네모 박스 포함)
      return (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          color='#F16361' // 마이너스 상태의 색상
        >
          <rect
            x='3'
            y='3'
            width='18'
            height='18'
            rx='2'
            ry='2'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M8 11h8v2H8v-2z' // 마이너스 표시
            fill='currentColor'
          />
        </svg>
      );
    } else if (status === 'x') {
      // 비활성 상태
      return (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          color='#95A5A6' // 비활성 상태의 색상
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M18.3 5.71L16.59 4 12 8.59 7.41 4 5.7 5.71 10.29 10.3 5.7 14.88l1.71 1.71L12 12.41l4.59 4.59 1.71-1.71-4.59-4.59L18.3 5.71z'
            fill='currentColor'
          ></path>
        </svg>
      );
    } else {
      return null;
    }
  };

  return (
    <div className='relative mt-4 p-4'>
      <Grid>
        {/* 장르 필터 */}
        <div className='col-span-2' ref={genreDropdownRef}>
          <label className='font-semibold mb-1 block'>장르</label>
          <div
            className='border border-gray-300 p-2 rounded-lg cursor-pointer w-full'
            onClick={() => setIsGenreDropdownOpen(!isGenreDropdownOpen)}
          >
            장르 선택
          </div>
          <Dropdown
            isOpen={isGenreDropdownOpen}
            setIsOpen={setIsGenreDropdownOpen}
            options={genreOptions}
            selectedOptions={selectedGenres}
            toggleOption={toggleGenre}
          />
        </div>

        <div>
          <label className='font-semibold mb-1 block'>제작사</label>
          <input
            type='text'
            className='border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-full'
            placeholder='제작사를 입력하세요'
            value={selectedProducer || ''}
            onChange={(e) => setSelectedProducer(e.target.value)}
          />
        </div>

        <div>
          <label className='font-semibold mb-1 block'>애니 유형</label>
          <select
            className='border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500'
            value={selectedType || ''}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value=''>전체</option>
            <option value='TV'>TV</option>
            <option value='OVA'>OVA</option>
            <option value='Movie'>영화</option>
          </select>
        </div>

        <div>
          <label className='font-semibold mb-1 block'>원작 유형</label>
          <select
            className='border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500'
            value={selectedOriginalType || ''}
            onChange={(e) => setSelectedOriginalType(e.target.value)}
          >
            <option value=''>전체</option>
            <option value='Game'>게임</option>
            <option value='Novel'>소설</option>
          </select>
        </div>

        <div>
          <label className='font-semibold mb-1 block'>등급</label>
          <select
            className='border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500'
            value={selectedRating || ''}
            onChange={(e) => setSelectedRating(e.target.value)}
          >
            <option value=''>전체</option>
            <option value='G'>전체 이용가</option>
            <option value='PG-13'>13세 이상</option>
            <option value='R'>19세 이상</option>
          </select>
        </div>

        {/* 필터 태그를 등급 필터 아래로 이동 */}
        <div className='col-span-2 mt-4'>
          <div className='flex flex-wrap gap-2'>
            {Object.entries(selectedGenres)
              .filter(([_, status]) => status)
              .map(([genre, status]) => (
                <span
                  key={genre}
                  className={`${
                    status === '+'
                      ? 'bg-green-100 text-green-700'
                      : status === '-'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-500 line-through'
                  } px-3 py-1 rounded-full text-sm cursor-pointer`}
                  onClick={() => toggleGenre(genre)}
                >
                  {genre} ({status}) ×
                </span>
              ))}
          </div>
        </div>

        {/* 선정적인 애니 제외 체크박스 */}
        <div className='col-span-2 mt-4 flex items-center'>
          <input
            type='checkbox'
            id='excludeExplicit'
            className='mr-2'
            checked={excludeExplicit}
            onChange={() => setExcludeExplicit(!excludeExplicit)}
          />
          <label htmlFor='excludeExplicit' className='font-semibold'>
            건전한 애니메이션만 표시
          </label>
        </div>
      </Grid>
    </div>
  );
};

export default FilterModal;
