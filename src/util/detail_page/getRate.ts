import type { review_info } from '../../types/reviewType';

export const getRate = (toiletCleanRate: number | null, toiletLocRate: number | null, toiletPopRate: number | null) => {
  const result = ((toiletCleanRate ?? 1) + (toiletLocRate ?? 1) + (toiletPopRate ?? 1)) / 3;

  switch (true) {
    case result === 5:
      return `⭐⭐⭐⭐⭐`;
    case result > 4:
      return `⭐⭐⭐⭐`;
    case result > 3:
      return `⭐⭐⭐`;
    case result > 2:
      return `⭐⭐ `;
    default:
      return `⭐`;
  }
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

export const reviewContent = (result: number): string => {
  switch (true) {
    case result > 4:
      return `😀매우 좋은 화장실이예요!`;
    case result > 3:
      return `😐 보통의 화장실이예요`;
    case result > 2:
      return `😟 별로군요..`;
    default:
      return `😱 여길 왜....`;
  }
};

export const getAverageRate = (review: review_info[]) => {
  const totalCount = review.length;
  const cleanRateSum = review.reduce((acc, info) => acc + (info.toilet_clean_rate || 1), 1);
  const locRateSum = review.reduce((acc, info) => acc + (info.toilet_loc_rate || 1), 1);
  const popRateSum = review.reduce((acc, info) => acc + (info.toilet_pop_rate || 1), 1);

  const averageCleanRate = cleanRateSum / totalCount;
  const averageLocRate = locRateSum / totalCount;
  const averagePopRate = popRateSum / totalCount;
  const overallRate = (averageCleanRate + averageLocRate + averagePopRate) / 3;

  return getStarRating(overallRate);
};

export function getAverage(sum: number, count: number) {
  return sum / count || 1;
}

export const getReviewContentAverage = (review: review_info[]) => {
  const totalCount = review.length;
  const cleanRateSum = review.reduce((acc, info) => acc + (info.toilet_clean_rate || 1), 1);
  const locRateSum = review.reduce((acc, info) => acc + (info.toilet_loc_rate || 1), 1);
  const popRateSum = review.reduce((acc, info) => acc + (info.toilet_pop_rate || 1), 1);

  const averageCleanRate = cleanRateSum / totalCount;
  const averageLocRate = locRateSum / totalCount;
  const averagePopRate = popRateSum / totalCount;
  const overallRate = (averageCleanRate + averageLocRate + averagePopRate) / 3;

  return reviewContent(overallRate);
};
