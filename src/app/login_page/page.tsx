'use client';

import Link from 'next/link';
import React from 'react';

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-left">
        <h1 className="text-4xl font-semibold ">로그인</h1>

        <form className="flex flex-col pt-10">
          <label htmlFor="id" className="">
            아이디
          </label>
          <input id="id" type="text" placeholder="ID" />
          <br />
          <label htmlFor="password">비밀번호</label>
          <input id="id" type="password" placeholder="PASSWORD" />
          <br />
          <button>로그인하기</button>
        </form>

        <div className="pt-5 flex gap-3">
          <p>아직 회원이 아니신가요?</p>
          <Link href="/signup_page" className="cursor-pointer">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
