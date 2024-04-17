import React, { useEffect } from 'react';
import SingupBtn from '../components/SingupBtn';
import '../styles/signup.scss';
import { Link } from 'react-router-dom';
import { SignHeader } from '../components/Headers';
import Footer from '../components/Footer';

export default function Signup() {
  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `회원가입`;
  }, []);
  return (
    <div className="wrap">
      <SignHeader />
      <div className="body signup">
        <h1 className="title">Blo9 회원가입</h1>
        <p className="subText">
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </p>
        <div className="singupBtns">
          <SingupBtn text="이메일로 회원가입" method="email" />
          <SingupBtn text="test 계정 1로 로그인" method="test1" />
          <SingupBtn text="test 계정 2로 로그인" method="test2" />
          <SingupBtn text="test 계정 3로 로그인" method="test3" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
