'use client';

import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState, useEffect } from 'react';
import TipCard from './TipCard';
import TipModal from './TipModal';
import { getTips } from '@/util/tip_page/api';

export type Tip = {
  id: string;
  create_at: string;
  title: string;
  content: string;
  tip_photos: string;
};

const TipList = () => {
  const [selectedTip, setSelectedTip] = useState<Tip | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 데이터 세팅
  const { data, isLoading, isError } = useQuery({
    queryKey: ['tips'],
    queryFn: getTips,
  });

  // 가로 스크롤 관련 로직
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: 'left' | 'right'): void => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.offsetWidth * 0.98;
      container.scrollTo({
        left: direction === 'left' ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleCardClick = (tip: Tip) => {
    setSelectedTip(tip);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <div>로딩중</div>;
  }
  if (isError) {
    return <div>에러 발생</div>;
  }

  return (
    <div>
      <div className="m-full flex items-center justify-center gap-[70%]">
        <button onClick={() => handleScroll('left')} className="mr-2 text-4xl">
          {'←'}
        </button>
        <button onClick={() => handleScroll('right')} className="ml-2 text-4xl">
          {'→'}
        </button>
      </div>
      <div className="flex flex-wrap justify-center items-center mt-8">
        <div className="w-full md:w-4/5 lg:w-3/4 flex overflow-x-hidden" ref={scrollContainerRef}>
          {data?.map((item) => (
            <TipCard key={item.id} tip={item} handleCardClick={() => handleCardClick(item)} />
          ))}
        </div>
        {isModalOpen && selectedTip && <TipModal tip={selectedTip} handleCloseModal={handleCloseModal} />}
      </div>
    </div>
  );
};

export default TipList;
