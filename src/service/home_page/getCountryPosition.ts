const getCountryPosition = (select2: string) => {
  switch (select2) {
    case '군위군':
      return { center: { lat: 35.8714354, lng: 128.601445 }, isPanto: true, level: 11 };

    case '석수동':
      return { center: { lat: 37.3942527, lng: 126.9568209 }, isPanto: true, level: 9 };

    case '강동구':
    case '양천구':
      return { center: { lat: 37.566535, lng: 126.9779692 }, isPanto: true, level: 8 };

    default:
      return { center: { lat: 37.715133, lng: 126.9779692 }, isPanto: true, level: 15 };
  }
};

export default getCountryPosition;
