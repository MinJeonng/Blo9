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
  const recentTime = new Date(time);
  const nowTime = new Date();

  // 같은 날인지 확인함
  const isSameDay =
    recentTime.getFullYear() === nowTime.getFullYear() &&
    recentTime.getMonth() === nowTime.getMonth() &&
    recentTime.getDate() === nowTime.getDate();

  if (isSameDay) {
    // 같은 날일 때 오전/오후 HH:MM 형식으로 표시
    const hours = recentTime.getHours();
    const minutes = recentTime.getMinutes().toString().padStart(2, '0');
    const period = hours < 12 ? '오전' : '오후';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');

    return `${period} ${formattedHours}:${minutes}`;
  } else {
    // 다른 날일 때 ~월 ~일 형식으로 표시
    return `${recentTime.getFullYear()}년 ${
      recentTime.getMonth() + 1
    }월 ${recentTime.getDate()}일`;
  }
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
