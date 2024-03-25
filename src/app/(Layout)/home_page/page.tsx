'use client';
import HomeSelectForm from '@/components/home_page/HomeSelectForm';
import HomePageMap from '@/components/home_page/HomePageMap';
import HomeCategory from '@/components/home_page/HomeCategory';
import useSelectForm from '@/hooks/home_page/useSelectForm';
import useGetData from '@/hooks/home_page/useGetData';
import { useUserLocationStore } from '@/shared/store/UserLocation';
import { NearestLocation } from '@/types/home_page/types';
import findNearestLocation from '@/util/home_page/findNearestLocation';
import { Map } from 'react-kakao-maps-sdk';
import Link from 'next/link';

const HomePage = () => {
  const { userLocation } = useUserLocationStore();
  const { locationInfoData } = useGetData();
  const { selectSee, selectGunGue, selectState, handleSelectCity, handleSelectCounty, selectLevel } = useSelectForm();
  const nearestLocation: NearestLocation[] | null = findNearestLocation({
    userLocation: userLocation,
    data: locationInfoData,
  });
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

      <section className="flex md:flex flex-col sm:flex-row justify-between items-center ">
        <div className="flex justify-start ">
          <div className="border-2 m-2 p-10 w-auto rounded-md bg-slate-100 ">
            <HomeCategory />
          </div>
        </div>

        <Map
          id="map"
          center={selectState.center}
          isPanto={selectState.isPanto}
          className="w-10/12 h-96 m-10 rounded"
          level={selectLevel}
        >
          <HomePageMap userLocation={userLocation} nearestLocation={nearestLocation} filterData={filterData} />
        </Map>
      </section>

      <div className="flex flex-col">
        {nearestLocation &&
          nearestLocation.map((location: NearestLocation) => (
            <div key={location.toilet_id} className="m-4 rounded-xl overflow-hidden shadow-lg bg-white mb-6">
              <div className="px-6 py-4">
                <div className="font-bold text-lg mb-2 text-blue-500">{location.toilet_name}</div>
                <p className="text-gray-700 text-base">
                  <b>주소:</b> {location.toilet_address}
                </p>
                <p className="text-gray-700 text-base">
                  <b>위치:</b> {Math.floor(location.toilet_distance)} km
                </p>
              </div>
              <div className="px-6 py-4">
                <Link href={`detail_page/${location.toilet_id}`} className="text-blue-500 hover:font-bold text-sm">
                  more
                </Link>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default HomePage;
