import { ReviewRate } from './api';

//리뷰 평점 계산
export const calculateAverage = (toiletId: number, reviewData: ReviewRate[]) => {
  let locRate = 0;
  let cleanRate = 0;
  let popRate = 0;
  let cnt = 0;

  reviewData?.forEach((el) => {
    if (el.toilet_id === toiletId) {
      locRate += el.toilet_loc_rate;
      cleanRate += el.toilet_clean_rate;
      popRate += el.toilet_pop_rate;
      cnt += 1;
    }
  });

  let avg = locRate / cnt + cleanRate / cnt + popRate / cnt / 3;
  return getStarRating(avg ? avg : 1);
};

export const getStarRating = (result: number): string => {
  switch (true) {
    case result === 5:
      return `⭐⭐⭐⭐⭐`;
    case result > 4:
      return `⭐⭐⭐⭐`;
    case result > 3:
      return `⭐⭐⭐`;
    case result > 2:
      return `⭐⭐`;
    default:
      return `⭐`;
  }
};
