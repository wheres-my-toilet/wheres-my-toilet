'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import './figure.css';

import Icon from '@/assets/images/wheres_my_toilet1_icon.png';
import { ssronet } from '@/shared/fonts/font';
import { useFollowPointer } from './useFollowPointer';
import Link from 'next/link';

const Intro = () => {
  const ref = useRef(null);
  const { x, y } = useFollowPointer(ref);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center gap-10">
        <h1 className={`${ssronet.variable} font-ssronet text-8xl tracking-widest text-black `} style={{ zIndex: 2 }}>
          <Link href="/home_page">
            <motion.div
              className="inline-block"
              drag
              dragSnapToOrigin
              dragElastic={0.5}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
            >
              <motion.div
                className="box inline-block hover:text-amber-400 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                똥간
              </motion.div>
            </motion.div>
          </Link>
          은
        </h1>
        <h1 className={`${ssronet.variable} font-ssronet text-8xl tracking-widest text-black`} style={{ zIndex: 2 }}>
          어디에?
        </h1>
        <Image src={Icon} alt="똥간 어디에?" width={224} height={34} style={{ zIndex: 2 }} />
        <div>
          <motion.div
            ref={ref}
            className="circle"
            animate={{ x, y }}
            transition={{ type: 'spring' }}
            style={{ zIndex: 0 }}
          ></motion.div>
        </div>
        <div className={`${ssronet.variable} font-ssronet text-white text-left text-2xl`}>Project 심야코딩 🌙</div>
      </div>
    </div>
  );
};

export default Intro;
