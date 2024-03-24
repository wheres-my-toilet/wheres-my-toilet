'use client';
import { useLoggedInUserStore } from '@/shared/store/LoggedInUser';
import { supabase } from '@/shared/supabase/supabase';
import { Database } from '@/shared/supabase/types/supabase';
import { Bookmark, getBookmark } from '@/util/detail_page/api';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa';

function ReviewBookMark({ id }: { id: number }) {
  const [bookMarkMode, setBookMarkMode] = useState(false);
  const [toiletLocation, setToiletLocation] = useState<Database['public']['Tables']['toilet_location']['Row']>();
  const { user_uid } = useLoggedInUserStore((state) => state.userData);

  const { data: bookmarkData } = useQuery<Bookmark[]>({
    queryFn: () => getBookmark(user_uid, id),
    queryKey: ['detailBookmark'],
    enabled: !!user_uid,
  });

  const handleAddBookMark = async () => {
    if (user_uid === '') {
      return;
    }
    const { data, error } = await supabase
      .from('bookmark')
      .insert([{ toilet_id: id, user_uid: user_uid }])
      .select();
    if (error) {
      throw new Error(error?.message || '에러가 발생했습니다!');
    }
    setBookMarkMode((prev) => !prev);
  };

  const handleDeleteBookMark = async () => {
    if (user_uid === '') {
      return;
    }
    const { error } = await supabase
      .from('bookmark')
      .delete()
      .eq('bookmark_id', bookmarkData?.[0].bookmark_id as number);
    setBookMarkMode((prev) => !prev);
  };

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

  useEffect(() => {
    if (bookmarkData && bookmarkData.length > 0) {
      setBookMarkMode(true);
    }
  }, [bookmarkData]);

  return (
    <div className="flex items-center justify-around align-middle">
      <h2 className="text-center text-black font-medium rounded-xl text-3xl p-5 pb-6 flex gap-3">
        {toiletLocation?.toilet_name}
      </h2>
      <button
        className={`flex flex-col text-3xl ${bookMarkMode ? 'text-amber-300' : null} -translate-y-1 items-center gap-1`}
        onClick={bookMarkMode ? handleDeleteBookMark : handleAddBookMark}
      >
        {bookMarkMode ? <FaStar /> : <CiStar />}
        <p className="text-xs text-gray-400">즐겨찾기에 추가하기</p>
      </button>
    </div>
  );
}

export default ReviewBookMark;
