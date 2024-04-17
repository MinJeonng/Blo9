import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeStyle } from '../types';
import { useEffect, useState } from 'react';
import { BlogSidemenu, DefaultSidemenu, SetSidemenu } from './Sidemenus';
import axios from 'axios';
import { getColor } from './Functions';
import ProfileImage from './ProfileImage';
import { ReactComponent as IcoMenuLeft } from '../images/ico-menu-left.svg';
import { ReactComponent as IcoMenuRight } from '../images/ico-menu-right.svg';
import { ReactComponent as IcoSearch } from '../images/ico-search.svg';
import { ReactComponent as IcoArrLeft } from '../images/ico-arr-left.svg';
import { ReactComponent as Blo9Logo } from '../images/blo9_logo.svg';
import useAuth from '../hooks/useAuth';
import { MainSetBtn } from './Btns';

const BoxStyle = styled.div`
  width: 100%;
  height: 70px;
  position: sticky;
  top: 0;
  left: 0;
  border-bottom: 1px solid #f1f1f1;
  z-index: 100;
  header {
    position: relative;
    width: 100%;
    height: 70px;
    line-height: 70px;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (min-width: 1160px) {
      width: 1200px;
      margin: 0 auto;
    }
  }
`;
const MenuList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  div {
    cursor: pointer;
    line-height: 66px;

    &.headerMenu {
      &:hover,
      &.on {
        border-bottom: 4px solid #fbc02d;
        font-weight: 700;
        box-sizing: border-box;
      }
    }
  }
`;
const Icon = styled.p<{ $url: string }>`
  width: 24px;
  height: 24px;
  background: url(${({ $url }) => `/images/ico-${$url}.png`}) no-repeat
    center/contain;
`;
const SearchBox = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
`;
const InputBox = styled.input`
  position: absolute;
  top: 0;
  left: 20px;
  right: 0;
  line-height: 40px;
  padding: 0 40px 0 20px;
  margin: 0;
  box-sizing: border-box;
  border-radius: 30px;
  border: 1px solid #acb1c6;
`;
const BtnBox = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  padding: 5px;
  background: #fbc02d;
  border-radius: 30px;
  font-size: 12px;
`;
const Text = styled.div`
  font-size: 18px;
  font-weight: bold;
  /* margin-left: 20px; */
`;
const BtnsWrap = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-left: 10px;
  }
  .imgBox {
    margin: 15px 6px 15px 0;
  }
`;
const TextCenter = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;

  font-size: 16px;
  font-weight: bold;
  line-height: 70px;
`;
const Title = styled.p`
  font-size: 16px;
