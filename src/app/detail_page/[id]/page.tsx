'use client';
import ReviewForm from '@/components/review/ReviewForm';
import ReviewInfo from '@/components/review/ReviewInfo';
import ReviewRate from '@/components/review/ReviewRate';
import { getRate } from '@/components/review/reviewFunction/getRate';
import { getReview } from '@/components/review/reviewFunction/queryFunction';
import { supabase } from '@/shared/supabase/supabase';
import { Database } from '@/shared/supabase/types/supabase';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

export type review_info = {
  review_content: string | null;
  review_createdat: string;
  review_id: number | null;
  toilet_clean_rate: number | null;
  toilet_id: number | null;
  toilet_loc_rate: number | null;
  toilet_pop_rate: number | null;
  user_id: string;
  user_nickname: string | null;
};

function DetailPage({
  params,
}: {
  params: {
    id: number;
  };
}) {
  const { id } = params;
  const [toiletLocation, setToiletLocation] = useState<Database['public']['Tables']['toilet_location']['Row']>();

  useEffect(() => {
    const getToiletLocation = async () => {
      try {
        const { data: toilet_location, error } = await supabase
          .from('toilet_location')
          .select('*')
          .eq('toilet_id', id)
          .single();
        if (error) {
          throw error.message;
        }
        setToiletLocation(toilet_location);
      } catch (error) {
        console.log(error);
      }
    };

    getToiletLocation();
  }, [id]);

  return (
    <div className="flex flex-col">
      <h2>{toiletLocation?.toilet_name}</h2>
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
        <ReviewRate id={id} />
      </section>
      <div>
        <ReviewForm id={id} />
      </div>
      <div>
        <ReviewInfo id={id} />
      </div>
    </div>
  );
}

export default DetailPage;
