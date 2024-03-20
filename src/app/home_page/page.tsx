'use client';

import HomeCategory from '@/components/home_page/HomeCategory';
import useSelectForm from '@/hooks/home_page/useSelectForm';

import { supabase } from '@/shared/supabase/supabase';
import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface Location {
  toilet_address: string;
  toilet_baby_diaper: string | null;
  toilet_id: number;
  toilet_latitude: number;
  toilet_longitude: number;
  toilet_name: string;
  toilet_opening_hours: string | null;
}

export default function HomePage() {
  // justand에서 데이터 받아오기

  const [locationInfoData, setLocationInfoData] = useState<Location[] | null>([]);
  const { handleSelectCity, handleSelectCounty, selectGunGue, selectSee, selectState } = useSelectForm();

  async function getData() {
    const { data, error } = await supabase.from('toilet_location').select(' * ');

    setLocationInfoData(data);
    return { data, error };
  }

  useEffect(() => {
    getData();
  }, []);

  const filterData = locationInfoData?.filter(
    (data) => data.toilet_address?.trim().includes(selectSee) && data.toilet_address?.trim().includes(selectGunGue),
  );

  return (
    <>
      <HomeCategory />

      <form>
        <select value={selectSee} onChange={handleSelectCity}>
          <option value="시 선택">시 선택</option>
          <option value="서울특별시">서울특별시</option>
          <option value="대구광역시">대구광역시</option>
        </select>

        <select value={selectGunGue} onChange={handleSelectCounty}>
          <option value="구 선택">군/구 선택</option>
          <option value="군위군">군위군</option>
          <option value="강동구">강동구</option>
          <option value="양천구">양천구</option>
        </select>
      </form>

      <main>
        {/* 검색 폼 */}

        <Map
          id="map"
          center={selectState.center}
          isPanto={selectState.isPanto}
          style={{
            width: '100%',
            height: '350px',
          }}
          level={15}
        >
          {filterData?.map((location) => (
            <MapMarker
              key={`${location.toilet_name}-${{
                lat: location.toilet_latitude,
                lng: location.toilet_longitude,
              }} `}
              position={{
                lat: location.toilet_latitude,
                lng: location.toilet_longitude,
              }}
              image={{
                src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 마커이미지의 주소입니다
                size: {
                  width: 24,
                  height: 35,
                },
              }}
              title={location.toilet_name}
            />
          ))}
        </Map>
      </main>
    </>
  );
}
