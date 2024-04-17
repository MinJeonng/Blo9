import { PostInfoContainer } from '../components/MainPopularStyle';
import { useState } from 'react';
import '../styles/MainPopularHorizontalPost.scss';
import Pagination from './Pagination';
export interface PopularInfo {
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
interface MainPopularInfoProps {
  data: PopularInfo[];
  showPagination: boolean;
  itemsPerPage?: number; //외부에서 설정
}
export default function MainPopularHorizontal({
  data,
  showPagination,
  itemsPerPage = 10,
}: MainPopularInfoProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <>
      {currentItems.map((data, index) => (
        <PostInfoContainer key={index}>
          {/* <div className="contentWrapper"> */}
          <div className="imageWrapper">
            <img src={data.imageUrl} alt={data.title}></img>
          </div>
          <div className="textWrapper">
            <div className="postTitle" style={{ fontWeight: '700' }}>
              {data.title}
            </div>
            <div className="textDetail">
              <div className="postWriter">{data.writer}</div>
              <div className="postDate">{data.date}</div>
            </div>
            <div className="postContent">{data.content}</div>
          </div>
          {/* </div> */}
        </PostInfoContainer>
      ))}
      {showPagination && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={data.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </>
  );
}
