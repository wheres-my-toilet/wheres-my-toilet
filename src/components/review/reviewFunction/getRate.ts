import type { review_info } from '../type';

export const getRate = (toiletCleanRate: number | null, toiletLocRate: number | null, toiletPopRate: number | null) => {
  const result = ((toiletCleanRate ?? 0) + (toiletLocRate ?? 0) + (toiletPopRate ?? 0)) / 3;
  switch (true) {
    case result === 5:
      return `⭐⭐⭐⭐⭐`;
    case result > 4:
      return `⭐⭐⭐⭐`;
    case result > 3:
      return `⭐⭐⭐`;
    case result > 2:
      return `⭐⭐ `;
    case result > 1:
      return `⭐`;
    default:
      return '';
  }
};

export const getAverageRate = (review: review_info[]) => {
  const totalCount = review.length;
  const cleanRateSum = review.reduce((acc, info) => acc + (info.toilet_clean_rate || 0), 0);
  const locRateSum = review.reduce((acc, info) => acc + (info.toilet_loc_rate || 0), 0);
  const popRateSum = review.reduce((acc, info) => acc + (info.toilet_pop_rate || 0), 0);

  const averageCleanRate = cleanRateSum / totalCount;
  const averageLocRate = locRateSum / totalCount;
  const averagePopRate = popRateSum / totalCount;

  return getRate(averageCleanRate, averageLocRate, averagePopRate);
};

export function getAverage(sum: number, count: number) {
  return sum / count || 0;
}

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
    case result > 1:
      return `⭐`;
    default:
      return '';
  }
};
