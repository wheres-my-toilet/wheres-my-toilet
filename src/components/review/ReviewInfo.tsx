'use client';
import { supabase } from '@/shared/supabase/supabase';
import React, { useEffect, useState } from 'react';
import { getLocationDate } from './getLocationDate';

export type review_info = {
  review_content: string | null;
  review_createdat: string;
  review_id: number;
  toilet_clean_rate: number | null;
  toilet_id: number | null;
  toilet_loc_rate: number | null;
  toilet_pop_rate: number | null;
  user_id: string | null;
  user_nickname: string | null;
};

function ReviewInfo({ id }: { id: number }) {
  const [review, setReview] = useState<review_info[]>([]);
  const [user, setUser] = useState<string | null>('');
  const [changeMode, setChangeMode] = useState(false);
  const [changeText, setChangeText] = useState('');
  useEffect(() => {
    const getReview = async () => {
      try {
        const { data: review_info, error } = await supabase.from('review_info').select('*').eq('toilet_id', id);
        if (error) {
          throw error;
        }
        setReview(review_info);
      } catch (error) {}
    };
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      // setUser(user?.email);
    };

    getReview();
  }, [id]);

  const getRate = (toiletCleanRate: number | null, toiletLocRate: number | null, toiletPopRate: number | null) => {
    const result = ((toiletCleanRate ?? 0) + (toiletLocRate ?? 0) + (toiletPopRate ?? 0)) / 3;
    if (result === 5) return `⭐⭐⭐⭐⭐`;
    if (result > 4) return `⭐⭐⭐⭐`;
    if (result > 3) return `⭐⭐⭐`;
    if (result > 2) return `⭐⭐ `;
    if (result === 1) return `⭐`;
  };
  const onClickDeleteReview = async () => {
    // const { error } = await supabase.from('review_info').delete().eq('user_id', user);
  };
  const onClickChangeReview = async (user_id: string | null) => {
    const { data, error } = await supabase
      .from('review_info')
      .update({ review_content: changeText })
      // .eq('user_id', user_id)
      .select();
  };
  return (
    <>
      <h2>평점</h2>
      {review.length === 0 ? (
        <>
          <h3>평점이 없어요ㅠㅠ 평점을 등록해주세요</h3>
        </>
      ) : (
        <>
          {review.map((info) => {
            return (
              <div>
                <p>닉네임 : {info.user_nickname}</p>
                <div>
                  <span>작성일 : {getLocationDate(info.review_createdat)}</span>
                  <span>{getRate(info.toilet_clean_rate, info.toilet_loc_rate, info.toilet_pop_rate)}</span>
                  <div>
                    {changeMode ? (
                      <>
                        <input
                          type="text"
                          value={changeText}
                          onChange={(e) => {
                            setChangeText(e.target.value);
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <p>{info.review_content}</p>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  {user === info.user_id && (
                    <>
                      <button onClick={() => onClickChangeReview(info.user_id)}>수정</button>
                      <button onClick={onClickDeleteReview}>삭제</button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
}

export default ReviewInfo;
