'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getReviewToiletId } from './reviewFunction/queryFunction';
import ReviewContent from './ReviewContent';

import type { review_info } from './reviewType';

function ReviewInfo({ id }: { id: number }) {
  const { data: review } = useQuery<review_info[]>({
    queryKey: ['review'],
    queryFn: () => getReviewToiletId(id),
  });
  return (
    <>
      {review?.map((info) => (
        <ReviewContent info={info} />
      ))}
    </>
  );
}

export default ReviewInfo;
