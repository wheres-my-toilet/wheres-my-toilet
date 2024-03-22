import { HomePageType } from '@/types/home_page/types';
import { MapMarker } from 'react-kakao-maps-sdk';

function HomePageMap({ filterData, nearestLocation, userLocation }: HomePageType) {
  return (
    <>
      {nearestLocation?.map((location) => (
        <MapMarker
          key={`${location.toilet_name}-${{
            lat: location.toilet_latitude,
            lng: location.toilet_longitude,
          }} `}
          position={{
            lat: location.toilet_latitude,
            lng: location.toilet_longitude,
          }}
          title={location.toilet_name}
        />
      ))}

      <MapMarker
        position={userLocation}
        image={{
          src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
          size: {
            width: 24,
            height: 35,
          },
        }}
      />

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
          title={location.toilet_name}
        />
      ))}
    </>
  );
}

export default HomePageMap;
