'use client';
import { supabase } from '@/shared/supabase/supabase';
import { Database } from '@/shared/supabase/types/supabase';
import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

function ReviewMap({ id }: { id: number }) {
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
    <>
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
    </>
  );
}

export default ReviewMap;
