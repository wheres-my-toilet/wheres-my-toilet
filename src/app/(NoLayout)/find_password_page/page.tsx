'use client';

import { findPassword } from '@/util/find_password_page/findPassword';
import Link from 'next/link';
import React, { useState } from 'react';

const Reset = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const sendEmail = () => {
    findPassword({ email, setEmail });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-left">
        <h1 className="text-4xl font-semibold ">비밀번호 재설정하기</h1>
        <form className="flex flex-col pt-10" onSubmit={sendEmail}>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="text"
            placeholder="가입 시 사용한 EMAIL 주소를 입력하세요"
            autoComplete="off"
            value={email}
            onChange={handleEmailChange}
          />
          <br />
          <button className="bg-gray-400">재설정 이메일 보내기</button>
        </form>
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

export default Reset;
