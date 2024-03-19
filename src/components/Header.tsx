import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <header className="flex p-4 justify-between">
      <h1>
        <Link href="/">똥간은 어디에?</Link>
      </h1>
    </header>
  );
};

export default Header;
