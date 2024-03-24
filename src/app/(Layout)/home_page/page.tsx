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
import { useEffect, useState } from 'react';
import { supabase } from '@/shared/supabase/supabase';
import Link from 'next/link';

type Review_info = {
  review_id: number;
  toilet_loc_rate: number;
  toilet_clean_rate: number | null;
  toilet_pop_rate: number;
};

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

  async function getReview() {
    const { data: review_info, error } = await supabase
      .from('review_info')
      .select('review_id , toilet_loc_rate , toilet_clean_rate , toilet_pop_rate , toilet_id  ');
  }
  useEffect(() => {
    getReview();
  }, []);

  return (
    <>
      <HomeSelectForm
        selectSee={selectSee}
        selectGunGue={selectGunGue}
        handleSelectCity={handleSelectCity}
        handleSelectCounty={handleSelectCounty}
      />





<section className="flex flex-col  md:flex-row mt-20">
  <div className="border-2 gradient w-full md:w-80 m-4 md:m-12 ">
  <HomeCategory />
  </div>

    <div className="w-full md:w-2/3 mt-4 md:mt-0">
    <Map
          id="map"
          center={selectState.center}
          isPanto={selectState.isPanto}
          className="mx-auto w-full  h-64 md:h-86 rounded-lg"
          level={selectLevel}
        > 
          <HomePageMap userLocation={userLocation} nearestLocation={nearestLocation} filterData={filterData} />
        </Map>
        </div>
      </section>

     <div className='flex overflow-auto'>
     {nearestLocation &&
        nearestLocation.map((location: NearestLocation) => (
          <Link href={`detail_page/${location.toilet_id}`}>
          <figure key={location.toilet_id} className='border-2 m-2 p-2 text-lg'>
          <p className='text-1xl'>이름 : {location.toilet_name}</p>
          <p>주소 : {location.toilet_address}</p>
            <figcaption>
              <small>거리: <b>{Math.floor(location.toilet_distance)}</b>km</small>

            </figcaption>
          </figure>
          </Link>
        ))}
     </div>
     
    </>
  );
};

export default HomePage;
