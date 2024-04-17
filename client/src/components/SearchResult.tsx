import { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchWriter from './SearchWriter';
import { items } from '../data/SearchData';
import MainPopularHorizontal from './MainPopularHorizontal';
import { data } from '../data/PopularHorizontalPost';

import { ButtonExtra, ButtonExtraStyled } from './MainPopularStyle';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;
  margin-top: 30px;
  width: 100%;
`;

interface NavButton {
  selectedBar: boolean;
}
const StyledButton = styled.button<NavButton>`
  border: none;
  flex-grow: 1;
  border-bottom: ${(props) =>
    props.selectedBar ? '2px solid #fbc02d' : '2px solid transparent'};
  font-weight: ${(props) => (props.selectedBar ? 'bold' : 'lighter')};
  transition: border-bottom 0.3s;
  font-size: 15px;
  padding: 10px 0;
`;

export default function SearchBar() {
  const [selectedBar, setSelectedBar] = useState('전체');
  const [showMoreWriter, setShowMoreWriter] = useState(false);
  const [showMoreContent, setShowMoreContent] = useState(false);
  const [showMoreTitle, setShowMoreTitle] = useState(false);

  const handleShowMoreWriter = () => {
    setSelectedBar('작성자');
    window.scrollTo(0, 0);
  };
  const handleShowMoreContent = () => {
    setSelectedBar('내용');
    window.scrollTo(0, 0);
  };
  const handleShowMoreTitle = () => {
    setSelectedBar('제목');
    window.scrollTo(0, 0);
  };

  //전체 눌렀을떄만 버튼보이게
  useEffect(() => {
    if (selectedBar === '전체') {
      setShowMoreWriter(true);
      setShowMoreContent(true);
      setShowMoreTitle(true);
    } else {
      setShowMoreWriter(false);
      setShowMoreContent(false);
      setShowMoreTitle(false);
    }
  }, [selectedBar]);

  return (
    <>
      <ButtonWrapper>
        <StyledButton
          selectedBar={selectedBar === '전체'}
          onClick={() => setSelectedBar('전체')}
        >
          전체
        </StyledButton>
        <StyledButton
          selectedBar={selectedBar === '제목'}
          onClick={() => setSelectedBar('제목')}
        >
          제목
        </StyledButton>
        <StyledButton
          selectedBar={selectedBar === '내용'}
          onClick={() => setSelectedBar('내용')}
        >
          내용
        </StyledButton>
        <StyledButton
          selectedBar={selectedBar === '작성자'}
          onClick={() => setSelectedBar('작성자')}
        >
          작성자
        </StyledButton>
      </ButtonWrapper>
      {/* 전체를 눌렀을때 각 네개씩 보이게 한다음에 버튼도 보이게끔 하면 될듯? 그리고 버튼 누르면 컴포넌트로 이동하게? */}
      {selectedBar === '전체' && (
        <>
          <div
            style={{
              margin: '30px 20px 20px 20px',
              fontWeight: 'bold',
              fontSize: '19px',
            }}
          >
            작성자
          </div>
          <SearchWriter items={items.slice(0, 3)} showPagination={false} />
          {showMoreWriter && (
            <ButtonExtra onClick={handleShowMoreWriter}>
              <ButtonExtraStyled>게시글 더보기</ButtonExtraStyled>
            </ButtonExtra>
          )}
          <hr
            style={{
              border: '1px solid #E1E1E1',
              marginTop: '50px',
              marginBottom: '30px',
            }}
          />
          <div
            style={{
              margin: '30px 20px 20px 20px',
              fontWeight: 'bold',
              fontSize: '19px',
            }}
          >
            제목
          </div>
          <MainPopularHorizontal
            data={data.slice(0, 4)}
            showPagination={false}
          />
          {showMoreTitle && (
            <ButtonExtra onClick={handleShowMoreTitle}>
              <ButtonExtraStyled>게시글 더보기</ButtonExtraStyled>
            </ButtonExtra>
          )}
          <hr
            style={{
              border: '1px solid #E1E1E1',
              marginTop: '50px',
              marginBottom: '30px',
            }}
          />
          <div
            style={{
              margin: '30px 20px 20px 20px',
              fontWeight: 'bold',
              fontSize: '19px',
            }}
          >
            내용
          </div>
          <MainPopularHorizontal
            data={data.slice(0, 4)}
            showPagination={false}
          />
          {showMoreContent && (
            <ButtonExtra onClick={handleShowMoreContent}>
              <ButtonExtraStyled>게시글 더보기</ButtonExtraStyled>
            </ButtonExtra>
          )}
        </>
      )}
      {selectedBar === '작성자' && (
        <SearchWriter items={items} showPagination={true} />
      )}
      {selectedBar === '제목' && (
        <MainPopularHorizontal data={data} showPagination={true} />
      )}
      {selectedBar === '내용' && (
        <MainPopularHorizontal data={data} showPagination={true} />
      )}
    </>
  );
}
