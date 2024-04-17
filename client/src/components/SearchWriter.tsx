import { useState } from 'react';
import styled from 'styled-components';
import Pagination from './Pagination';

export interface Info {
  imageUrl?: string;
  title?: string;
  subscribe?: number;
  postNum?: number;
  writer?: string;
  date?: string;
  content?: string;
  writerImgUrl?: string;
  nickname?: string;
  blogintro?: string;
  id: number;
  blogTitle?: string;
  view?: number;
  postId?: number;
}
interface InfoProps {
  items: Info[];
  showPagination: boolean;
  itemsPerPage?: number;
}

const WriterContainer = styled.div`
  display: flex;
  margin: 20px 20px 20px 20px;
  align-items: center;
  /* justify-content: space-around; */
`;
const WriterImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 10px;
  /* text-align: center; */
`;

const PostWrapper = styled.div`
  /* display: flex; */
  flex-direction: column;
  /* text-align: center; */
`;
const PostWriter = styled.div`
  font-size: 18px;
  margin-bottom: 8px;
`;
const PostInfo = styled.div`
  display: flex;
`;
const Subscribe = styled.div`
  font-size: 10px;
`;
const PostNum = styled.div`
  font-size: 10px;
`;
export default function SearchWriter({
  items,
  showPagination,
  itemsPerPage = 3, //나중에 10으로 바꾸면된다
}: InfoProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <>
      {currentItems.map((item, index) => (
        <WriterContainer key={index}>
          <WriterImg src={item.writerImgUrl}></WriterImg>
          <PostWrapper>
            <PostWriter className="PostWriter">{item.writer}</PostWriter>
            <PostInfo>
              <Subscribe>구독자 {item.subscribe} &#183; </Subscribe>
              <PostNum>게시글 {item.postNum}</PostNum>
            </PostInfo>
          </PostWrapper>
        </WriterContainer>
      ))}
      {showPagination && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={items.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </>
  );
}
