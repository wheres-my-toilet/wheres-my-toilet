const getCityPosition = (select: string) => {
  switch (select) {
    case '서울특별시':
      return { center: { lat: 37.566535, lng: 126.9779692 }, isPanto: true };

    case '대구광역시':
      return { center: { lat: 35.8714354, lng: 128.601445 }, isPanto: true };

    case '경기도':
      return { center: { lat: 37.39067, lng: 126.7888 }, isPanto: true };

    default:
      return { center: { lat: 37.715133, lng: 126.9779692 }, isPanto: true };
  }
};

export default getCityPosition;
