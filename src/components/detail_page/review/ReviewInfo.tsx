'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getReviewToiletId } from '../../../api/reviewQuery/queryFunction';
import ReviewContent from './ReviewContent';

import type { review_info } from '../../../types/reviewType';

function ReviewInfo({ id }: { id: number }) {
  const { data: review } = useQuery<review_info[]>({
    queryKey: ['review'],
    queryFn: () => getReviewToiletId(id),
  });
  return (
    <div className="flex flex-col items-center mb-8">
      {review?.map((info) => (
        <ReviewContent key={info.review_id} info={info} />
      ))}
    </div>
  );
}

export default ReviewInfo;
