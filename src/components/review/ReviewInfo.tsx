'use client';
import { supabase } from '@/shared/supabase/supabase';
import React, { useState } from 'react';
import { getLocationDate } from './reviewFunction/getLocationDate';
import { getRate } from './reviewFunction/getRate';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { changeReview, deleteReview, getReview, getUser } from './reviewFunction/queryFunction';

import type { review_info } from '@/app/detail_page/[id]/page';

function ReviewInfo({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const [changeMode, setChangeMode] = useState(false);
  const [changeText, setChangeText] = useState('');
  const { data: review, error } = useQuery<review_info[]>({
    queryKey: ['review'],
    queryFn: () => getReview(id),
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

  // const deletesReviewMutation = useMutation({
  //   mutationFn: deleteReview,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['review'] });
  //   },
  // });

  const handleChangeReview = async (user_id: string, reviewCreatedat: string) => {
    if (!changeText) {
      return;
    }
    const { data, error } = await supabase
      .from('review_info')
      .update({ review_content: changeText })
      .eq('user_id', user_id)
      .eq('review_createdat', reviewCreatedat)
      .select();

    // changeReviewMutation.mutate({ user_id, reviewCreatedat, changeText });
  };

  const handleDeleteReview = async (reviewCreatedat: string) => {
    const { error } = await supabase
      .from('review_info')
      .delete()
      .eq('user_id', user)
      .eq('review_createdat', reviewCreatedat);
    // deletesReviewMutation.mutate({ user, reviewCreatedat });
  };

  return (
    <>
      {review?.map((info) => {
        return (
          <div key={info.review_createdat}>
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
                              handleChangeReview(info.user_id, info.review_createdat);
                              setChangeMode((prev) => !prev);
                            }}
                          >
                            완료
                          </button>
                          <button onClick={() => handleDeleteReview(info.review_createdat)}>삭제</button>
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
                          <button
                            onClick={() => {
                              setChangeMode((prev) => !prev);
                            }}
                          >
                            수정
                          </button>
                          <button onClick={() => handleDeleteReview(info.review_createdat)}>삭제</button>
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
