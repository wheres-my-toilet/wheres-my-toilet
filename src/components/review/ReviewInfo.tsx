'use client';
import { supabase } from '@/shared/supabase/supabase';
import React, { useState } from 'react';
import { getLocationDate } from './reviewFunction/getLocationDate';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { changeReview, deleteReview, getReview, getReviewId, getUser } from './reviewFunction/queryFunction';

import type { review_info } from './reviewType';
import { getRate } from './reviewFunction/getRate';

function ReviewInfo({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const [changeMode, setChangeMode] = useState(false);
  const [changeText, setChangeText] = useState('');

  const { data: review } = useQuery<review_info[]>({
    queryKey: ['review'],
    queryFn: () => getReview(id),
  });
  const { data: review_id } = useQuery({
    queryKey: ['review'],
    queryFn: getReviewId,
  });

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  const user = data?.user_metadata.email;

  // const changeReviewMutation = useMutation({
  //   mutationFn: changeReview,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['review'] });
  //   },
  // });

  const deletesReviewMutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['review'] });
    },
  });

  const handleChangeReview = async (review_id: number) => {
    if (!changeText) {
      return;
    }
    const { data, error } = await supabase
      .from('review_info')
      .update({ review_content: changeText })
      .eq('review_id', review_id)
      .select();

    // changeReviewMutation.mutate({ review_id, changeText });
  };

  const handleDeleteReview = async (review_id: number) => {
    deletesReviewMutation.mutate(review_id);
  };

  const handleToggle = (reviewId: number) => {
    const reviewCollectId = review_id?.filter((item) => item.review_id === reviewId);
    if (reviewCollectId) {
      setChangeMode((prev) => !prev);
    }
  };

  return (
    <>
      {review?.map((info) => {
        return (
          <div key={info.review_id}>
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
                    <div>
                      {user === info.user_id && (
                        <>
                          <button
                            onClick={() => {
                              handleChangeReview(info.review_id);
                              setChangeMode((prev) => !prev);
                            }}
                          >
                            완료
                          </button>
                          <button onClick={() => handleDeleteReview(info.review_id)}>삭제</button>
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <p>{info.review_content}</p>
                    <div>
                      {user === info.user_id && (
                        <>
                          <button onClick={() => handleToggle(info.review_id)}>수정</button>
                          <button onClick={() => handleDeleteReview(info.review_id)}>삭제</button>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ReviewInfo;
