'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { useUserLocationStore } from '@/shared/store/UserLocation';
import { BiCurrentLocation } from 'react-icons/bi';
import { getAddress } from '@/util/header/getAddress';

import logoImage from '../assets/images/logo.png';

const Header = () => {
  const [userAddress, setUserAddress] = useState('');
  const { userLocation, setLocation } = useUserLocationStore();

  //현재 좌표 가져오기
  const handleGetCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
    });
  };

  useEffect(() => {
    getAddress({ setUserAddress, userLocation });
  }, [userLocation]);

  useEffect(() => {
    handleGetCurrentPosition();
  }, []);

  return (
    <header className="flex p-5 justify-between items-center">
      <button type="button" className="flex items-center" onClick={handleGetCurrentPosition}>
        <BiCurrentLocation size="40" />
        <span className="pl-1 flex flex-col">
          현재 나의 위치 <strong>{userAddress ? <p>{userAddress}</p> : <p>찾는중</p>}</strong>
        </span>
      </button>
      <h1>
        <Link href="/">
          <Image src={logoImage} alt="똥간 어디에?" width={224} height={34} />
        </Link>
      </h1>
      <Link href="/login_page">로그인</Link>
    </header>
  );
};

export default Header;
