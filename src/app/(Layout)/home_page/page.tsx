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
import { useLoggedInUserStore } from '@/shared/store/LoggedInUser';

const HomePage = () => {
  const { userLocation } = useUserLocationStore();
  const { locationInfoData } = useGetData();
  const { selectSee, selectGunGue, selectState, handleSelectCity, handleSelectCounty, selectLevel } = useSelectForm();
  const nearestLocation: Location | null = findNearestLocation({ userLocation: userLocation, data: locationInfoData });
  const filterData = locationInfoData?.filter(
    (location) => location.toilet_address?.includes(selectSee) && location.toilet_address?.includes(selectGunGue),
  );

  return (
    <>
      <HomeSelectForm
        selectSee={selectSee}
        selectGunGue={selectGunGue}
        handleSelectCity={handleSelectCity}
        handleSelectCounty={handleSelectCounty}
      />

      <section className="flex mt-20    ">
        <HomeCategory />

        <Map
          id="map"
          center={selectState.center}
          isPanto={selectState.isPanto}
          className="mx-4 w-9/12 h-86 rounded-lg"
          level={selectLevel}
        >
          <HomePageMap userLocation={userLocation} nearestLocation={nearestLocation} filterData={filterData} />
        </Map>
      </section>

      {nearestLocation && (
        <figure key={nearestLocation.toilet_id}>
          화장실 이름 : <p>{nearestLocation.toilet_name}</p>
          주소 : <p>{nearestLocation.toilet_address}</p>
          <figcaption>
            <p>{nearestLocation.toilet_latitude}</p>
            <p>{nearestLocation.toilet_longitude}</p>
          </figcaption>
        </figure>
      )}
    </>
  );
};

export default HomePage;
