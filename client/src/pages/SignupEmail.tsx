import React, { useRef, useState } from 'react';
import InputText from '../components/InputText';
import BtnLarge from '../components/BtnLarge';
import axios from 'axios';
import { SignHeader } from '../components/Headers';
import { useNavigate } from 'react-router-dom';
import { ErrorMsgRed } from '../components/ErrorMsg';

export default function SignupEmail() {
  const navigator = useNavigate();
  const nameRef = useRef<HTMLInputElement>();
  const birthRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const pwRef = useRef<HTMLInputElement>();

  const [username, setUsername] = useState<string>('');
  const [birth, setBirth] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [confirmPw, setConfirmPw] = useState<string>('');

  const checkBirth = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^0-9]/g, '');
    e.target.value = val.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
  };

  const signupFunc = async () => {
    if (username.length < 2) {
      alert('이름은 2자 이상 입력해주세요.');
      nameRef.current?.focus();
      return;
    }
    if (birth.length !== 10) {
      alert('생년월일을 정확히 입력해주세요.');
      birthRef.current?.focus();
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      alert('이메일을 정확히 입력해주세요.');
      emailRef.current?.focus();
      return;
    }
    if (pw.length < 5) {
      alert('비밀번호는 5자 이상으로 작성해주세요.');
      pwRef.current?.focus();
      return;
    }
    if (pw !== confirmPw) {
      alert('비밀번호가 일치하지 않습니다.');
      pwRef.current?.focus();
      return;
    }
    const res = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_HOST}/api/member/signup`,
      data: {
        username,
        birth,
        email,
        pw,
      },
    });
    if (res.data.success) {
      alert(`${username}님 회원가입이 완료되었습니다.`);
      navigator('/login');
    }
  };
  return (
    <div className="wrap">
      <SignHeader />
      <div className="body">
        <InputText text="이름" setValue={setUsername} refName={nameRef} />
        <InputText
          text="생년월일"
          placeholder="YYYY-MM-DD"
          setValue={setBirth}
          refName={birthRef}
          inputFunc={checkBirth}
        />
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
        <InputText
          text="비밀번호 확인"
          type="password"
          setValue={setConfirmPw}
        />
        {pw !== confirmPw && (
          <ErrorMsgRed>비밀번호가 일치하지 않습니다.</ErrorMsgRed>
        )}
        <BtnLarge text="회원가입" func={signupFunc} />
      </div>
    </div>
  );
}
