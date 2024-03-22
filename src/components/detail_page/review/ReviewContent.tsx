'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { changeReview, deleteReview, getReviewId, getUser } from '../../../api/reviewQuery/queryFunction';
import { getLocationDate } from '../../../util/detail_page/getLocationDate';
import { getRate } from '../../../util/detail_page/getRate';

import type { review_info } from '../../../types/reviewType';

function ReviewContent({ info }: { info: review_info }) {
  const [changeMode, setChangeMode] = useState(false);
  const [changeText, setChangeText] = useState('');

  const queryClient = useQueryClient();

  const { data: review_id } = useQuery({
    queryKey: ['reviewId'],
    queryFn: getReviewId,
  });

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  const changeReviewMutation = useMutation({
    mutationFn: changeReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['review'] });
      setChangeMode((prev) => !prev);
    },
  });

  const deletesReviewMutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['review'] });
    },
  });

  const handleChangeReview = async (reviewId: number) => {
    if (!changeText) {
      return;
    }

    changeReviewMutation.mutate({ review_id: reviewId, changeText });
  };

  const handleDeleteReview = async (reviewId: number) => {
    deletesReviewMutation.mutate(reviewId);
  };

  const handleToggle = (reviewId: number) => {
    const reviewCollectId = review_id?.filter((item) => item.review_id === reviewId);
    if (reviewCollectId) {
      setChangeMode((prev) => !prev);
    }
  };

  const user = data?.user_metadata.email;
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
}

export default ReviewContent;
