import React, { useEffect, useRef } from 'react';

interface DropdownProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  options: string[];
  selectedOptions: Record<string, string>;
  toggleOption: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  setIsOpen,
  options,
  selectedOptions,
  toggleOption,
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);

  const renderGenreIcon = (status: string) => {
    if (status === '+') {
      return (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          color='#2ECC71'
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
      return (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          color='#F16361'
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
            d='M8 11h8v2H8v-2z'
            fill='currentColor'
          />
        </svg>
      );
    } else {
      return (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          color='#D3D3D3'
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
        </svg>
      );
    }
  };

  return (
    <div className='relative'>
      {isOpen && (
        <div
          ref={dropdownRef}
          className='absolute z-10 mt-2 p-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-72 overflow-y-auto grid grid-cols-2 gap-2'
          style={{ width: '100%' }}
        >
          <div className='grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-32'>
            {' '}
            {options.map((option) => (
              <div key={option} className='flex items-center space-x-1 px-2'>
                <span
                  className={`check-label cursor-pointer ${
                    selectedOptions[option] === '+'
                      ? 'active'
                      : selectedOptions[option] === '-'
                        ? 'negative'
                        : ''
                  }`}
                  onClick={() => toggleOption(option)}
                >
                  {renderGenreIcon(selectedOptions[option] || '')}
                </span>
                <div className='ml-2 whitespace-nowrap '>{option}</div>{' '}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
