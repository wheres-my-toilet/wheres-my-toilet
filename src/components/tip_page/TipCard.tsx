'use client';

import React from 'react';
import { Tip } from './TipList'; // Tip 타입 임포트

interface TipCardProps {
  tip: Tip;
  handleCardClick: () => void;
}

const TipCard: React.FC<TipCardProps> = ({ tip, handleCardClick }) => {
  return (
    <div
      className="border-black border-2 h-auto sm:h-[30rem] w-[90%] sm:w-[32rem] rounded-mg flex-shrink-0 m-4"
      onClick={handleCardClick}
    >
      <img src={tip.tip_photos} className=" h-80 w-full sm:w-[32rem]" />
      <div className="flex flex-col items-center">
        <p className="truncate font-bold text-xl sm:text-3xl mb-3 mt-3">{tip.title}</p>
        <p className="truncate w-full sm:w-[31rem]">{tip.content}</p>
      </div>
    </div>
  );
};

export default TipCard;
