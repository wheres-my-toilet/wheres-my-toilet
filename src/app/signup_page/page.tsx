'use client';

import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-left">
        <h1 className="text-4xl font-semibold ">회원가입</h1>

        <form className="flex flex-col pt-10">
          <label htmlFor="id" className="">
            아이디
          </label>
          <input id="id" type="text" placeholder="ID" />
          <br />
          <label htmlFor="password">비밀번호</label>
          <input id="id" type="password" placeholder="PASSWORD" />
          <br />
          <button>회원가입하기</button>
        </form>

        <div className="pt-5 flex gap-3">
          <p> 이미 회원이신가요?</p>
          <Link href="/login_page" className="cursor-pointer">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
