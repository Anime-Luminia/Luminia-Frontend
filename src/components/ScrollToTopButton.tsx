import React from 'react';

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
      className='fixed bottom-10 right-10 bg-purple-700 text-white p-2.5 rounded-full shadow-lg hover:bg-purple-600 transition-colors duration-200'
    >
      ▲
    </button>
  );
};

export default ScrollToTopButton;
