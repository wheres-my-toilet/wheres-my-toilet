import { supabase } from '@/shared/supabase/supabase';
import { ChangeEvent, FormEvent, useState } from 'react';

export function Form() {
  const [userInfo, setUserInfo] = useState({ nickname: '', email: '', password: '' });
  const handleUserInfo = {
    handleNickname: (event: ChangeEvent<HTMLInputElement>) => {
      setUserInfo((prev) => ({
        ...prev,
        nickname: event.target.value,
      }));
    },
    handleEmail: (event: ChangeEvent<HTMLInputElement>) => {
      setUserInfo((prev) => ({
        ...prev,
        email: event.target.value,
      }));
    },
    handlePassword: (event: ChangeEvent<HTMLInputElement>) => {
      setUserInfo((prev) => ({
        ...prev,
        password: event.target.value,
      }));
    },
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userInfo.email,
        password: userInfo.password,
        options: {
          data: {
            display_name: userInfo.nickname,
          },
        },
      });
      if (error) console.error(error);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="flex flex-col pt-10" onSubmit={handleSignup}>
      <label htmlFor="nickname">닉네임</label>
      <input
        id="nickname"
        type="text"
        placeholder="NICKNAME (최대 10자)"
        maxLength={10}
        value={userInfo.nickname}
        onChange={handleUserInfo.handleNickname}
        autoComplete="off"
      />
      <br />
      <label htmlFor="email">이메일</label>
      <input
        id="email"
        type="text"
        placeholder="EMAIL"
        value={userInfo.email}
        onChange={handleUserInfo.handleEmail}
        autoComplete="off"
      />
      <br />
      <label htmlFor="password">비밀번호</label>
      <input
        id="password"
        type="password"
        placeholder="PASSWORD (6+)"
        value={userInfo.password}
        onChange={handleUserInfo.handlePassword}
      />
      <br />
      <label htmlFor="verify_password">비밀번호 확인</label>
      <input id="verify_password" type="password" placeholder="VERIFY_PASSWORD" />
      <br />
      <button className="bg-gray-400">회원가입하기</button>
    </form>
  );
}
