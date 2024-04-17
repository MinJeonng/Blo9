import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { MainPcHeader, SubHeader } from '../components/Headers';
import { PostList } from '../components/Lists';

interface Obj {
  postId: number;
}

export default function Like() {
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  const [user, setUser] = useAuth();
  const [like, setLike] = useState<Obj[]>();
  useEffect(() => {
    const getSub = async () => {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_HOST}/api/like/likeList`,
        params: { memberId: user.id },
      });
      setLike(res.data.result);
    };
    if (user.id) {
      getSub();
    }
  }, [user]);
  useEffect(() => {
    window.addEventListener('resize', () => setInnerWidth(window.innerWidth));
    if (localStorage.getItem('token')) {
      setUser();
    } else {
      alert('로그인 후 이용할 수 있습니다.');
      document.location.href = '/signup';
    }
  }, []);
  return (
    <div className="wrap">
      {innerWidth >= 1160 ? (
        <MainPcHeader />
      ) : (
        <SubHeader>좋아요 리스트</SubHeader>
      )}

      <div className="body">
        {Boolean(like?.length) ? (
          like?.map((val) => <PostList id={val.postId}></PostList>)
        ) : (
          <div className="text">좋아요 리스트가 없습니다.</div>
        )}
      </div>
    </div>
  );
}
