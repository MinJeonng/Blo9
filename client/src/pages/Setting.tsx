import { useEffect, useState } from 'react';
import { MainPcHeader, SettingHeader } from '../components/Headers';
import {
  PcSetMenu,
  SetBlog,
  SetCategory,
  SetHome,
  SetInfo,
  SetPost,
} from '../components/Settings';
import '../styles/_utils.scss';
import Footer from '../components/Footer';
import useAuth from '../hooks/useAuth';

export default function Setting({ position }: { position: string }) {
  const [user, setUser] = useAuth();
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1160);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setUser();
    } else {
      alert('로그인 후 이용 가능한 서비스입니다.');
      document.location.href = '/signup';
      return;
    }
    window.addEventListener('resize', () => setInnerWidth(window.innerWidth));
    function handleResize() {
      setIsLargeScreen(window.innerWidth > 1160);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `설정`;
  }, []);
  return (
    <div className="wrap">
      {innerWidth >= 1160 ? (
        <MainPcHeader />
      ) : (
        <SettingHeader>{position}</SettingHeader>
      )}
      <div className="setting">
        {isLargeScreen && (
          <div className="sideMenuPc">
            <PcSetMenu />
          </div>
        )}
        <div className="settingPc">
          <div className="body block">
            {position === '설정' && <SetHome />}
            {position === '글 관리' && <SetPost />}
            {position === '카테고리 관리' && <SetCategory />}
            {position === '개인정보 수정' && <SetInfo />}
            {position === '블로그 편집' && <SetBlog />}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
