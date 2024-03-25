'use client';

import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
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

  const { data, isLoading, isError } = useQuery({
    queryKey: ['tips'],
    queryFn: getTips,
  });

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: 'left' | 'right'): void => {
    const container = scrollContainerRef.current;
    if (container) {
      // Assume each card has margin-right of 16px for example
      const cardWidth = container.firstChild ? (container.firstChild as HTMLElement).offsetWidth + 16 : 0;
      const scrollAmount = cardWidth;
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
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred</div>;
  }

  return (
    <div>
      <div className="m-full flex items-center justify-center gap-[27%]">
        <button onClick={() => handleScroll('left')} className="mr-2 text-4xl">
          {'←'}
        </button>
        <button onClick={() => handleScroll('right')} className="ml-2 text-4xl">
          {'→'}
        </button>
      </div>
      <div className="flex justify-center items-center mt-8">
        <div className="w-full md:w-4/5 lg:w-3/4 flex overflow-x-auto snap-x snap-mandatory" ref={scrollContainerRef}>
          {data?.map((item) => (
            <div
              className="snap-start shrink-0 w-full flex justify-center md:min-w-[50%] lg:min-w-[calc(50%-8px)] mx-2"
              key={item.id}
            >
              <TipCard tip={item} handleCardClick={() => handleCardClick(item)} />
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && selectedTip && <TipModal tip={selectedTip} handleCloseModal={handleCloseModal} />}
    </div>
  );
};

export default TipList;
