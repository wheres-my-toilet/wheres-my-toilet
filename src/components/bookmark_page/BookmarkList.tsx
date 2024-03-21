'use client';

import { supabase } from '@/shared/supabase/supabase';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

type Bookmark = {
  bookmark_id: number;
  toilet_id: number;
  toilet_location: {
    toilet_address: string;
    toilet_name: string;
  };
  user_id: string;
};

const BookmarkList = () => {
  const USER_ID = '56'; //임시값
  const getData = async (user_id: string): Promise<Bookmark[]> => {
    const { data, error } = await supabase
      .from('bookmark')
      .select('*, toilet_location(toilet_name, toilet_address)')
      .eq('user_id', user_id);

    if (error) {
      console.error('Error fetching data:', error.message);
      return [];
    }

    return data as Bookmark[];
  };

  const { data } = useQuery<Bookmark[]>({
    queryFn: () => getData(USER_ID),
    queryKey: ['bookmark'],
  });

  return (
    <>
      {data && data.length ? (
        <ul className="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 gap-4">
          {data?.map((item) => {
            return (
              <li key={item.bookmark_id}>
                <strong>{item.toilet_location.toilet_name}</strong>
                <p>{item.toilet_location.toilet_address}</p>
                <button type="button">★ 취소</button>
              </li>
            );
          })}
        </ul>
      ) : (
        '데이터가 없습니다.'
      )}
    </>
  );
};

export default BookmarkList;
