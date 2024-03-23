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

      {nearestLocation &&
        nearestLocation.map((location: NearestLocation) => (
          <figure key={location.toilet_id} className="m-4">
            화장실 이름 : <p>{location.toilet_name}</p>
            주소 : <p>{location.toilet_address}</p>
            <figcaption>
              <small>거리:{location.toilet_distance}</small>
            </figcaption>
          </figure>
        ))}
    </>
  );
};

export default HomePage;
