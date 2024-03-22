'use client';

import React from 'react';
import Image from 'next/image';

import Icon from '@/assets/images/wheres_my_toilet1_icon.png';
import { ssronet } from '@/shared/fonts/font';

const Intro = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center gap-10 bg-black">
        <h1 className={`${ssronet.variable} font-ssronet text-8xl tracking-widest text-white`}>
          <span className="">똥간</span>은<br />
        </h1>
        <h1 className={`${ssronet.variable} font-ssronet text-8xl tracking-widest text-white`}>어디에?</h1>
        <Image src={Icon} alt="똥간 어디에?" width={224} height={34} />
      </div>
    </div>
  );
};

export default Intro;
