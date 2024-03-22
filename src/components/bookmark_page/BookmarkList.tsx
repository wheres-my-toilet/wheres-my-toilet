'use client';

import { Bookmark, ReviewRate, deleteData, getData, getReviewData } from '@/util/bookmark_page/api';
import { calculateAverage } from '@/util/bookmark_page/calculateRate';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import { PiToiletPaper } from 'react-icons/pi';

const BookmarkList = () => {
  const USER_ID = '56'; //임시값

  const QUERY_KEY_BOOKMARK = 'bookmark'; //bookmark 공통 query key
  const QUERY_KEY_REVIEW_RATE = 'reviewRate'; //reviewRate 공통 query key
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_BOOKMARK] });
    },
  });

  const { data } = useQuery<Bookmark[]>({
    queryFn: () => getData(USER_ID),
    queryKey: [QUERY_KEY_BOOKMARK],
  });

  const toiletIds = data?.map((bookmark) => bookmark.toilet_id) || [];
  const { data: reviewData } = useQuery<ReviewRate[]>({
    queryFn: () => getReviewData(toiletIds),
    queryKey: [QUERY_KEY_REVIEW_RATE],
    enabled: !!data,
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
                  {calculateAverage(item.toilet_id, reviewData!)}
                  <button
                    type="button"
                    className="min-w-12 text-gray-400 text-sm"
                    onClick={() => handleCancelBookmark(item.bookmark_id)}
                  >
                    <span className="text-amber-300">★</span> 취소
                  </button>
                </div>
                <strong className="text-base md:text-xl">
                  <Link href={`/detail_page/${item.toilet_id}`}>{item.toilet_location.toilet_name}</Link>
                </strong>
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
        <div className="flex items-center justify-center flex-col m-4 min-h-60 border rounded-md text-gray-400 font-bold">
          <PiToiletPaper size="50" />
          <p className="mt-4">즐겨찾는 화장실이 없습니다</p>
        </div>
      )}
    </>
  );
};

export default BookmarkList;
