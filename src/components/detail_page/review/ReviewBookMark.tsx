'use client';
import { useLoggedInUserStore } from '@/shared/store/LoggedInUser';
import { supabase } from '@/shared/supabase/supabase';
import { Database } from '@/shared/supabase/types/supabase';
import React, { useEffect, useState } from 'react';

import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa';

function ReviewBookMark({ id }: { id: number }) {
  const [bookMarkMode, setBookMarkMode] = useState(false);
  const [toiletLocation, setToiletLocation] = useState<Database['public']['Tables']['toilet_location']['Row']>();
  const { email: user_id } = useLoggedInUserStore((state) => state.userData);

  const handleAddBookMark = async () => {
    const { data, error } = await supabase
      .from('bookmark')
      .insert([{ toilet_id: id, user_id: user_id }])
      .select();
    if (error) {
      throw new Error(error?.message || '에러가 발생했습니다!');
    }
    setBookMarkMode((prev) => !prev);
  };

  const handleDeleteBookMark = async () => {
    const { error } = await supabase.from('bookmark').delete().eq(user_id, user_id);
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
  return (
    <div className="flex items-center justify-around align-middle">
      <h2 className="text-center text-black font-medium rounded-xl text-3xl p-5 pb-6">{toiletLocation?.toilet_name}</h2>
      <button
        className={`flex flex-col text-3xl ${bookMarkMode ? 'text-amber-300' : null} -translate-y-1 items-center gap-1`}
        onClick={bookMarkMode ? handleAddBookMark : handleDeleteBookMark}
      >
        {bookMarkMode ? <FaStar /> : <CiStar />}
        <p className="text-xs text-gray-400">즐겨찾기에 추가하기</p>
      </button>
    </div>
  );
}

export default ReviewBookMark;
