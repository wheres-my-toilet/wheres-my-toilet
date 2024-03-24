'use client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getReviewToiletId } from '../../../api/reviewQuery/queryFunction';
import { getAverage, getAverageRate, getReviewContentAverage, getStarRating } from '../../../util/detail_page/getRate';

import type { review_info } from '../../../types/reviewType';
const reviewType = { clean: '청결도', location: '위치', population: '인구 밀도' };

function ReviewRate({ id }: { id: number }) {
  const { data: review } = useQuery<review_info[]>({
    queryKey: ['review'],
    queryFn: () => getReviewToiletId(id),
  });

  return (
    <div className="flex flex-col align-middle justify-center items-center">
      <h2 className="text-center text-2xl mb-3 font-medium flex">평점</h2>
      {review && review.length === 0 ? (
        <p className="w-60 h-14 text-center py-4 bg-black text-white rounded-xl my-4 ml-auto mr-auto">
          등록된 평점이 없습니다. 첫 평점을 남겨주세요!
        </p>
      ) : (
        <>
          {review && (
            <div className="text-left flex flex-col gap-1 justify-center mb-4 items-center">
              <div className="bg-amber-400 min-w-80 text-center mb-3 ">
                <p>{getReviewContentAverage(review)}</p>
              </div>

              <div className="flex">
                <p className="min-w-20">전체 평점</p> <span>{getAverageRate(review)}</span>
              </div>
              <div className="flex">
                <p className="min-w-20">{reviewType.clean}</p>
                {getStarRating(
                  getAverage(
                    review.reduce((acc, info) => acc + (info.toilet_clean_rate || 5), 1),
                    review.length,
                  ),
                )}
              </div>
              <div className="flex">
                <p className="min-w-20">{reviewType.location}</p>
                {getStarRating(
                  getAverage(
                    review.reduce((acc, info) => acc + (info.toilet_loc_rate || 5), 1),
                    review.length,
                  ),
                )}
              </div>
              <div className="flex">
                <p className="min-w-20">{reviewType.population}</p>
                {getStarRating(
                  getAverage(
                    review.reduce((acc, info) => acc + (info.toilet_pop_rate || 5), 1),
                    review.length,
                  ),
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ReviewRate;
