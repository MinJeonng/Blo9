// import styled from '@emotion/styled';
import styled from 'styled-components';

//스와이프 인기게시글
export const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 1190px) {
    height: 100%;
  }
`;

export const SlideContainer = styled.div`
  width: 100%;
  @media (min-width: 1160px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  border-radius: 20px;
`;

export const PostImage = styled.div`
  /* width: 100%;
  height: 100%; */
  @media (max-width: 1190px) {
    margin: 20px 20px 10px 20px;
  }

  border-radius: 20px;
  position: relative;
  overflow: hidden;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

type ImageCounterProps = {
  imgCount: number;
  index: number;
};

export const ImageCounter = styled.div<ImageCounterProps>`
  width: 6px;
  height: 6px;
  background: ${({ index, imgCount }) =>
    index === imgCount - 1 ? '#0095f6' : '#a8a8a8'};
  border-radius: 50%;
  &:not(:last-of-type) {
    margin-right: 4px;
  }
`;

export const ImageCounterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  margin-top: 15px;
`;

interface StyledImgDivProps {
  imgCount: number;
  positionx: number;
  endSwipe: boolean;
}

export const StyledImgDiv = styled.div<StyledImgDivProps>`
  display: flex;
  width: 100vw;
  height: fit-content;
  transition: transform ${({ endSwipe }) => (endSwipe ? '0.2s' : '0s')};
  transform: translateX(
    ${({ imgCount, positionx }) =>
      `calc(${positionx}px + ${-100 * (imgCount - 1)}%)`}
  );
`;

export const MainPopularContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

//가로로 된 post정보

export const PostInfoContainer = styled.div`
  @media (max-width: 1160px) {
    margin: 20px 20px 0 20px;
  }
  @media (min-width: 1160px) {
    display: flex;
    justify-content: space-between;
  }
`;

export const ImgPost = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

//category 게시글
export const PostCategoryContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;
  @media (max-width: 1160px) {
    display: flex;
    flex-direction: column;
  }
`;

export const ImgCategory = styled.img`
  width: 100%;
  height: 100%;
  @media (min-width: 1160px) {
    height: 250px;
  }
  border-radius: 10px;
  object-fit: cover;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  @media (max-width: 1160px) {
    justify-content: space-around;
  }
  align-items: center;
  margin: 40px 20px 0 20px;
`;

export const StyledButton = styled.button`
  border-radius: 20px;
  padding: 10px 20px;
  background-color: #fff;
  color: #313030;
  font-weight: bold;
  @media (min-width: 1160px) {
    margin-right: 20px;
    font-size: 17px;
  }
  &:hover {
    background-color: #ffcf58;
  }

  &:focus {
    outline: none;
    border-color: #c9d9eb;
  }
`;
export const TextDetail = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;
export const PostDetail = styled.div`
  flex-direction: column;
`;
export const ButtonExtra = styled.div`
  margin: 20px 20px 0 20px;
  display: flex;
  justify-content: center;
`;

export const ButtonExtraStyled = styled.button`
  border-radius: 20px;
  padding: 10px 50px;
  border: 1px solid #d9dbdf;
  margin-right: 5px;
  color: #43a046;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #c5e4c6;
    color: black;
  }
  &:focus {
    outline: none;
    border-color: #c9d9eb;
  }

  // 조건부 스타일 적용
`;
export const TitleInput = styled.input`
  margin-bottom: 9px;
  border-radius: 0.5em;
  width: 100%;
`;
