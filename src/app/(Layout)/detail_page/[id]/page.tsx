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
      <section>
        <ReviewRate id={id} />
      </section>
      <div>
        <ReviewForm id={id} />
      </div>
      <div>
        <ReviewInfo id={id} />
      </div>
    </div>
  );
}

export default DetailPage;
