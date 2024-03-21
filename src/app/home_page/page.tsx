'use client';
import HomeSelectForm from '@/components/home_page/HomeSelectForm';
import HomePageMap from '@/components/home_page/HomePageMap';
import HomeCategory from '@/components/home_page/HomeCategory';
import useSelectForm from '@/hooks/home_page/useSelectForm';
import useGetData from '@/hooks/home_page/useGetData';
import { useUserLocationStore } from '@/shared/store/UserLocation';
import { Location } from '@/types/home_page/types';
import findNearestLocation from '@/util/home_page/findNearestLocation';
import { Map } from 'react-kakao-maps-sdk';

export default function HomePage() {
  const { userLocation } = useUserLocationStore();
  const { locationInfoData } = useGetData();
  const { selectSee, selectGunGue, selectState, handleSelectCity, handleSelectCounty } = useSelectForm();
  const nearestLocation: Location | null = findNearestLocation(userLocation, locationInfoData);
  const filterData = locationInfoData?.filter(
    (location) =>
      location.toilet_address?.trim().includes(selectSee) && location.toilet_address?.trim().includes(selectGunGue),
  );

  return (
    <>
      <HomeSelectForm
        selectSee={selectSee}
        selectGunGue={selectGunGue}
        handleSelectCity={handleSelectCity}
        handleSelectCounty={handleSelectCounty}
      />

      <section>
        <HomeCategory />
        <main className="m-10">
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
            <HomePageMap userLocation={userLocation} nearestLocation={nearestLocation} filterData={filterData} />
          </Map>
        </main>
      </section>
    </>
  );
}
