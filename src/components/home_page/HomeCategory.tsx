import Link from 'next/link';

function HomeCategory() {
  return (
    <nav>
      <ul className="border-2  w-100 ml-10 mt-10 p-10 sticky border-black  rounded ">
        <li className="border-2 m-2 p-5 w-200  border-black  font-bold rounded">
          <Link href={`/bookmark_page`}>즐겨찾기</Link>
        </li>
        <li className="border-2 m-2 p-5 w-40  border-black font-bold  rounded">
          <Link href={`/etiquette_page`}>화장실 에티켓</Link>
        </li>
        <li className="border-2 m-2 p-5 w-40  border-black font-bold rounded">
          <Link href={`/tip_page`}>쾌변하는 꿀팁</Link>
        </li>
      </ul>
    </nav>
  );
}

export default HomeCategory;
