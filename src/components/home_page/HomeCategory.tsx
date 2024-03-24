import Link from 'next/link';

function HomeCategory() {
  return (
    <ul className='md:w-auto'>
        <li className="border-2  p-1 m-3">
          <Link href={`/login_page`}> 즐겨찾기</Link>
        </li>
        <li className='border-2 m-3 p-1'>
          <Link href={`/etiquette_page`}>화장실 에티켓</Link>
        </li >
        <li className='border-2 m-3 p-1'>
          <Link href={`/tip_page`} className='' >쾌변하는 꿀팁</Link>
        </li>
    </ul>
  );
}

export default HomeCategory;
