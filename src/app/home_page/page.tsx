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
  // 수파베이스로부터 지도 좌표 데이터 가져와서 저장하기
  const [locationInfoData, setLocationInfoData] = useState<Location[] | null>([]);
  const [selectSee, setSelectSee] = useState<string>('시 선택');

  const onchangeSelectSee = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectSee(event.target.value);
  };

  async function getData() {
    const { data, error } = await supabase.from('toilet_location').select(' * ');

    setLocationInfoData(data);
    return { data, error };
  }

  useEffect(() => {
    getData();
  }, []);

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

        <select value={selectSee} onChange={onchangeSelectSee}>
          <option value="시 선택">시 선택</option>
          <option value="서울특별시">서울특별시</option>
          <option value="대구광역시">대구광역시</option>
        </select>

        <>
          <Map // 지도를 표시할 Container
            id="map"
            center={{
              // 지도의 중심좌표
              lat: 37.5286,
              lng: 127.1264,
            }}
            style={{
              // 지도의 크기
              width: '100%',
              height: '350px',
            }}
            level={15} // 지도의 확대 레벨
          >
            {locationInfoData
              ?.filter((data) => data.toilet_address?.includes(selectSee))
              .map((location) => (
                <MapMarker
                  key={`${location.toilet_name}-${{ lat: location.toilet_latitude, lng: location.toilet_longitude }} `}
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
        </>
      </main>
    </>
  );
}
