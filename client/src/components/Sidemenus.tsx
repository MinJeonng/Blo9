import styled from 'styled-components';
import ProfileImage from './ProfileImage';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ReactComponent as IcoChat } from '../images/ico-chat.svg';
import { ReactComponent as IcoSubscribe } from '../images/ico-subscribe.svg';
import { ReactComponent as IcoLike } from '../images/ico-like.svg';
import { ReactComponent as IcoDarkmode } from '../images/ico-darkmode.svg';
import { ReactComponent as IcoSet } from '../images/ico-set.svg';
import { ReactComponent as IcoWrite } from '../images/ico-write.svg';
import { ReactComponent as IcoLogout } from '../images/ico-logout.svg';
import { ReactComponent as IcoClose } from '../images/ico-close.svg';
import { ToggleBtn } from './Btns';
import { ArrList } from './Lists';
import axios from 'axios';

const SideBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  min-width: 320px;
  width: 100%;
  height: 100%;
  z-index: 200;
  box-sizing: border-box;
  .btnClose {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 24px;
  }
  .profileBox {
    position: relative;
    display: flex;
    padding: 50px 20px;
    background-color: #f6f7f9;
    .profileText {
      width: 80%;
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-sizing: border-box;
      .blogLink {
        display: block;
        color: #777;
        font-size: 12px;
        margin-bottom: 10px;
      }
    }
  }
  .blogIcons {
    padding: 15px 20px;
    border-bottom: 1px solid #eaf1ea;
    box-sizing: border-box;
    @media (min-width: 1160px) {
      display: flex;
      align-items: center;
    }
    svg {
      margin-right: 10px;
    }
    .iconBox {
      display: flex;
      width: 100%;
      box-sizing: border-box;
      padding-left: 4px;
      justify-content: space-between;
      align-items: center;
    }
    &.darkmode {
      position: absolute;
      bottom: 0;
      width: 100%;
      border-top: 1px solid #eaf1ea;
    }
  }
  &.darkmode {
    background: #333;
    .profileBox {
      background: #333;
      border-bottom: 1px solid #eaf1ea;
    }
  }
`;

export function DefaultSidemenu({ func }: { func?: () => void }) {
  const [user, setUser] = useAuth();
  const [blog, setBlog] = useState<Boolean>(false);
  const [darkmode, setDarkmode] = useState<Boolean>(false);
  const logoutFun = () => {
    if (!window.confirm('로그아웃 하시겠습니까?')) {
      return;
    }
    localStorage.removeItem('token');
    document.location.reload();
  };
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setUser();
    }
    if (localStorage.getItem('darkmode') === 'on') {
      setDarkmode(true);
    }
  }, []);
  useEffect(() => {
    const applyDark = () => {
      if (darkmode) {
        localStorage.setItem('darkmode', 'on');
        document.querySelector('.mainBox')?.classList.add('darkmode');
        document.querySelector('.mainBox')?.classList.remove('default');
      } else {
        localStorage.removeItem('darkmode');
        document.querySelector('.mainBox')?.classList.add('default');
        document.querySelector('.mainBox')?.classList.remove('darkmode');
      }
    };
    applyDark();
  }, [darkmode]);
  useEffect(() => {
    const getBlog = async () => {
      if (user.id) {
        const res = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_HOST}/api/blog/find`,
          params: { memberId: user.id },
        });
        setBlog(res.data.success);
      }
    };
    getBlog();
  }, [user]);

  return (
    <SideBox className="sideMenu">
      <div className="profileBox">
        <IcoClose
          className="btnClose changeStroke"
          onClick={func}
          style={{ cursor: 'pointer' }}
        />
        <ProfileImage id={user.id || 0} />
        {user.id ? (
          <div className="profileText">
            {blog ? (
              <Link to={`/blog/${user.id}`} className="blogLink">
                내 블로그
              </Link>
            ) : (
              <Link to={`/setting/blog`} className="blogLink">
                블로그 생성하기
              </Link>
            )}
            <p className="profileName">{user.username}</p>
          </div>
        ) : (
          <Link to="/signup" className="profileText">
            로그인/회원가입
          </Link>
        )}
      </div>
      {Boolean(localStorage.getItem('token')) && (
        <div className="menuBox">
          <Link to="/post/write" className="blogIcons">
            <IcoWrite stroke="#fbc02d" />
            <span>글 작성하기</span>
          </Link>
          <Link to="/subscribe" className="blogIcons">
            <IcoSubscribe stroke="#fbc02d" />
            <span>구독</span>
          </Link>
          <Link to="/like" className="blogIcons">
            <IcoLike stroke="#fbc02d" fill="none" />
            <span>좋아요</span>
          </Link>
          <Link to="/setting" className="blogIcons">
            <IcoSet stroke="#fbc02d" />
            <span>설정</span>
          </Link>
          <Link to="/chat" className="blogIcons">
            <IcoChat stroke="#fbc02d" />
            <span>메세지</span>
          </Link>
          <div className="blogIcons" onClick={logoutFun}>
            <IcoLogout stroke="#fbc02d" />
            <span>로그아웃</span>
          </div>
          <div
            className="blogIcons darkmode"
            onClick={() => setDarkmode(!darkmode)}
            style={{ cursor: 'pointer' }}
          >
            <IcoDarkmode stroke="#fbc02d" />
            <div className="iconBox">
              <p>다크모드</p>
              <ToggleBtn active={Boolean(darkmode)} />
            </div>
          </div>
        </div>
      )}
    </SideBox>
  );
}

