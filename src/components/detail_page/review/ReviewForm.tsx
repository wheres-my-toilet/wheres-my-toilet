'use client';

import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addReview } from '../../../api/reviewQuery/queryFunction';
import { useLoggedInUserStore } from '@/shared/store/LoggedInUser';

function ReviewForm({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const [toiletRate, setToiletRate] = useState({
    cleanRate: 0,
    locationRate: 0,
    popRate: 0,
  });
  const [reviewContent, setReviewContent] = useState('');

  const { email, nickname } = useLoggedInUserStore((state) => state.userData);

  const addMutation = useMutation({
    mutationFn: addReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['review'] });
      setReviewContent('');
      setToiletRate({
        cleanRate: 0,
        locationRate: 0,
        popRate: 0,
      });
    },
  });

  const handleAddReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!toiletRate.cleanRate || !toiletRate.locationRate || !toiletRate.popRate || !reviewContent) {
      alert('리뷰를 남겨주세요!');
      return;
    }
    const newReview = {
      review_id: Math.floor(Math.random() * 500),
      user_id: email,
      review_content: reviewContent,
      toilet_id: id,
      user_nickname: nickname,
      toilet_clean_rate: toiletRate.cleanRate,
      toilet_loc_rate: toiletRate.locationRate,
      toilet_pop_rate: toiletRate.popRate,
    };

    if (email !== '') {
      addMutation.mutate(newReview);
    } else {
      alert('로그인하고 이용해주세요!');
      return;
    }
  };

  return (
    <div className="flex flex-col items-center mb-10">
      <h2 className="text-2xl mb-3 font-medium">사용자 리뷰</h2>
      <form className="flex flex-col items-center gap-4" onSubmit={handleAddReview}>
        <div className="flex flex-col gap-2 w-full">
          <label className="flex items-center justify-between ">
            <p>청결도 :</p>
            <select
              className="text-center"
              value={toiletRate.cleanRate}
              onChange={(e) => {
                const { value } = e.target;
                setToiletRate((prev) => ({ ...prev, cleanRate: +value }));
              }}
            >
              <Option />
            </select>
          </label>
          <label className="flex items-center justify-between">
            <p>위치 :</p>
            <select
              className="text-center"
              value={toiletRate.locationRate}
              onChange={(e) => {
                const { value } = e.target;
                setToiletRate((prev) => ({ ...prev, locationRate: +value }));
              }}
            >
              <Option />
            </select>
          </label>
          <label className="flex items-center justify-between">
            <p>인구밀도 :</p>
            <select
              className="text-center"
              value={toiletRate.popRate}
              onChange={(e) => {
                const { value } = e.target;
                setToiletRate((prev) => ({ ...prev, popRate: +value }));
              }}
            >
              <Option />
            </select>
          </label>
        </div>
        <textarea
          className="w-full h-32 text-base border-2 rounded-lg px-4 py-2 resize-none"
          value={reviewContent}
          placeholder="리뷰를 입력해주세요."
          onChange={(e) => {
            setReviewContent(e.target.value);
          }}
        />
        <button className="w-full py-3 bg-black text-white rounded-lg">리뷰를 올려주세요</button>
      </form>
    </div>
  );
}

export default ReviewForm;

const Option = () => {
  return (
    <>
      <option>-----</option>
      <option value={5}>⭐⭐⭐⭐⭐</option>
      <option value={4}>⭐⭐⭐⭐</option>
      <option value={3}>⭐⭐⭐</option>
      <option value={2}>⭐⭐</option>
      <option value={1}>⭐</option>
    </>
  );
};
