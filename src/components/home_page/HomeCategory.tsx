import { useState } from 'react';
import { BiCategory } from 'react-icons/bi';
import { IoIosMan } from 'react-icons/io';
import { MdFavorite, MdTipsAndUpdates } from 'react-icons/md';
import Link from 'next/link';

function HomeCategory() {
  const [isOpen, setIsOpen] = useState(true); // 토글 상태를 관리하기 위한 상태

  const toggleCategory = () => {
    setIsOpen(!isOpen); // 토글 상태 변경
  };

  return (
    <nav className="flex justify-left items-start flex-col flex-start md:w-full">
      <div className="flex items-center cursor-pointer" onClick={toggleCategory}>
        <BiCategory size={20} className="mr-auto flex justify-start start-0 md:object-no" />
        <span className="text-gray-800 hover:text-red-500 transition duration-300 p-2">Categories</span>
      </div>
      {isOpen && ( // isOpen이 true일 때만 카테고리 목록을 보여줌
        <ul className="flex flex-col md:flex items-start md:w-full">
          <li className="hover:border-red-500 rounded-md p-2 flex items-center m-3 border-2 bg-slate-100">
            <MdFavorite className="text-red-500 mr-2" />
            <Link href="/bookmark_page" className="text-gray-800 hover:text-red-500 transition duration-300 p-2">
              Favorite
            </Link>
          </li>
          <li className="hover:border-blue-600 rounded-md p-2 flex items-center m-3 border-2 bg-slate-100">
            <IoIosMan className="text-blue-600 mr-2" />
            <Link href="/etiquette_page" className="text-gray-800 hover:text-blue-600 transition duration-300 p-2">
              Etiquette
            </Link>
          </li>
          <li className="hover:border-yellow-400 rounded-md p-2 flex items-center m-3 border-2 bg-slate-100">
            <MdTipsAndUpdates className="text-yellow-400 mr-2" />
            <Link href="/tip_page" className="text-gray-800 hover:text-yellow-400 transition duration-300 p-2">
              Its TIP
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default HomeCategory;
