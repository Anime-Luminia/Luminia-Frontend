import React from 'react';
import { FaArrowUp } from 'react-icons/fa'; // FontAwesome 아이콘 사용

interface ScrollToTopButtonProps {
  showScrollTopButton: boolean;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  showScrollTopButton,
}) => {
  if (!showScrollTopButton) return null;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className='fixed bottom-10 right-10 bg-accent text-white p-3 rounded-full shadow-lg hover:scale-110 hover:bg-buttonHighlight transition-transform duration-300 flex items-center justify-center'
    >
      <FaArrowUp size={20} />
    </button>
  );
};

export default ScrollToTopButton;
