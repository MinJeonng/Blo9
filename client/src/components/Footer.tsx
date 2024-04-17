import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as IcoArrLeft } from '../images/ico-arr-left.svg';

const FooterContainer = styled.div`
  background-color: #e6e6e6;
  align-items: center;
  padding: 30px;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 180px;
  display: flex;
  @media (min-width: 1160px) {
    height: 130px;
  }
`;
const FooterWidth = styled.div`
  margin: 0 auto;
  @media (min-width: 1160px) {
    width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;
const Span = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;

  text-align: center;
  line-height: 1.5;
  @media (max-width: 1160px) {
    margin-bottom: 10px;
  }
`;
const LinkInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    margin: 0 20px;
  }

  img {
    width: 32px;
    height: auto;
  }
  a:first-child {
    margin-left: 0;
  }
  a:last-child {
    margin-right: 0;
  }
`;
const SpanWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
export default function Footer() {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [isWide, setIsWide] = useState(window.innerWidth > 1160);
  const toggleComments = () => {
    setShowContent(!showContent);
  };
  useEffect(() => {
    const handleResize = () => {
      setIsWide(window.innerWidth > 1160);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <>
      <FooterContainer>
        <FooterWidth>
          <Logo>
            <img
              style={{ width: '22px', height: 'auto' }}
              src="/images/logo1.png"
              alt="로고1"
              onClick={() => {
                navigate('/');
                window.scrollTo(0, 0);
              }}
            />
            <img
              style={{ width: '76px', height: '24px', padding: '7px' }}
              src="/images/logo2.png"
              alt="로고2"
              onClick={() => {
                navigate('/');
                window.scrollTo(0, 0);
              }}
            />
            {!isWide && (
              <IcoArrLeft
                stroke="#999"
                style={{
                  cursor: 'pointer',
                  transform: showContent ? 'rotate(90deg)' : 'rotate(-90deg)',
                }}
                onClick={toggleComments}
              />
            )}
          </Logo>
          {!isWide && !showContent ? (
            <Span style={{ fontSize: '11px', color: '#C0C0C0' }}>
              Copyright ©99s All Rights Reserved.
            </Span>
          ) : null}
          {isWide || showContent ? (
            <>
              <SpanWrapper>
                <Span style={{ fontSize: '13px', color: '#8F8F8F' }}>
                  제작자 김민정, 최지은 | 주소 서울특별시 마포구 숭문4길 6 b1
                </Span>

                <Span style={{ fontSize: '11px', color: '#C0C0C0' }}>
                  Copyright ©99s All Rights Reserved.
                </Span>
              </SpanWrapper>
              <LinkInfo>
                <Link to="ppt 주소">
                  <img src="/images/ico-ppt.png" alt="ppt링크" />
                </Link>
                <Link to="https://github.com/cje206/99s.git" target="_blank">
                  <img src="/images/ico-github.png" alt="github링크" />
                </Link>
              </LinkInfo>
            </>
          ) : null}
        </FooterWidth>
      </FooterContainer>
    </>
  );
}
