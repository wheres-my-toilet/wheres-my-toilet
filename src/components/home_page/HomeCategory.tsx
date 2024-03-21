import Link from 'next/link';

function HomeCategory() {
  return (
    <>
      <nav className="border-solid border-2 border-black m-5">
        <ul className="m-5">
          <li className="  border-black m-5">
            <Link href={`/login_page`}>즐겨찾기</Link>
          </li>
          <li className="  border-black m-5">
            <Link href={`/etiquette_page`}>화장실 에티켓</Link>
          </li>
          <li className="  border-black m-5">
            <Link href={`/tip_page`}>쾌변하는 꿀팁</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default HomeCategory;
