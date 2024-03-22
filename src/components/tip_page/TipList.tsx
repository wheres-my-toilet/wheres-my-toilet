'use client';

import { supabase } from '@/shared/supabase/supabase';
import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import TipCard from './TipCard';
import TipModal from './TipModal';

export type Tip = {
  id: string;
  create_at: string;
  title: string;
  content: string;
  tip_photos: string;
};

const TipList = () => {
  const [selectedTip, setSelectedTip] = useState<Tip | null>(null); // 선택된 팁 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const fetchData = async (): Promise<Tip[]> => {
    try {
      const { data, error } = await supabase.from('tip').select('*');
      console.log(data);
      if (error) {
        console.error(error);
        throw error;
      }
      if (data !== null) {
        return data as Tip[];
      }
      return [];
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleScroll = (direction: 'left' | 'right'): void => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.offsetWidth + 200;
      container.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    }
  };

  // 카드 클릭 핸들러: 모달을 열고 선택된 팁 정보를 설정
  const handleCardClick = (tip: Tip) => {
    setSelectedTip(tip);
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['tips'],
    queryFn: fetchData,
  });

  if (isLoading) {
    return <div>로딩중</div>;
  }
  if (isError) {
    return <div>에러 발생</div>;
  }

  console.log(data);

  return (
    <div className="flex justify-center items-center mt-12">
      <button onClick={() => handleScroll('left')} className="mr-2 text-4xl">
        {'<'}
      </button>
      <div className="w-4/5 flex gap-4 overflow-x-hidden" ref={scrollContainerRef}>
        {data?.map((item) => (
          <TipCard key={item.id} tip={item} handleCardClick={() => handleCardClick(item)} />
        ))}
      </div>
      <button onClick={() => handleScroll('right')} className="ml-2 text-4xl">
        {'>'}
      </button>
      {isModalOpen && selectedTip && <TipModal tip={selectedTip} handleCloseModal={handleCloseModal} />}
    </div>
  );
};

export default TipList;
