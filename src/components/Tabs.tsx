import React, { useState } from 'react';

interface TabsProps {
  onTabChange: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('info');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab); 
  };

  return (
    <div className="flex space-x-8 border-b border-gray-300 mb-4">
      <button
        className={`pb-2 text-lg font-semibold transition-colors duration-200 ${activeTab === 'info' ? 'text-purple-600 border-b-4 border-purple-600' : 'text-gray-600 hover:text-purple-400'}`}
        onClick={() => handleTabClick('info')}
      >
        애니메이션 정보
      </button>
      <button
        className={`pb-2 text-lg font-semibold transition-colors duration-200 ${activeTab === 'reviews' ? 'text-purple-600 border-b-4 border-purple-600' : 'text-gray-600 hover:text-purple-400'}`}
        onClick={() => handleTabClick('reviews')}
      >
        리뷰
      </button>
      <button
        className={`pb-2 text-lg font-semibold transition-colors duration-200 ${activeTab === 'similar' ? 'text-purple-600 border-b-4 border-purple-600' : 'text-gray-600 hover:text-purple-400'}`}
        onClick={() => handleTabClick('similar')}
      >
        비슷한 작품
      </button>
    </div>
  );
};

export default Tabs;
