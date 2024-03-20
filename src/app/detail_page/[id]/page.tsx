'use client';
import ReviewForm from '@/components/review/ReviewForm';
import ReviewInfo from '@/components/review/ReviewInfo';
import { supabase } from '@/shared/supabase/supabase';
import { Database } from '@/shared/supabase/types/supabase';
import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

// 로그인 안하면 이 페이지 접근 못하게 막아야될듯 해요 user 가져오는 부분 계속 오류나서 그 부분 다 주석입니다.
function DetailPage({
  params,
}: {
  params: {
    id: number;
  };
}) {
  const { id } = params;
  const [toiletLocation, setToiletLocation] = useState<Database['public']['Tables']['toilet_location']['Row']>();
  // const { data: { user } } = await supabase.auth.getUser()
  useEffect(() => {
    const getToiletLocation = async () => {
      try {
        const { data: toilet_location, error } = await supabase
          .from('toilet_location')
          .select('*')
          .eq('toilet_id', id)
          .single();
        if (error) {
          throw error;
        }
        setToiletLocation(toilet_location);
      } catch (error) {
        console.log(error);
      }
    };

    getToiletLocation();
  }, [id]);
  return (
    <>
      <h1>{toiletLocation?.toilet_name}</h1>
      <section>
        {toiletLocation?.toilet_latitude && toiletLocation?.toilet_longitude && (
          <Map
            id="map"
            center={{
              lat: toiletLocation.toilet_latitude,
              lng: toiletLocation.toilet_longitude,
            }}
            style={{ width: '40%', height: '350px' }}
            level={3}
          >
            <MapMarker
              key={`${toiletLocation.toilet_name}-${{
                lat: toiletLocation.toilet_latitude,
                lng: toiletLocation.toilet_longitude,
              }} `}
              title={toiletLocation.toilet_name}
              position={{
                lat: toiletLocation.toilet_latitude,
                lng: toiletLocation.toilet_longitude,
              }}
              image={{
                src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
                size: {
                  width: 24,
                  height: 35,
                },
              }}
            />
          </Map>
        )}
      </section>
      <section>
        <ReviewInfo id={id} />
      </section>
      <div>
        <ReviewForm id={id} />
      </div>
    </>
  );
}

export default DetailPage;
