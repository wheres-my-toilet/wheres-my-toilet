import ReviewBookMark from '@/components/detail_page/review/ReviewBookMark';
import ReviewForm from '@/components/detail_page/review/ReviewForm';
import ReviewInfo from '@/components/detail_page/review/ReviewInfo';
import ReviewMap from '@/components/detail_page/review/ReviewMap';
import ReviewRate from '@/components/detail_page/review/ReviewRate';
import React from 'react';

function DetailPage({
  params,
}: {
  params: {
    id: number;
  };
}) {
  const { id } = params;

  return (
    <div className="flex flex-col">
      <ReviewBookMark id={id} />
      <ReviewMap id={id} />
      <div className="flex flex-col gap-5">
        <ReviewRate id={id} />
        <ReviewForm id={id} />
      </div>
      <ReviewInfo id={id} />
    </div>
  );
}

export default DetailPage;
