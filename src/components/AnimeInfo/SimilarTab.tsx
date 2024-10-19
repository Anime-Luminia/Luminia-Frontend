import React from 'react';

const SimilarTab: React.FC = () => {
  return (
    <div className='p-4'>
      <p>
        비슷한 작품 목록이 여기 나옵니다. (Lambda로 Modal 접속했을 때 받아오도록
        해주세요. 매번 계산하면 Latency가 증가합니다. Elastic Cache에 이미
        캐싱된 데이터 있으면 받아오지 말고)
      </p>
      <ul>
        <li>토 나오는 작품 1</li>
        <li>토 나오는 작품 2</li>
        <li>토 나오는 작품 3</li>
      </ul>
    </div>
  );
};

export default SimilarTab;
