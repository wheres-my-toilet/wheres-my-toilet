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
    } else {
      changeReviewMutation.mutate({ review_id: reviewId, changeText });
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    const confirm = window.confirm('삭제하시겠습니까?');
    if (confirm) {
      deletesReviewMutation.mutate(reviewId);
    }
  };

  const handleToggle = (reviewId: number) => {
    const reviewCollectId = review_id?.filter((item) => item.review_id === reviewId);
    if (reviewCollectId) {
      setChangeMode((prev) => !prev);
    }
  };

  const user = data?.user_metadata.email;
  return (
    <div className="border border-stone-950 rounded-2xl mb-4 w-9/12 py-6 px-3" key={info.review_id}>
      <div className="flex justify-between">
        <span>닉네임 : {info.user_nickname}</span>
        <p className="flex gap-1">
          <span className="text-amber-400 text-sm">{getLocationDate(info.review_createdat)}</span>
          <span className="w-28 text-right">
            {getRate(info.toilet_clean_rate, info.toilet_loc_rate, info.toilet_pop_rate)}
          </span>
        </p>
      </div>
      <div>
        <div>
          {changeMode ? (
            <>
              <textarea
                className="w-full h-28 text-base border-0 outline-none p-2.5 mr-2.5 bg-slate-100 my-2 resize-none"
                value={changeText}
                onChange={(e) => {
                  setChangeText(e.target.value);
                }}
              />
              <div className="flex gap-3 mt-2 justify-end">
                {user === info.user_id && (
                  <>
                    <button
                      className="bg-black text-white rounded-2xl py-3 px-6 cursor-pointer"
                      onClick={() => {
                        handleChangeReview(info.review_id);
                      }}
                    >
                      완료
                    </button>
                    <button
                      className="bg-black text-white rounded-2xl py-3 px-6 cursor-pointer"
                      onClick={() => handleDeleteReview(info.review_id)}
                    >
                      삭제
                    </button>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <p className="w-full h-28 text-base border-0 outline-none p-2.5 mr-2.5 bg-slate-100 my-2">
                {info.review_content}
              </p>
              <div className="flex gap-3 mt-2 justify-end">
                {user === info.user_id && (
                  <>
                    <button
                      className="bg-black text-white rounded-2xl py-3 px-6 cursor-pointer"
                      onClick={() => handleToggle(info.review_id)}
                    >
                      수정
                    </button>
                    <button
                      className="bg-black text-white rounded-2xl py-3 px-6 cursor-pointer"
                      onClick={() => handleDeleteReview(info.review_id)}
                    >
                      삭제
                    </button>
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
