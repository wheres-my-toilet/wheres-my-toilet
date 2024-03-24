import Link from 'next/link';

function HomeCategory() {
  return (
  <nav>
    <ul className="w-auto m-10">
      <li className="p-5 border-gray-500 m-3  rounded-md shadow-sm  hover:shadow-md   hover:font-bold hover: hover:shadow-slate-400 ">
        <Link href={`/bookmark_page`}>Favorite</Link>
      </li>
      <li className="p-5 border-gray-500 m-3 rounded-md  shadow-sm hover:shadow-md  hover:font-bold hover:  hover:shadow-slate-400">
        <Link href={`/etiquette_page`}>Etiquette</Link>
      </li>
      <li className="p-5 border-gray-500 m-3  rounded-md  shadow-sm hover:shadow-md   hover:font-bold hover:  hover:shadow-slate-400">
        <Link href={`/tip_page`}>TIP</Link>
      </li>
    </ul>
  </nav>
  );
}

export default HomeCategory;
