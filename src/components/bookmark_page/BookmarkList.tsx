'use client';

import { supabase } from '@/shared/supabase/supabase';
import React, { useEffect, useState } from 'react';

const BookmarkList = () => {
  const [bookmarkData, setBookmarkData] = useState();

  const getData = async () => {
    let { data: bookmark, error } = await supabase.from('bookmark').select('*');
    console.log(bookmark);
  };

  useEffect(() => {
    getData();
  }, []);

  return <ul className="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 gap-4"></ul>;
};

export default BookmarkList;
