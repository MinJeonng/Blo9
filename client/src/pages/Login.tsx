import { useEffect, useRef, useState } from 'react';
import InputText from '../components/InputText';
import BtnLarge from '../components/BtnLarge';
import { SignHeader } from '../components/Headers';
import '../styles/signup.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigator = useNavigate();
  const emailRef = useRef<HTMLInputElement>();
  const pwRef = useRef<HTMLInputElement>();
  const [maintain, setMaintain] = useState<Boolean>(false);
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const loginFunc = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/member/login`,
      params: { email, pw, maintain },
    });
    if (res.data.success) {
      alert(`${res.data.result.username}님 환영합니다!`);
      localStorage.setItem('token', res.data.token);
      navigator('/');
    } else if (res.data.msg === '이메일 오류') {
      alert('존재하지 않는 메일입니다.');
      emailRef.current?.focus();
    } else if (res.data.msg === '비밀번호 오류') {
      alert('비밀번호가 일치하지 않습니다.');
      pwRef.current?.focus();
    }
  };
  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `로그인`;
  }, []);
  return (
    <div className="wrap">
      <SignHeader />
      <div className="body">
        <InputText
          text="이메일"
          type="email"
          setValue={setEmail}
          refName={emailRef}
        />
        <InputText
          text="비밀번호"
          type="password"
          setValue={setPw}
          refName={pwRef}
        />
        <div className="autoLogin">
          <input
            type="checkbox"
            id="autoLogin"
            onChange={(e) => setMaintain(e.target.checked)}
          />
          <label htmlFor="autoLogin"> 자동 로그인</label>
        </div>
        <BtnLarge text="로그인" func={loginFunc} />
      </div>
    </div>
  );
}
