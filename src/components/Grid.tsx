import React from 'react';

interface GridProps {
  children: React.ReactNode;
}

const Grid: React.FC<GridProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-screen-xl mx-auto p-4">
      {children}
    </div>
  );
};

export default Grid;
