'use client';
import { supabase } from '@/shared/supabase/supabase';
import Link from 'next/link';
import { ChangeEvent, useEffect, useState } from 'react';
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

export default function BasicMap() {
  const [locationInfoData, setLocationInfoData] = useState<Location[] | null>([]);
  const [selectSee, setSelectSee] = useState<string>('시 선택');
  const [selectGunGue, setSelectGunGue] = useState<string>('군 /구 선택');

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

  // selectState 로 저장될 center 좌표가 담길 state 선언
  const [selectState, setSelectState] = useState({
    center: { lat: 33.450701, lng: 126.570667 },
    isPanto: false,
  });

  const onChangeState = (select: string) => {
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

  const onChangeState2 = (select2: string) => {
    switch (select2) {
      case '군위군':
        setSelectState({ center: { lat: 36.2428355, lng: 128.5727702 }, isPanto: true });
        break;
    }
  };

  const onchangeSelectSee = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectSee(event.target.value);
    onChangeState(event.target.value);
  };

  const onchangeSelectGunGue = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectGunGue(event.target.value);
    onChangeState2(event.target.value);
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link href={`/loginNsignup_page`}>즐겨찾기</Link>
          </li>
          <li>
            <Link href={`/etiquette_page`}>화장실 에티켓</Link>
          </li>
          <li>
            <Link href={`/tip_page`}>쾌변하는 꿀팁</Link>
          </li>
        </ul>
      </nav>

      <main>
        {/* 검색 폼 */}

        <form>
          <select value={selectSee} onChange={onchangeSelectSee}>
            <option value="시 선택">시 선택</option>
            <option value="서울특별시">서울특별시</option>
            <option value="대구광역시">대구광역시</option>
          </select>

          <select value={selectGunGue} onChange={onchangeSelectGunGue}>
            <option value="구 선택">군/구 선택</option>
            <option value="군위군">군위군</option>
            <option value="강동구">강동구</option>
            <option value="양천구">양천구</option>
          </select>
        </form>

        <Map // 지도를 표시할 Container
          id="map"
          center={selectState.center}
          isPanto={selectState.isPanto}
          style={{
            // 지도의 크기
            width: '100%',
            height: '350px',
          }}
          level={15} // 지도의 확대 레벨
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
                }, // 마커이미지의 크기입니다
              }}
              title={location.toilet_name}
            />
          ))}
        </Map>
      </main>
    </>
  );
}
