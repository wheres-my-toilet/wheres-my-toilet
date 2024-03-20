'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logoImage from '../assets/images/logo.png';

const Header = () => {
  //현재 좌표 가져오기
  const handleGetCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('현재 좌표 : ', position.coords.latitude, position.coords.longitude);
    });
  };

  return (
    <header className="flex p-5 justify-between items-center">
      <button type="button" onClick={handleGetCurrentPosition}>
        현재 나의 위치
      </button>
      <h1>
        <Link href="/">
          <Image src={logoImage} alt="똥간 어디에?" width={224} height={34} />
        </Link>
      </h1>
      <Link href="/loginNsignup_page">로그인</Link>
    </header>
  );
};

export default Header;
