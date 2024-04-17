import { Link, useParams } from 'react-router-dom';
import '../styles/BlogMain.scss';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import { BlogHeader } from '../components/Headers';
import { ThemeStyle } from '../types';
import { getColor } from '../components/Functions';
import BlogPosts, { BlogPopular } from '../components/BlogComponent';
import BlogMain from '../components/BlogMain';
import { NewPostBtn } from '../components/Btns';
import Footer from '../components/Footer';

interface Blog {
  id: number;
  memberId: number;
  nickname: string;
  blogTitle: string;
  theme: number;
  view: number;
  subscribeCount: number;
  subscribeList: number[] | [];
  fontColor: string;
  bgColor: string;
  writerImg?: string;
  blogInfo?: string;
}

export default function BlogHome({ position }: { position?: string }) {
  const { id } = useParams<{ id?: string }>();
  const [user, setUser] = useAuth();
  const [blogInfo, setBlogInfo] = useState<Blog>({
    id: 0,
    memberId: 0,
    nickname: '',
    blogTitle: '',
    theme: 1,
    view: 0,
    subscribeCount: 0,
    subscribeList: [],
    fontColor: '#fff',
    bgColor: '#333',
  });
  const [theme, setTheme] = useState<ThemeStyle>({
    background: '#333',
    color: '#fff',
  });

  useEffect(() => {
    setUser();
  }, []);
  useEffect(() => {
    const getBlogInfo = async () => {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_HOST}/api/blog/find`,
        params: { memberId: Number(id) },
      });
      if (res.data.result) {
        setBlogInfo(res.data.result);
      }
      getColor(
        setTheme,
        res.data.result.theme,
        res.data.result.fontColor,
        res.data.result.bgColor
      );
    };
    getBlogInfo();
  }, [user, id]);

  return (
    <div className="wrap">
      <BlogHeader id={Number(id)} />
      {blogInfo.id !== 0 ? (
        <div className="blogHome">
          <BlogMain blogid={blogInfo.id} theme={theme} />
          <div className="body">
            <BlogPopular />
            <BlogPosts theme={theme}>전체게시글</BlogPosts>
          </div>
          {blogInfo.memberId === user.id && <NewPostBtn theme={theme} />}
        </div>
      ) : (
        <div className="body">
          <h1 className="title">페이지를 찾을 수 없습니다</h1>
          <Link to="/">Blo9 홈으로 이동</Link>
        </div>
      )}
      <Footer />
    </div>
  );
}
