import React, { useState } from 'react';
import Grid from './Grid'; // Grid 컴포넌트를 가져옴

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

const genreOptions = [
  '액션',
  '어드벤처',
  '코미디',
  '드라마',
  '판타지',
  '공포',
  '로맨스',
  'SF',
  '스릴러',
];

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
  // 장르 선택 처리 함수 (3단계: 추가 `+`, 제거 `-`, 선택 해제)
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

  return (
    <div className='mt-4 p-4'>
      <Grid>
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
          <label className='font-semibold mb-1 block'>장르</label>
          <div className='border border-gray-300 p-2 rounded-lg w-full'>
            {genreOptions.map((genre) => (
              <div key={genre} className='flex items-center space-x-2 mb-2'>
                <button
                  className={`${
                    selectedGenres[genre] === '+'
                      ? 'text-green-500'
                      : selectedGenres[genre] === '-'
                        ? 'text-red-500'
                        : 'text-gray-500'
                  }`}
                  onClick={() => toggleGenre(genre)}
                >
                  {selectedGenres[genre] || ' '}
                </button>
                <span>{genre}</span>
              </div>
            ))}
          </div>
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
                      : 'bg-red-100 text-red-700'
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
            선정적인 애니 제외
          </label>
        </div>
      </Grid>
    </div>
  );
};

export default FilterModal;