`;

export function MainHeader() {
  const [sidemenu, setSidemenu] = useState<boolean>(false);
  const navigate = useNavigate();

  const closeFunc = () => {
    setSidemenu(false);
  };
  return (
    <>
      <BoxStyle className="headerBg">
        <header>
          <IcoMenuLeft
            onClick={() => setSidemenu(true)}
            className="changeStroke"
          />
          <Blo9Logo onClick={() => navigate('/')} className="changeFill" />
          <IcoSearch
            onClick={() => navigate('/search')}
            className="changeStroke"
          />
        </header>
      </BoxStyle>
      {sidemenu && <DefaultSidemenu func={closeFunc} />}
    </>
  );
}

export function MainPcHeader() {
  const { pathname } = useLocation();
  const [user, setUser] = useAuth();
  const [showSet, setShowSet] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setUser();
    }
  }, []);

  return (
    <BoxStyle className="headerBg">
      <header>
        <Blo9Logo onClick={() => navigate('/')} className="changeFill" />
        {Boolean(user.id) && (
          <MenuList className="menuList">
            <div
              className={
                pathname === '/post/write' ? 'headerMenu on' : 'headerMenu'
              }
              onClick={() => navigate('/post/write')}
            >
              글 작성하기
            </div>
            <div
              className={
                pathname === '/subscribe' ? 'headerMenu on' : 'headerMenu'
              }
              onClick={() => navigate('/subscribe')}
            >
              구독
            </div>
            <div
              className={pathname === '/like' ? 'headerMenu on' : 'headerMenu'}
              onClick={() => navigate('/like')}
            >
              좋아요
            </div>
            <div
              className={
                pathname.includes('setting') ? 'headerMenu on' : 'headerMenu'
              }
              onClick={() => navigate('/setting')}
            >
              설정
            </div>
            <div
              className={
                pathname.includes('chat') ? 'headerMenu on' : 'headerMenu'
              }
              onClick={() => navigate('/chat')}
            >
              메세지
            </div>
          </MenuList>
        )}
        <MenuList
          className="menuList pofileBox"
          onClick={() => (user.id ? setShowSet(!showSet) : navigate('/signup'))}
        >
          <div>{user.username || '로그인/회원가입'}</div>
          <ProfileImage id={user.id || 0} imgwidth="40px" />
        </MenuList>
        {showSet && <MainSetBtn />}
      </header>
    </BoxStyle>
  );
}

export function SubHeader({ children }: { children: string }) {
  const [sidemenu, setSidemenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const closeFunc = () => {
    setSidemenu(false);
  };
  return (
    <>
      <BoxStyle className="headerBg">
        <header>
          <IcoMenuLeft
            onClick={() => setSidemenu(true)}
            className="changeStroke"
          />
          <Text>{children}</Text>
          <IcoSearch
            onClick={() => navigate('/search')}
            className="changeStroke"
          />
        </header>
      </BoxStyle>
      {sidemenu && <DefaultSidemenu func={closeFunc} />}
    </>
  );
}

export function SearchHeader() {
  const navigate = useNavigate();
  return (
    <BoxStyle>
      <header>
        <Blo9Logo onClick={() => navigate('/')} className="changeFill" />
        <SearchBox>
          <InputBox />
          <BtnBox>
            <IcoSearch stroke="#fff" />
          </BtnBox>
        </SearchBox>
      </header>
    </BoxStyle>
  );
}

export function BlogHeader({ id }: { id: number }) {
  const navigator = useNavigate();
  const [theme, setTheme] = useState<ThemeStyle>({
    color: '#fff',
    background: '#333',
  });
  const [title, setTitle] = useState<string>('');
  const getBlogInfo = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/blog/find`,
      params: { memberId: id },
    });
    if (res.data.result) {
      setTitle(res.data.result.blogTitle);
    }
    getColor(
      setTheme,
      res.data.result.theme,
      res.data.result.fontColor,
      res.data.result.bgColor
    );
  };
  const [sidemenu, setSidemenu] = useState<boolean>(false);
  const closeFunc = () => {
    setSidemenu(false);
  };
  useEffect(() => {
    getBlogInfo();
  }, []);
  return (
    <>
      <BoxStyle
        style={{
          background: theme.color,
          color: theme.background,
        }}
      >
        <header>
          <Text
            onClick={() => navigator(`/blog/${id}`)}
            style={{ cursor: 'pointer' }}
          >
            {title}
          </Text>
          <BtnsWrap>
            <IcoSearch stroke={theme.background} />
            <IcoMenuRight
              stroke={theme.background}
              onClick={() => setSidemenu(true)}
            />
          </BtnsWrap>
        </header>
      </BoxStyle>
      {sidemenu && <BlogSidemenu func={closeFunc} />}
    </>
  );
}

export function SettingHeader({ children }: any) {
  const [sidemenu, setSidemenu] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1160);
  const navigate = useNavigate();

  useEffect(() => {
    function handleResize() {
      setIsLargeScreen(window.innerWidth > 1160);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeFunc = () => {
    setSidemenu(false);
  };

  return (
    <BoxStyle className="headerBg">
      <header>
        <Blo9Logo onClick={() => navigate('/')} className="changeFill" />
        <TextCenter>{children}</TextCenter>
        {!isLargeScreen && (
          <IcoMenuRight
            onClick={() => setSidemenu(true)}
            className="changeStroke"
          />
        )}
        {sidemenu && <SetSidemenu func={closeFunc} />}
      </header>
    </BoxStyle>
  );
}

export function ChattingHeader() {
  const navigate = useNavigate();
  return (
    <BoxStyle className="headerBg">
      <header>
        <Blo9Logo onClick={() => navigate('/')} className="changeFill" />
        <TextCenter>채팅</TextCenter>
        <Icon $url="search"></Icon>
      </header>
    </BoxStyle>
  );
}

export function ChatDetailHeader({
  id,
  children,
}: {
  id: number;
  children: string;
}) {
  return (
    <BoxStyle className="headerBg">
      <header>
        <BtnsWrap>
          <IcoArrLeft
            style={{ marginRight: '10px' }}
            onClick={() => document.location.reload()}
            className="changeStroke"
          />
          <ProfileImage id={id} imgwidth="40px" />
          <Title>{children}</Title>
        </BtnsWrap>
        <Icon $url="search"></Icon>
      </header>
    </BoxStyle>
  );
}

export function SignHeader() {
  const navigate = useNavigate();
  return (
    <BoxStyle className="headerBg">
      <header>
        <Blo9Logo onClick={() => navigate('/')} className="changeFill" />
      </header>
    </BoxStyle>
  );
}
