import ReviewForm from '@/components/review/ReviewForm';
import ReviewInfo from '@/components/review/ReviewInfo';
import ReviewMap from '@/components/review/ReviewMap';
import ReviewRate from '@/components/review/ReviewRate';
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
