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

      <section className="flex md:flex flex-col md:flex-row justify-between">
        <div className="mt-10 w-2/1">
          <HomeCategory />
        </div>

        <Map
          id="map"
          center={selectState.center}
          isPanto={selectState.isPanto}
          className="w-full h-screen   "
          level={selectLevel}
        >
          <HomePageMap userLocation={userLocation} nearestLocation={nearestLocation} filterData={filterData} />
        </Map>
      </section>

      <div className="flex overflow-x-auto">
        {nearestLocation &&
          nearestLocation.map((location: NearestLocation) => (
            <figure
              key={location.toilet_id}
              className="border-2 m-4 p-4 rounded-2xl  border-blue-50 bg-blue-50  shadow-xl h-30"
            >
              <figcaption>
                <p>
                  <small className="p-2">
                    <b>이름:</b> {location.toilet_name}
                  </small>
                </p>
                <br />
                <p>
                  <small className="p-2 md:p-0 text-sm">
                    <b>주소:</b>
                    {location.toilet_address}
                  </small>
                </p>
                <br />
                <p className="p-2">
                  <small>
                    <b>위치:</b>
                  </small>
                  <b>{Math.floor(location.toilet_distance)}</b>
                  km
                </p>

                <Link href={`detail_page/${location.toilet_id}`} className="pl-40 p-2 hover:font-bold   md:text-sm ">
                  more
                </Link>
              </figcaption>
            </figure>
          ))}
      </div>
    </>
  );
};

export default HomePage;
