'use client';

import React from 'react';
import { Tip } from './TipList'; // Tip 타입 임포트

interface TipCardProps {
  tip: Tip;
  handleCardClick: () => void;
}

const TipCard: React.FC<TipCardProps> = ({ tip, handleCardClick }) => {
  return (
    <div className="border-black border-2 h-64 w-80" onClick={handleCardClick}>
      <img src={tip.tip_photos} className="w-80 h-40" />
      <p className="truncate">{tip.title}</p>
      <p className="truncate">{tip.content}</p>
    </div>
  );
};

export default TipCard;
