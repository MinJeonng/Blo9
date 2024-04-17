import { slides } from '../data/ImgData';
import MainPageImgSlide from '../components/MainPageImgSlide';
import MainPopularPost from '../components/MainPopularPost';
import MainCategory from '../components/MainCategory';
import { items } from '../data/MainCategory';
import { MainHeader, MainPcHeader } from '../components/Headers';
import '../styles/common.scss';
import Footer from '../components/Footer';
import '../styles/Main.scss';
import { useEffect, useState } from 'react';
import { PostObject } from '../types';
import axios from 'axios';

export default function Main() {
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  const [popPost, setPopPost] = useState<PostObject[]>([
    {
      id: 0,
      postTitle: '',
      content: '',
      hashtag: [],
    },
  ]);
  const getPopPost = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/post/mainPop`,
    });
    setPopPost(res.data.result);
  };
  useEffect(() => {
    getPopPost();
    window.addEventListener('resize', () => setInnerWidth(window.innerWidth));
  }, []);
  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `Blog9`;
  }, []);
  return (
    <div className="wrap">
      {innerWidth >= 1160 ? <MainPcHeader /> : <MainHeader />}

      <div className="main-slide">
        <MainPageImgSlide slides={slides} />
      </div>
      <p className="category main">인기 게시글</p>
      <div className="mainPostContainer" style={{ overflow: 'hidden' }}>
        <div className="popularPost popPost">
          <MainPopularPost postlist={popPost} />
        </div>
      </div>

      <p className="category main" style={{ marginTop: '50px' }}>
        최신 게시글
      </p>
      <div className="categoryContainer">
        <MainCategory items={items} ShowContent={true} showPagination={false} />
      </div>
      <Footer />
    </div>
  );
}
