'use client';

import React from 'react';
import Link from 'next/link';

import { Form } from '@/components/signup_components/Form';

const Signup = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-left">
        <h1 className="text-4xl font-semibold ">회원가입</h1>
        <Form />
        <div className="pt-5 flex gap-3">
          <p>이미 회원이신가요?</p>
          <Link href="/login_page" className="cursor-pointer text-slate-700 underline">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
