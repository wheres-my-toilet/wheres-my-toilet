'use client';

import React from 'react';
import { Tip } from './TipList'; // Tip 타입 임포트

interface TipModalProps {
  tip: Tip;
  handleCloseModal: () => void;
}

const TipModal: React.FC<TipModalProps> = ({ tip, handleCloseModal }) => {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-4/6 min-h-72">
        <button className="absolute top-2 right-2 text-gray-500" onClick={handleCloseModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-4">{tip.title}</h2>
        {tip.tip_photos ? (
          <>
            <img src={tip.tip_photos} alt="tip 사진입니다." />
          </>
        ) : (
          <></>
        )}

        <p>{tip.content}</p>
      </div>
    </div>
  );
};

export default TipModal;
