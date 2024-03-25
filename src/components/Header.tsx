'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { useUserLocationStore } from '@/shared/store/UserLocation';
import { BiCurrentLocation } from 'react-icons/bi';
import { getAddress } from '@/util/header/getAddress';

import logoImage from '../assets/images/wheres_my_toilet1_icon.png';
import { LuLogIn } from 'react-icons/lu';
import { IoLogOutOutline } from 'react-icons/io5';
import { ssronet } from '@/shared/fonts/font';
import { supabase } from '@/shared/supabase/supabase';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/api/reviewQuery/queryFunction';
import { useLogoutMutation } from '@/util/header/logoutQuery';
import { useLoggedInUserStore } from '@/shared/store/LoggedInUser';

const Header = () => {
  const [userAddress, setUserAddress] = useState('');
  const { userLocation, setLocation } = useUserLocationStore();
  const logoutMutation = useLogoutMutation();
  const { setUserData } = useLoggedInUserStore();

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  const email = data?.user_metadata.email;

  //현재 좌표 가져오기
  const handleGetCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
    });
  };

  const handleClickLogout = async () => {
    logoutMutation.mutate();
    setUserData({
      email: '',
      user_uid: '',
      nickname: 'poopy',
    });
  };

  useEffect(() => {
    getAddress({ setUserAddress, userLocation });
  }, [userLocation]);

  useEffect(() => {
    handleGetCurrentPosition();
  }, []);

  return (
    <header className="flex p-4 items-center justify-between flex-wrap">
      <button type="button" className="flex items-center max-w-40 text-sm order-1" onClick={handleGetCurrentPosition}>
        <BiCurrentLocation size="25" color="black" />
        <div className={`flex flex-col min-w-20 pl-1 text-xs text-left`}>
          현재 나의 위치{' '}
          <span className="text-sm font-semibold">{userAddress ? <p>{userAddress}</p> : <p>찾는중</p>}</span>
        </div>
      </button>
      <div className="min-w-40 order-3 md:order-2 w-full md:w-auto text-center">
        <Link href="/home_page">
          <div className="flex flex-col justify-center items-center text-center">
            <Image src={logoImage} alt="똥간은 어디에?" width={24} height={34} />
            <p className={`${ssronet.variable} font-ssronet font-semibold text-xl`}>똥간은 어디에?</p>
          </div>
        </Link>
      </div>
      <div className="order-2 md:order-3 text-sm">
        {email ? (
          <>
            <button
              className=" text-center flex flex-row gap-1 items-center cursor-pointer"
              onClick={handleClickLogout}
            >
              로그아웃
              <IoLogOutOutline size={20} />
            </button>
          </>
        ) : (
          <>
            <Link className=" text-center flex flex-row gap-1 items-center" href="/login_page">
              로그인
              <LuLogIn size={20} />
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
