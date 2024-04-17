export const getColor = (
  setfunc: (colors: any) => void,
  type: number,
  color?: string,
  background?: string
) => {
  switch (type) {
    case 1:
      setfunc({
        background: '#333',
        color: '#fff',
      });
      break;
    case 2:
      setfunc({
        background: '#fbc02d',
        color: '#f6f7f9',
      });
      break;
    case 3:
      setfunc({
        background: '#11804b',
        color: '#f6f7f9',
      });
      break;
    case 4:
      setfunc({
        background: '#352e91',
        color: '#f6f7f9',
      });
      break;
    case 5:
      setfunc({ background, color });
      break;

    default:
      break;
  }
};

export const getTimeText = (time: string) => {
  let recentTime = new Date(time);
  let nowTime = new Date();
  let displayTime = '';
  let hDiff = (nowTime.getTime() - recentTime.getTime()) / (60 * 60 * 1000);
  if (hDiff < 24) {
    recentTime.getHours() <= 12
      ? (displayTime = `오전 ${recentTime.getHours()}:${recentTime.getMinutes()}`)
      : (displayTime = `오후 ${
          recentTime.getHours() - 12
        }:${recentTime.getMinutes()}`);
  } else {
    displayTime = `${recentTime.getMonth() + 1}월 ${recentTime.getDate()}일`;
  }
  return displayTime;
};

export const htmlToText = (html: string): string => {
  let newHtml = html;
  while (newHtml.includes('<')) {
    const s = newHtml.indexOf('<');
    const e = newHtml.indexOf('>') + 1;
    const subString = newHtml.slice(s, e);
    newHtml = newHtml.replaceAll(subString, '');
  }
  return newHtml;
};

export const getThumbnail = (html: string): string => {
  if (html.includes('<img src="')) {
    const [_, start] = html.split('<img src="');
    const [imgUrl, __] = start.split('">');
    return imgUrl;
  }
  return '/images/no-image.jpg';
};

export const handleCopyClipBoard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(
      `${process.env.REACT_APP_BASEURL}` + text
    );
    alert('클립보드에 링크가 복사되었어요.');
  } catch (err) {
    console.log(err);
  }
};
