import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  text: string;
  method: string;
}

const BoxStyle = styled.div`
  width: 100%;
  border: 2px solid #fbc02d;
  border-radius: 50px;
  img {
    display: inline-block;
    width: 50px;
    height: 50px;
    padding: 0 10px;
  }
  span {
    display: inline-block;
    line-height: 50px;
    height: 50px;
    vertical-align: top;
  }
`;

export default function SingupBtn({ text, method }: Props) {
  const clickFunc = async (test: string) => {
    if (test === 'test1') {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_HOST}/api/member/login`,
        params: { email: '11@11.11', pw: '111111', maintain: false },
      });
      if (res.data.success) {
        alert(`${res.data.result.username}님 환영합니다!`);
        localStorage.setItem('token', res.data.token);
        document.location.href = '/';
      }
    } else if (test === 'test2') {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_HOST}/api/member/login`,
        params: { email: '22@22.22', pw: '222222', maintain: false },
      });
      if (res.data.success) {
        alert(`${res.data.result.username}님 환영합니다!`);
        localStorage.setItem('token', res.data.token);
        document.location.href = '/';
      }
    } else if (test === 'test3') {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_HOST}/api/member/login`,
        params: { email: '33@33.33', pw: '333333', maintain: false },
      });
      if (res.data.success) {
        alert(`${res.data.result.username}님 환영합니다!`);
        localStorage.setItem('token', res.data.token);
        document.location.href = '/';
      }
    }
  };
  return (
    <Link
      to={method === 'email' ? `/signup/email` : ''}
      className="signupBtn"
      onClick={() => clickFunc(method)}
    >
      <BoxStyle>
        <img src={`/images/signup-email.png`} alt={text} />
        <span>{text}</span>
      </BoxStyle>
    </Link>
  );
}
