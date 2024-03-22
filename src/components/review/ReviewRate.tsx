'use client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getReviewToiletId } from '../../api/reviewQuery/queryFunction';
import { getAverage, getAverageRate, getReviewContentAverage, getStarRating } from '../../util/detail_page/getRate';

import type { review_info } from '../../types/reviewType';

function ReviewRate({ id }: { id: number }) {
  const { data: review } = useQuery<review_info[]>({
    queryKey: ['review'],
    queryFn: () => getReviewToiletId(id),
  });

  return (
    <>
      <h2>평점</h2>
      {review && review.length === 0 ? (
        <>
          <h3>평점이 없어요ㅠㅠ 평점을 등록해주세요</h3>
        </>
      ) : (
        <>
          {review && (
            <div>
              <p>전체 평점 : {getAverageRate(review)}</p>
              <p>
                청결도 :{' '}
                {getStarRating(
                  getAverage(
                    review.reduce((acc, info) => acc + (info.toilet_clean_rate || 1), 1),
                    review.length,
                  ),
                )}
              </p>
              <p>
                위치 :{' '}
                {getStarRating(
                  getAverage(
                    review.reduce((acc, info) => acc + (info.toilet_loc_rate || 1), 1),
                    review.length,
                  ),
                )}
              </p>
              <p>
                인구 밀도 :{' '}
                {getStarRating(
                  getAverage(
                    review.reduce((acc, info) => acc + (info.toilet_pop_rate || 1), 1),
                    review.length,
                  ),
                )}
              </p>
              <p>{getReviewContentAverage(review)}</p>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ReviewRate;
