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
    case result === 1:
      return `⭐`;
    default:
      return '';
  }
};
