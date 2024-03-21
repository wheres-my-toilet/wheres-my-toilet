'use client';

import HomeCategory from '@/components/home_page/HomeCategory';
import useSelectForm from '@/hooks/home_page/useSelectForm';

import { Map, MapMarker } from 'react-kakao-maps-sdk';

import { useUserLocationStore } from '@/shared/store/UserLocation';
import useGetData from '@/hooks/home_page/useGetData';
interface Location {
  toilet_latitude: number;
  toilet_longitude: number;
  toilet_name: string;
  // 필요한 경우 더 많은 속성 추가 가능
}

interface UserLocation {
  lat: number;
  lng: number;
  // 필요한 경우 더 많은 속성 추가 가능
}
export default function HomePage() {
  const { selectGunGue, selectSee, selectState, handleSelectCity, handleSelectCounty } = useSelectForm();
  const { locationInfoData } = useGetData();
  const filterData = locationInfoData?.filter(
    (data) => data.toilet_address?.trim().includes(selectSee) && data.toilet_address?.trim().includes(selectGunGue),
  );

  const { userLocation } = useUserLocationStore();

  function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // 지구의 반지름 (단위: km)
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // 두 지점 사이의 거리 (단위: km)
    return distance;
  }

  // 사용자의 현재 위치와 가장 가까운 위치의 데이터를 찾는 함수
  function findNearestLocation(userLocation: UserLocation, data: Location[] | null): Location | null {
    let minDistance = Infinity;
    let nearestLocation = null;

    data?.forEach((location) => {
      const distance = getDistance(
        userLocation.lat,
        userLocation.lng,
        location.toilet_latitude,
        location.toilet_longitude,
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestLocation = location;
      }
    });

    return nearestLocation;
  }

  const nearestLocation: Location | null = findNearestLocation(userLocation, locationInfoData);

  return (
    <>
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
      </form>{' '}
      <br />
      <main className="flex items-center  ">
        <HomeCategory />
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
          {nearestLocation && (
            <MapMarker position={{ lat: nearestLocation.toilet_latitude, lng: nearestLocation.toilet_longitude }}>
              <div style={{ padding: '5px', color: '#000' }}>{nearestLocation.toilet_name}</div>
            </MapMarker>
          )}

          <MapMarker position={userLocation}>
            <div style={{ padding: '5px', color: '#000' }}>나의 위치</div>
          </MapMarker>

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
