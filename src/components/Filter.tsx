import React from 'react';

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
  selectedGenre: string | undefined;
  setSelectedGenre: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedRating: string | undefined;
  setSelectedRating: React.Dispatch<React.SetStateAction<string | undefined>>;
  handleFilterSearch: () => void;
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
  selectedGenre,
  setSelectedGenre,
  selectedRating,
  setSelectedRating,
  handleFilterSearch,
}) => {
  return (
    <div className='mt-4 bg-white p-6 rounded-lg shadow-lg'>
      <div>
        <label className='block font-semibold mb-2'>선정적인 애니 제외</label>
        <input
          type='checkbox'
          checked={excludeExplicit}
          onChange={() => setExcludeExplicit(!excludeExplicit)}
        />
      </div>

      <div>
        <label className='block font-semibold mb-2 mt-4'>제작사</label>
        <input
          type='text'
          className='border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none'
          placeholder='제작사를 입력하세요'
          value={selectedProducer || ''}
          onChange={(e) => setSelectedProducer(e.target.value)}
        />
      </div>

      <div>
        <label className='block font-semibold mb-2'>애니 유형</label>
        <select
          className='border border-gray-300 p-3 rounded-lg w-full'
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
        <label className='block font-semibold mb-2 mt-4'>원작 유형</label>
        <select
          className='border border-gray-300 p-3 rounded-lg w-full'
          value={selectedOriginalType || ''}
          onChange={(e) => setSelectedOriginalType(e.target.value)}
        >
          <option value=''>전체</option>
          <option value='Game'>게임</option>
          <option value='Novel'>소설</option>
        </select>
      </div>

      <div>
        <label className='block font-semibold mb-2 mt-4'>장르</label>
        <input
          type='text'
          className='border border-gray-300 p-3 rounded-lg w-full'
          placeholder='장르를 입력하세요'
          value={selectedGenre || ''}
          onChange={(e) => setSelectedGenre(e.target.value)}
        />
      </div>

      <div>
        <label className='block font-semibold mb-2 mt-4'>등급</label>
        <select
          className='border border-gray-300 p-3 rounded-lg w-full'
          value={selectedRating || ''}
          onChange={(e) => setSelectedRating(e.target.value)}
        >
          <option value=''>전체</option>
          <option value='G'>전체 이용가</option>
          <option value='PG-13'>13세 이상</option>
          <option value='R'>19세 이상</option>
        </select>
      </div>

      <button
        className='bg-purple-700 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg w-full mt-4 transition-colors duration-200'
        onClick={handleFilterSearch}
      >
        필터 적용
      </button>
    </div>
  );
};

export default FilterModal;