export function SetSidemenu({ func }: { func?: () => void }) {
  const location = useLocation();
  const [url, setUrl] = useState(location.pathname);
  useEffect(() => {
    if (url !== location.pathname) {
      document.location.reload();
    }
  }, [location.pathname, url]);
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);
  return (
    <SideBox className="sideMenu">
      <IcoClose
        className="btnClose changeStroke"
        onClick={func}
        style={{ cursor: 'pointer' }}
      />
      <div className="body" style={{ paddingTop: '50px' }}>
        {/* <SetMenu /> */}
        <Link to="/setting">
          <ArrList>설정 홈</ArrList>
        </Link>
        <Link to="/setting/post">
          <ArrList>글 관리</ArrList>
        </Link>
        <Link to="/setting/category">
          <ArrList>카테고리 관리</ArrList>
        </Link>
        <Link to="/setting/info">
          <ArrList>개인정보 수정</ArrList>
        </Link>
        <Link to="/setting/blog">
          <ArrList>블로그 편집</ArrList>
        </Link>
      </div>
    </SideBox>
  );
}

export function BlogSidemenu({ func }: { func?: () => void }) {
  const location = useLocation();
  const { id } = useParams<{ id?: string }>();
  const [url, setUrl] = useState(location.pathname);
  const [list, setList] = useState<any[]>();
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);
  useEffect(() => {
    const getCategory = async () => {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_HOST}/api/blog/getCategory`,
        params: { memberId: Number(id) },
      });
      setList(res.data.result);
    };
    getCategory();
  }, [id]);
  useEffect(() => {
    if (url !== location.pathname) {
      document.location.reload();
    }
  }, [location.pathname, url]);
  return (
    <SideBox className="sideMenu">
      <IcoClose
        className="btnClose changeStroke"
        onClick={func}
        style={{ cursor: 'pointer' }}
      />
      <div className="body" style={{ paddingTop: '50px' }}>
        <Link to={`/blog/${id}/category`}>
          <ArrList>전체 글</ArrList>
        </Link>
        {list?.length === 0 ||
          list?.map((data) => (
            <Link to={`/blog/${id}/category/${data.id}`} key={data.id}>
              <ArrList>{data.categoryName}</ArrList>
            </Link>
          ))}
      </div>
    </SideBox>
  );
}
