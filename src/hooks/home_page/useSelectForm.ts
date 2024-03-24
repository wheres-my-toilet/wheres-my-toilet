import getCityPosition from '@/service/home_page/getCityPosition';
import getCountryPosition from '@/service/home_page/getCountryPosition';
import { useUserLocationStore } from '@/shared/store/UserLocation';
import { ChangeEvent, useState } from 'react';

export default function useSelectForm() {
  const { lat, lng } = useUserLocationStore().userLocation;
  const [selectSee, setSelectSee] = useState<string>('시 선택');
  const [selectGunGue, setSelectGunGue] = useState<string>('군 /구 선택');
  const [selectLevel, setSelectLevel] = useState<number>(12);
  const [selectState, setSelectState] = useState({
    center: { lat, lng },
    isPanto: false,
  });

  const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectSee(event.target.value);

    const { center, isPanto } = getCityPosition(event.target.value);

    setSelectState({ center, isPanto });
  };

  const handleSelectCounty = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectGunGue(event.target.value);

    const { center, isPanto, level } = getCountryPosition(event.target.value);

    setSelectState({ center, isPanto });
    setSelectLevel(level);
  };

  return { selectSee, selectGunGue, handleSelectCity, handleSelectCounty, selectState, selectLevel };
}
