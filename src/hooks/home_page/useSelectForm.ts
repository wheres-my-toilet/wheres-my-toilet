import { useUserLocationStore } from '@/shared/store/UserLocation';
import { ChangeEvent, useState } from 'react';

export default function useSelectForm() {
  const [selectSee, setSelectSee] = useState<string>('시 선택');
  const [selectGunGue, setSelectGunGue] = useState<string>('군 /구 선택');

  const { userLocation, setLocation } = useUserLocationStore();

  // selectState 로 저장될 center 좌표가 담길 state 선언
  const [selectState, setSelectState] = useState({
    center: userLocation,
    isPanto: false,
  });

  const handleChangeCity = (select: string) => {
    switch (select) {
      case '서울특별시':
        setSelectState({ center: { lat: 37.715133, lng: 126.9779692 }, isPanto: true });
        break;

      case '대구광역시':
        setSelectState({ center: { lat: 35.8714354, lng: 128.601445 }, isPanto: true });
        break;

      default:
        setSelectState({ center: { lat: 33.450701, lng: 126.570667 }, isPanto: true });
        break;
    }
  };

  const handleChangeCounty = (select2: string) => {
    switch (select2) {
      case '군위군':
        setSelectState({ center: { lat: 36.2428355, lng: 128.5727702 }, isPanto: true });
        break;
    }
  };

  const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectSee(event.target.value);
    handleChangeCity(event.target.value);
  };

  const handleSelectCounty = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectGunGue(event.target.value);
    handleChangeCounty(event.target.value);
  };

  return { selectSee, selectGunGue, handleSelectCity, handleSelectCounty, selectState };
}
