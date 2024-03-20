'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import logoImage from '../assets/images/logo.png';
import { useUserLocationStore } from '@/shared/store/UserLocation';

const Header = () => {
  const [userAddress, setUserAddress] = useState<string>('');
  const { userLocation, setLocation } = useUserLocationStore();

  //현재 좌표 가져오기
  const handleGetCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('현재 좌표 : ', position.coords.latitude, position.coords.longitude);
      setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
    });
  };

  //kakao rest api 위도/경도 -> 주소 변환
  const getAddress = async () => {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${userLocation.lng}&y=${userLocation.lat}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
        },
      },
    );
    const { documents } = await response.json();
    const address = documents[0]?.address;
    setUserAddress(address.region_1depth_name + ' ' + address.region_2depth_name);
  };

  useEffect(() => {
    handleGetCurrentPosition();
    getAddress();
  }, [userLocation]);

  return (
    <header className="flex p-5 justify-between items-center">
      <div>
        <button type="button" onClick={handleGetCurrentPosition}>
          현재 나의 위치
        </button>
        <p>{userAddress}</p>
      </div>
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
