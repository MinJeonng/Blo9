import styled from 'styled-components';
import ProfileImage from './ProfileImage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getThumbnail, getTimeText, htmlToText } from './Functions';
import { PostInfoObj, PostObject, WriterInfoObj } from '../types';
import { ReactComponent as IcoLike } from '../images/ico-like.svg';
import { ReactComponent as IcoComment } from '../images/ico-comment.svg';
import '../styles/lists.scss';

const ArrBox = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  .title {
    line-height: 50px;
    font-weight: 700;
  }
  .ico-arrR {
    width: 24px;
    height: 50px;
    background: url('/images/ico-arrR.png') no-repeat center/contain;
  }
`;

const WriterContainer = styled.div`
  display: flex;
  padding: 20px 0;
  align-items: center;
  border-bottom: 1px solid #e2e7e2;
  .textBox {
    margin-left: 10px;
  }
  .nickname {
    font-size: 16px;
    margin-bottom: 10px;
  }
  .countBox {
    display: flex;
    .count {
      font-size: 12px;
      color: #777;
    }
  }
`;
const PostContainter = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #e2e7e2;
  .title {
    font-weight: 700;
    margin-bottom: 10px;
  }
  .content {
    color: #777;
    margin-bottom: 14px;
  }
  .writerInfo {
    display: flex;
    align-items: center;
    .writerText {
      margin-left: 10px;
      .nickname {
        margin-bottom: 6px;
      }
      .written {
        font-size: 12px;
        color: #777;
      }
    }
  }
`;
export function ArrList({ children }: { children: string }) {
  return (
    <ArrBox>
      <div className="title">{children}</div>
      <div className="ico-arrR"></div>
    </ArrBox>
  );
}
export function WriterList({ id }: { id: number }) {
  const [info, setInfo] = useState<WriterInfoObj>({
    memberId: 0,
    nickname: '',
    subscribeCount: 0,
    postCount: 0,
    blogInfo: '',
  });
  const getInfo = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/sub/getInfo`,
      params: { blogId: id },
    });
    setInfo(res.data.result);
  };
  useEffect(() => {
    if (id && id !== 0) {
      getInfo();
    }
  }, [id]);
  return (
    <Link to={`/blog/${info.memberId}`}>
      <WriterContainer>
        <ProfileImage id={info.memberId} imgwidth="50px" />
        <div className="textBox">
          <div className="nickname">{info.nickname}</div>
          <div className="countBox">
            <p className="count">구독자 {info.subscribeCount}명 &#183; </p>
            <p className="count">게시글 {info.postCount}개</p>
          </div>
        </div>
      </WriterContainer>
    </Link>
  );
}
export function PostList({ id }: { id: number }) {
  const [info, setInfo] = useState<PostInfoObj>({
    memberId: 0,
    blogId: 0,
    nickname: '',
    title: '',
    content: '',
    createdAt: '',
  });
  const getInfo = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/like/getInfo`,
      params: { postId: id },
    });
    setInfo(res.data.result);
  };
  useEffect(() => {
    if (id && id !== 0) {
      getInfo();
    }
  }, [id]);
  return (
    <Link to={`/blog/${info.blogId}/${id}`}>
      <PostContainter>
        <div className="title">{info.title}</div>
        <div className="content">{htmlToText(info.content)}</div>
        <div className="writerInfo">
          <ProfileImage id={info.memberId} imgwidth="40px" />
          <div className="writerText">
            <p className="nickname">{info.nickname}</p>
            <p className="written">{getTimeText(info.createdAt)}</p>
          </div>
        </div>
      </PostContainter>
    </Link>
  );
}
export function PostLists({
  post,
  vertical,
}: {
  post: PostObject;
  vertical: boolean;
}) {
  const [commentCount, setCommentCount] = useState<number>(0);
  const [memberId, setMemberId] = useState<number>(0);
  const [nickname, setNickname] = useState<string>('');

  const boxStyle = () => {
    if (vertical) {
      return { display: 'flex', marginBottom: '20px' };
    } else {
      return { display: 'block', marginBottom: '20px' };
    }
  };
  const getComment = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/comment/find`,
      params: { postId: post.id },
    });
    setCommentCount(res.data.result.length);
  };
  const getBlog = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/blog/blog`,
      params: { id: post?.blogId },
    });
    setNickname(res.data.result.nickname);
    setMemberId(res.data.result.memberId);
  };
  useEffect(() => {
    if (post.id) {
      getComment();
      getBlog();
    }
  }, [post]);
  return (
    <Link
      to={`/blog/${memberId}/${post.id}`}
      style={boxStyle()}
      className={vertical ? 'postBox vertical' : 'postBox default'}
    >
      <div className="postImg main">
        <img src={getThumbnail(post.content)} alt="Popular Post" />
      </div>
      <div className="postText">
        <div className="blogPostTitle">{post?.postTitle}</div>
        <div className="blogPostContent">{htmlToText(post?.content)}</div>
        <div className="postInfo">
          <div className="postProfile">
            <ProfileImage id={memberId} imgwidth="40px" />
            <div className="profile">
              <p className="nickname">{nickname}</p>
              <div className="Date">
                {post?.createdAt && getTimeText(post?.createdAt || '')}
              </div>
            </div>
          </div>
          <div className="postInfoDetail">
            <div className="blogIcons likeCount">
              <IcoLike className="changeStroke" fill="none" />
              <span>{post.likeCount || '0'}</span>
            </div>
            <div className="blogIcons comment">
              <IcoComment className="changeStroke" />
              <span>{commentCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
