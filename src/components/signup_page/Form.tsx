import { supabase } from '@/shared/supabase/supabase';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

export function Form() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ nickname: '', email: '', password: '', verify_password: '' });
  //에러 유형 - 따로 빼는 것이 좋아보임
  const INVALID_PASSWORD = 'Password should be at least 6 characters.';
  const INVALID_EMAIL = 'Unable to validate email address: invalid format';
  const EXISTING_EMAIL = 'User already registered';

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
    handleVerifyPassword: (event: ChangeEvent<HTMLInputElement>) => {
      setUserInfo((prev) => ({
        ...prev,
        verify_password: event.target.value,
      }));
    },
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (isVerifiedPassword({ password: userInfo.password, verify_password: userInfo.verify_password })) {
        const { data, error } = await supabase.auth.signUp({
          email: userInfo.email,
          password: userInfo.password,
          options: {
            data: {
              display_name: userInfo.nickname,
            },
          },
        });
        if (error) {
          switch (error.message) {
            case INVALID_EMAIL:
              alert('유효하지 않은 이메일 형식입니다.');
              break;
            case INVALID_PASSWORD:
              alert('비밀번호는 6자 이상으로 설정해주세요.');
              break;
            case EXISTING_EMAIL:
              alert('이미 존재하는 이메일입니다.');
              break;
            default:
              alert(`에러가 발생하였습니다.\n${error.message}`);
          }
        } else {
          alert('반갑습니다! 오늘도 쾌변!');
          router.push('/login_page');
        }
      } else alert('비밀번호가 일치하지 않습니다.');
    } catch (error) {
      console.error(error);
    }
  };

  const isVerifiedPassword = ({ password, verify_password }: { password: string; verify_password: string }) => {
    return password === verify_password;
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
        required
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
      <input
        id="verify_password"
        type="password"
        placeholder="VERIFY_PASSWORD"
        value={userInfo.verify_password}
        onChange={handleUserInfo.handleVerifyPassword}
      />
      <br />
      <button className="bg-gray-400">회원가입하기</button>
    </form>
  );
}
