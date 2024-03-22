import { HomePageType } from '@/types/home_page/types';
import { MapMarker } from 'react-kakao-maps-sdk';

function HomePageMap({ filterData, nearestLocation, userLocation }: HomePageType) {
  console.log(filterData);

  return (
    <>
      {nearestLocation && (
        <MapMarker position={{ lat: nearestLocation.toilet_latitude, lng: nearestLocation.toilet_longitude }}>
          <div className="text-black font-bold  text-sm  m-2 ">{nearestLocation.toilet_name}</div>
        </MapMarker>
      )}

      <MapMarker position={userLocation}>
        <div className="text-black font-bold text-sm  m-2 ">나의 위치</div>
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
            src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
            size: {
              width: 24,
              height: 35,
            },
          }}
          title={location.toilet_name}
        />
      ))}
    </>
  );
}

export default HomePageMap;
