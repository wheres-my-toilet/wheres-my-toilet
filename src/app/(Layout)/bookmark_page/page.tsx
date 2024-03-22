import BookmarkList from '@/components/bookmark_page/BookmarkList';
import React from 'react';

const BookmarkPage = () => {
  return (
    <div className="container mx-auto">
      <h2 className="text-xl md:text-2xl font-bold text-center my-6">즐겨찾는 화장실</h2>
      <BookmarkList />
    </div>
  );
};

export default BookmarkPage;
