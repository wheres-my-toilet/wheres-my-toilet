'use client';

import { supabase } from '@/shared/supabase/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
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

  const QUERY_KEY_BOOKMARK = 'bookmark'; //bookmark 공통 query key
  const queryClient = useQueryClient();

  const deleteData = async (bookmarkId: number) => {
    try {
      const { error } = await supabase.from('bookmark').delete().eq('bookmark_id', bookmarkId);

      if (error) {
        console.error('Error fetching data:', error.message);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const mutation = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_BOOKMARK] });
    },
  });

  const getData = async (user_id: string): Promise<Bookmark[]> => {
    try {
      const { data, error } = await supabase
        .from('bookmark')
        .select('*, toilet_location(toilet_name, toilet_address)')
        .eq('user_id', user_id);

      if (error) {
        console.error('Error fetching data:', error.message);
        return [];
      }

      return data as Bookmark[];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const { data } = useQuery<Bookmark[]>({
    queryFn: () => getData(USER_ID),
    queryKey: [QUERY_KEY_BOOKMARK],
  });

  //북마크 취소
  const handleCancelBookmark = (bookmarkId: number) => {
    if (confirm('즐겨찾기를 취소할까요?')) {
      mutation.mutate(bookmarkId);
    }
  };

  return (
    <>
      {data && data.length ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 m-4">
          {data?.map((item) => {
            return (
              <li key={item.bookmark_id} className="xl:relative p-4 border rounded-md min-h-32 xl:min-h-40">
                <div className="flex justify-between items-start">
                  <strong className="text-base md:text-xl">
                    <Link href={`/detail_page/${item.toilet_id}`}>{item.toilet_location.toilet_name}</Link>
                  </strong>
                  <button
                    type="button"
                    className="min-w-12 text-gray-400 text-sm"
                    onClick={() => handleCancelBookmark(item.bookmark_id)}
                  >
                    <span className="text-amber-300">★</span> 취소
                  </button>
                </div>
                <p className="text-neutral-600">
                  <Link href={`/detail_page/${item.toilet_id}`}>{item.toilet_location.toilet_address}</Link>
                </p>
                <Link
                  href={`/detail_page/${item.toilet_id}`}
                  className="xl:absolute xl:bottom-4 xl:right-4 text-blue-600 text-sm"
                >
                  자세히 보기
                </Link>
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
