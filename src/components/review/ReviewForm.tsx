'use client';
import React, { useState } from 'react';
import { supabase } from '@/shared/supabase/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function ReviewForm({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const [toiletRate, setToiletRate] = useState({
    cleanRate: 0,
    locationRate: 0,
    popRate: 0,
  });
  const [reviewContent, setReviewContent] = useState('');

  const handleAddReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!toiletRate.cleanRate || !toiletRate.locationRate || !toiletRate.popRate || !reviewContent) {
      alert('리뷰를 남겨주세요!');
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const newReview = {
      review_id: id,
      user_id: user?.user_metadata.email,
      review_content: reviewContent,
      toilet_id: id,
      user_nickname: user?.user_metadata.display_name,
      toilet_clean_rate: toiletRate.cleanRate,
      toilet_loc_rate: toiletRate.locationRate,
      toilet_pop_rate: toiletRate.popRate,
    };

    if (user) {
      try {
        const { data, error } = await supabase.from('review_info').insert(newReview).select();
        if (error) {
          throw error.message;
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <h2>사용자 리뷰</h2>
      <form onSubmit={handleAddReview}>
        <label>
          청결도
          <select
            value={toiletRate.cleanRate}
            onChange={(e) => {
              const { value } = e.target;
              setToiletRate((prev) => ({ ...prev, cleanRate: +value }));
            }}
          >
            <option>점수를 주세요</option>
            <option value={5}>⭐⭐⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={1}>⭐</option>
          </select>
        </label>
        <label>
          위치
          <select
            value={toiletRate.locationRate}
            onChange={(e) => {
              const { value } = e.target;
              setToiletRate((prev) => ({ ...prev, locationRate: +value }));
            }}
          >
            <option>위치 점수를&nbsp;주세요</option>
            <option value={5}>⭐⭐⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={1}>⭐</option>
          </select>
        </label>
        <label>
          인구밀도
          <select
            value={toiletRate.popRate}
            onChange={(e) => {
              const { value } = e.target;
              setToiletRate((prev) => ({ ...prev, popRate: +value }));
            }}
          >
            <option>인구밀도 정도를&nbsp;매겨주세요</option>
            <option value={5}>⭐⭐⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={1}>⭐</option>
          </select>
        </label>
        <input
          type="text"
          value={reviewContent}
          placeholder="리뷰를 입력해주세요~"
          onChange={(e) => {
            setReviewContent(e.target.value);
          }}
        />
        <button>리뷰를 올려 주세요</button>
      </form>
    </>
  );
}

export default ReviewForm;
