import { useLoggedInUserStore } from '@/shared/store/LoggedInUser';
import { supabase } from '@/shared/supabase/supabase';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

import { errors } from '@/util/login_page/error';

export function Form() {
  const router = useRouter();
  const { setUserData } = useLoggedInUserStore();
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });

  const handleLoginInfo = {
    handleEmail: (event: ChangeEvent<HTMLInputElement>) => {
      setLoginInfo((prev) => ({
        ...prev,
        email: event.target.value,
      }));
    },
    handlePassword: (event: ChangeEvent<HTMLInputElement>) => {
      setLoginInfo((prev) => ({
        ...prev,
        password: event.target.value,
      }));
    },
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginInfo.email,
        password: loginInfo.password,
      });
      if (error) {
        switch (error.message) {
          case errors.INVALID_LOGIN_CREDENTIAL:
            alert('이메일 또는 비밀번호가 올바르지 않습니다.');
            break;
          default:
            alert(`에러가 발생하였습니다.\n${error.message}`);
        }
        return;
      }
      if (data) {
        setUserData({ email: loginInfo.email, user_uid: data.user.id, nickname: data.user.user_metadata.display_name });
        router.push('/home_page');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="flex flex-col pt-10" onSubmit={handleLogin}>
      <label htmlFor="email">이메일</label>
      <input
        id="email"
        type="text"
        placeholder="EMAIL"
        value={loginInfo.email}
        onChange={handleLoginInfo.handleEmail}
        autoComplete="off"
      />
      <br />
      <label htmlFor="password">비밀번호</label>
      <input
        id="password"
        type="password"
        placeholder="PASSWORD (6+)"
        value={loginInfo.password}
        onChange={handleLoginInfo.handlePassword}
      />
      <br />
      <button className="bg-gray-400">로그인하기</button>
    </form>
  );
}
