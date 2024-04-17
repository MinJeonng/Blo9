import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { MainPcHeader, SubHeader } from '../components/Headers';
import axios from 'axios';
import { WriterList } from '../components/Lists';

interface Obj {
  blogId: number;
}

export default function Subscribe() {
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  const [user, setUser] = useAuth();
  const [subscribe, setSubscribe] = useState<Obj[]>();

  useEffect(() => {
    const getSub = async () => {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_HOST}/api/blog/subList`,
        params: { memberId: user.id },
      });
      setSubscribe(res.data.result);
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
        <SubHeader>구독 리스트</SubHeader>
      )}
      <div className="body">
        {Boolean(subscribe?.length) ? (
          subscribe?.map((val) => <WriterList id={val.blogId}></WriterList>)
        ) : (
          <div className="text">구독 리스트가 없습니다.</div>
        )}
      </div>
    </div>
  );
}
