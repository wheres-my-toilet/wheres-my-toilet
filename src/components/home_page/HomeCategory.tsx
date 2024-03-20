import Link from 'next/link';

function HomeCategory() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link href={`/loginNsignup_page`}>즐겨찾기</Link>
          </li>
          <li>
            <Link href={`/etiquette_page`}>화장실 에티켓</Link>
          </li>
          <li>
            <Link href={`/tip_page`}>쾌변하는 꿀팁</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default HomeCategory;
