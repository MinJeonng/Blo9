import { useEffect, useState } from 'react';
import QuillEditor from '../components/PostCreate';
import { MainPcHeader } from '../components/Headers';

export default function Post({ position }: { position: string }) {
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', () => setInnerWidth(window.innerWidth));
  }, []);
  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `글쓰기`;
  }, []);
  return (
    <div className="wrap">
      {innerWidth >= 1160 && <MainPcHeader />}
      {position === '글 작성' && (
        <QuillEditor placeholder={'내용을 입력해주세요'} value={undefined} />
      )}
      {/* {position === '글 확인' && (<)} */}
    </div>
  );
}
