'use client';
import React, { useState } from 'react';
import { review_info } from './ReviewInfo';
import { supabase } from '@/shared/supabase/supabase';

function ReviewForm({ id }: { id: number }) {
  const [toiletCleanRate, setToiletCleanRate] = useState(0);
  const [toiletLocRate, setToiletLocRate] = useState(0);
  const [toiletPopRate, setToiletPopRate] = useState(0);
  const [reviewContent, setReviewContent] = useState('');
  const onSubmitAddReview = async (e: React.FormEvent<HTMLFormElement>) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    e.preventDefault();
    const newReview: review_info = {
      review_id: id,
      review_createdat: Date.now().toString(),
      user_id: '', // user?.email,
      review_content: reviewContent,
      toilet_id: id,
      user_nickname: '', // display Name 어떻게 받아올까요....
      toilet_clean_rate: toiletCleanRate,
      toilet_loc_rate: toiletLocRate,
      toilet_pop_rate: toiletPopRate,
    };

    // const { data, error } = await supabase.from('review_info').update(newReview).eq('user_id', user?.email).select();
  };
  return (
    <>
      <h2>사용자 리뷰</h2>
      <form onSubmit={onSubmitAddReview}>
        <label>
          청결도
          <select
            value={toiletCleanRate}
            onChange={(e) => {
              const { value } = e.target;
              setToiletCleanRate(Number(value));
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
            value={toiletLocRate}
            onChange={(e) => {
              const { value } = e.target;
              setToiletLocRate(Number(value));
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
            value={toiletPopRate}
            onChange={(e) => {
              const { value } = e.target;
              setToiletPopRate(Number(value));
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
