'use client';

import React from 'react';
import { Tip } from './TipList'; // Tip 타입 임포트

interface TipCardProps {
  tip: Tip;
  handleCardClick: () => void;
}

const TipCard: React.FC<TipCardProps> = ({ tip, handleCardClick }) => {
  return (
    <div className=" border-black border-2 h-[30rem] w-[32rem] rounded-mg" onClick={handleCardClick}>
      <img src={tip.tip_photos} className="w-[32rem] h-64" />
      <div className=" flex flex-col items-center ">
        <p className="truncate font-bold text-3xl mb-5 mt-3">{tip.title}</p>
        <p className="truncate w-[31rem]">{tip.content}</p>
      </div>
    </div>
  );
};

export default TipCard;
