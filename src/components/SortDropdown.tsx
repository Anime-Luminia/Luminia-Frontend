import React from 'react';

interface SortDropdownProps {
  sortBy: string;
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  sortBy,
  onSortChange,
}) => {
  return (
    <div className='absolute top-0 right-0 p-2'>
      <select
        value={sortBy}
        onChange={onSortChange}
        className='p-2 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500'
      >
        <option value='koreanName'>이름순</option>
        <option value='latest'>최신순</option>
        <option value='popular'>인기순</option>
        <option value='recommended'>추천순</option>
      </select>
    </div>
  );
};

export default SortDropdown;
