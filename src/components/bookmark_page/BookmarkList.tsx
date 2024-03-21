'use client';

import { supabase } from '@/shared/supabase/supabase';
import React, { useEffect, useState } from 'react';

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
  const [bookmarkData, setBookmarkData] = useState<Bookmark[]>([]);

  const getData = async () => {
    const { data, error } = await supabase
      .from('bookmark')
      .select('*, toilet_location(toilet_name, toilet_address)')
      .eq('user_id', '56'); //56 임시값, 이후에 변경될 예정

    if (error) {
      console.error('Error fetching data:', error.message);
      alert('에러가 발생했습니다.');
      return;
    }

    setBookmarkData(data as Bookmark[]);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {bookmarkData && bookmarkData.length ? (
        <ul className="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 gap-4">
          {bookmarkData?.map((item) => {
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
