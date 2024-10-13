import React, { useState, useEffect, useRef } from 'react';
import Grid from './Grid'; // Grid 컴포넌트를 가져옴
import { genreOptions } from '../types/genreOptions';
import { animeTypeOptions } from '../types/animeTypeOptions';
import { source } from '../types/sourceOptions';
import Dropdown from './Dropdown';

interface FilterModalProps {
  excludeExplicit: boolean;
  setExcludeExplicit: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProducer: string | undefined;
  setSelectedProducer: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedOriginalType: string | undefined;
  setSelectedOriginalType: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  selectedGenres: Record<string, string>;
  setSelectedGenres: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
  selectedTypes: Record<string, string>;
  setSelectedTypes: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
  selectedSource: Record<string, string>;
  setSelectedSources: React.Dispatch<
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
  selectedOriginalType,
  setSelectedOriginalType,
  selectedGenres,
  setSelectedGenres,
  selectedTypes,
  setSelectedTypes,
  selectedSource,
  setSelectedSources,
  selectedRating,
  setSelectedRating,
}) => {
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false); // 장르 드롭다운 상태 관리
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isSourceDropdownOpen, setIsSourceDropdownOpen] = useState(false);
  const genreDropdownRef = useRef<HTMLDivElement | null>(null); // 드롭다운 감지용 ref
  const typeDropdownRef = useRef<HTMLDivElement | null>(null);
  const sourceDropdownRef = useRef<HTMLDivElement | null>(null);

  // 장르 상태 처리 함수 (3단계: 추가 `+`, 제거 `-`, 선택 해제 `x`)
  const toggleGenre = (genre: string) => {
    if (selectedGenres[genre] === '+') {
      setSelectedGenres({ ...selectedGenres, [genre]: '-' });
    } else if (selectedGenres[genre] === '-') {
      const updatedGenres = { ...selectedGenres };
      delete updatedGenres[genre];
      setSelectedGenres(updatedGenres);
    } else {
      setSelectedGenres({ ...selectedGenres, [genre]: '+' });
    }
  };

  const toggleOther = (type: string) => {
    if (selectedTypes[type] === '+') {
      const updatedTypes = { ...selectedTypes };
      delete updatedTypes[type];
      setSelectedTypes(updatedTypes);
    } else {
      setSelectedTypes({ ...selectedTypes, [type]: '+' });
    }
  };

  const toggleSource = (type: string) => {
    if (selectedSource[type] === '+') {
      const updatedTypes = { ...selectedSource };
      delete updatedTypes[type];
      setSelectedTypes(updatedTypes);
    } else {
      setSelectedTypes({ ...selectedSource, [type]: '+' });
    }
  };

  // 드롭다운 바깥 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        genreDropdownRef.current &&
        !genreDropdownRef.current.contains(event.target as Node)
      ) {
        setIsGenreDropdownOpen(false); // 장르 드롭다운 바깥 클릭 시 닫기
      }
      if (
        typeDropdownRef.current &&
        !typeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsTypeDropdownOpen(false); // 애니 타입 드롭다운 바깥 클릭 시 닫기
      }
      if (
        sourceDropdownRef.current &&
        !sourceDropdownRef.current.contains(event.target as Node)
      ) {
        setIsTypeDropdownOpen(false); // 애니 타입 드롭다운 바깥 클릭 시 닫기
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
            type='genre'
            toggleOption={toggleGenre}
          />
        </div>

        {/* 애니 유형 필터 */}
        <div className='col-span-1' ref={typeDropdownRef}>
          <label className='font-semibold mb-1 block'>애니 유형</label>
          <div
            className='border border-gray-300 p-2 rounded-lg cursor-pointer w-full'
            onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
          >
            애니 유형 선택
          </div>
          <Dropdown
            isOpen={isTypeDropdownOpen}
            setIsOpen={setIsTypeDropdownOpen}
            type='animeType'
            options={animeTypeOptions}
            selectedOptions={selectedTypes}
            toggleOption={toggleOther}
          />
        </div>

        {/* 제작사 입력 */}
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

        {/* 원작 유형 */}
        <div className='col-span-1' ref={sourceDropdownRef}>
          <label className='font-semibold mb-1 block'>원작 유형</label>
          <div
            className='border border-gray-300 p-2 rounded-lg cursor-pointer w-full'
            onClick={() => setIsSourceDropdownOpen(!isSourceDropdownOpen)}
          >
            원작 선택
          </div>
          <Dropdown
            isOpen={isSourceDropdownOpen}
            setIsOpen={setIsSourceDropdownOpen}
            type='source'
            options={source}
            selectedOptions={selectedSource}
            toggleOption={toggleSource}
          />
        </div>

        {/* 등급 */}
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
