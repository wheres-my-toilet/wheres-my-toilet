'use client';
import { useLoggedInUserStore } from '@/shared/store/LoggedInUser';
import { supabase } from '@/shared/supabase/supabase';
import React, { useState } from 'react';

function ReviewBookMark({ id }: { id: number }) {
  const [bookMarkMode, setBookMarkMode] = useState(false);
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
  return (
    <div className="absolute right-9">
      {bookMarkMode ? (
        <>
          <button className="text-3xl text-amber-300" onClick={handleAddBookMark}>
            ★
          </button>
        </>
      ) : (
        <>
          <button className="text-3xl" onClick={handleDeleteBookMark}>
            ☆
          </button>
        </>
      )}
    </div>
  );
}

export default ReviewBookMark;
