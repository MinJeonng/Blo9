import styled from 'styled-components';
import { ReactComponent as DefaultPropfile } from '../images/default-profile.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getColor } from './Functions';
import { ColorObject } from '../types';

const ProfileImg = styled.div<{ link?: string }>`
  background: url('${(props) => props.link}') no-repeat center/cover;
  &::before {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;
const DefaultImg = styled.div<{ imgwidth: string }>`
  width: ${(props) => props.imgwidth};
  height: fit-content;
  border-radius: 50%;
  overflow: hidden;
  background: #f6f7f9;
  svg {
    display: block;
    width: 100%;
    height: auto;
  }
`;

export default function ProfileImage({
  id,
  imgwidth,
  profileimg,
  setPreview,
}: {
  id: number;
  imgwidth?: string;
  profileimg?: string | null;
  setPreview?: (writerImg: string) => void;
}) {
  const [profile, setProfile] = useState<{ img: string | null }>({ img: null });
  const [theme, setTheme] = useState<ColorObject>({
    background: '#fbc02d',
    color: '#f6f7f9',
  });
  useEffect(() => {
    if (profileimg) {
      setProfile({ img: profileimg });
    } else {
      setProfile({ img: null });
    }
  }, [profileimg]);

  useEffect(() => {
    const getProfile = async () => {
      if (id !== 0) {
        const res = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_HOST}/api/blog/find`,
          params: { memberId: id },
        });
        if (res.data.result) {
          // res.data.result가 존재하는지 확인
          const { writerImg, bgColor, fontColor } = res.data.result;
          setProfile({
            img: writerImg,
          });
          if (setPreview) setPreview(writerImg);
          getColor(setTheme, res.data.result.theme, fontColor, bgColor);
        } else {
          // res.data.result가 null이거나 undefined일 경우 처리
          // 필요한 경우 기본값 설정
          setProfile({ img: null });
          setTheme({
            background: '#fbc02d',
            color: '#f6f7f9',
          });
        }
      }
    };
    if (id !== 0) getProfile();
  }, [id]);

  return (
    <>
      {Boolean(id) ? (
        <DefaultImg className="imgBox" imgwidth={imgwidth ? imgwidth : '20%'}>
          {profile.img ? (
            <ProfileImg link={profile.img} />
          ) : (
            <DefaultPropfile fill={theme.background} />
          )}
        </DefaultImg>
      ) : (
        <DefaultImg className="imgBox" imgwidth={imgwidth ? imgwidth : '20%'}>
          <DefaultPropfile fill={theme.background} />
        </DefaultImg>
      )}
      {/*  */}
    </>
  );
}
