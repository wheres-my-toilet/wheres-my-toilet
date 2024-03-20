'use client';

import { Form } from '@/components/login_page/Form';
import Link from 'next/link';
import React from 'react';

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-left">
        <h1 className="text-4xl font-semibold ">로그인</h1>
        <Form />
        <div className="pt-5 flex gap-3">
          <p>아직 회원이 아니신가요?</p>
          <Link href="/signup_page" className="cursor-pointer text-slate-700 underline">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
