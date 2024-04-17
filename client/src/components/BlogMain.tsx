import { Link, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import '../styles/BlogMain.scss';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { ReactComponent as IcoChat } from '../images/ico-chat.svg';
import { ReactComponent as IcoSubscribe } from '../images/ico-subscribe.svg';
import { ReactComponent as IcoPost } from '../images/ico-post.svg';
import { ReactComponent as IcoShare } from '../images/ico-share.svg';
import { ThemeStyle, WriterInfoObj } from '../types';
import ProfileImage from '../components/ProfileImage';
import { SubscribeBtn } from './Btns';
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const BlogMainContainer = styled.div<{ link?: string }>`
  display: flex;
  margin: 20px 20px 0 20px;
`;

const BlogDetail = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-left: 20px;
  box-sizing: border-box;
  .nickName {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    p {
      font-weight: bold;
      font-size: 18px;
    }
  }
  .blogInfo {
    font-size: 14px;
    line-height: 1.2;
    color: #7e7f81;
  }
`;

export default function BlogMain({
  blogid,
  theme,
}: {
  blogid: number;
  theme: ThemeStyle;
}) {
  const { pathname } = useLocation();
  const { id } = useParams<{ id?: string }>();
  const [user, setUser] = useAuth();
  const [subscribe, setSubscribe] = useState<Boolean>(false);
  const [blogInfo, setBlogInfo] = useState<WriterInfoObj>();
  const [postCount, setPostCount] = useState<number>(0);
  const checkSub = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/blog/checkSub`,
      params: { memberId: user.id, blogId: blogid },
    });
    setSubscribe(res.data.success);
  };

  const getBlog = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/sub/getInfo`,
      params: { blogId: blogid },
    });
    setBlogInfo(res.data.result);
  };

  const getPost = async () => {
    if (id) {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_HOST}/api/post/category`,
        params: { id },
      });
      setPostCount(res.data.result.length);
    }
  };
  useEffect(() => {
    if (user.id) {
      checkSub();
    }
  }, [blogInfo, subscribe]);
  useEffect(() => {
    if (blogid) {
      getBlog();
      getPost();
    }
  }, [blogid, subscribe]);
  useEffect(() => {}, [user]);
  useEffect(() => {
    setUser();
  }, []);

  return (
    <div className="blog">
      <BlogMainContainer>
        <ProfileImage id={Number(id)} imgwidth="70px" />
        <BlogDetail>
          <div className="nickName">
            <p>{blogInfo?.nickname}</p>
            {Boolean(user.id) && Number(id) !== user.id && (
              <SubscribeBtn sub={subscribe} func={setSubscribe} />
            )}
          </div>
          <div className="blogInfo">{blogInfo?.blogInfo}</div>
        </BlogDetail>
      </BlogMainContainer>
      <div className="hr" style={theme}>
        <div className="linkChat">
          {Boolean(user.id) && (
            <>
              {user.id === blogInfo?.memberId ? (
                <Link to="/chat" className="blogIcons">
                  <IcoChat stroke={theme.color}></IcoChat>
                  <span>채팅 목록</span>
                </Link>
              ) : (
                <Link
                  to="/chat"
                  className="blogIcons"
                  onClick={() => localStorage.setItem('chat', id || '0')}
                >
                  <IcoChat stroke={theme.color}></IcoChat>
                  <span>1:1 채팅</span>
                </Link>
              )}
            </>
          )}
        </div>
        <div className="react">
          <div className="blogIcons subscribeCount">
            <IcoSubscribe stroke={theme.color}></IcoSubscribe>
            <span>{blogInfo?.subscribeCount}</span>
          </div>
          <div className="blogIcons postCount">
            <IcoPost stroke={theme.color}></IcoPost>
            <span>{postCount}</span>
          </div>
          <CopyToClipboard
            text={`${process.env.REACT_APP_BASEURL}${pathname}`}
            onCopy={() => alert('클립보드에 링크가 복사되었어요.')}
          >
            <IcoShare stroke={theme.color}></IcoShare>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
}
