import React from 'react';

interface SortDropdownProps {
  sortBy: string;
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  sortBy,
  onSortChange,
}) => {
  const sortOptions = [
    { label: '이름 순', value: 'koreanName' },
    { label: '최신 순', value: 'latest' },
    { label: '인기 순', value: 'popular' },
    { label: '추천 순', value: 'recommended' },
  ];

  return (
    <div className='p-2'>
      <select
        value={sortBy}
        onChange={onSortChange}
        className='px-3 py-2 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;
