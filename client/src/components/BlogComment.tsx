//나중에 페이지네이션도 추가

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/comment.scss';
import styled from 'styled-components';
import useAuth from '../hooks/useAuth';
import { CommentObj, ThemeStyle } from '../types';
import ProfileImage from './ProfileImage';
import { ReactComponent as IcoArrLeft } from '../images/ico-arr-left.svg';
import { getTimeText } from './Functions';

const BlogComment = styled.div`
  padding: 20px;
  img {
    margin-bottom: 10px;
  }
  @media (min-width: 1160px) {
    width: 1200px;
    padding: 20px;
    margin: 0 auto;
  }
`;

export default function CommentComponent({ theme }: { theme: ThemeStyle }) {
  const { id, postId } = useParams<{ postId: string; id: string }>();
  const [user, setUser] = useAuth();
  const [comment, setComment] = useState<CommentObj[]>();
  const [isSecret, setIsSecret] = useState<number>(0);

  const [showComments, setShowComments] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>('');
  const [newReply, setNewReply] = useState<string>('');
  const [editText, setEditText] = useState<string>('');
  const [replyTo, setReplyTo] = useState<number | null>(null); // 대댓글을 위한 상태
  const [editId, setEditId] = useState<number | null>(null);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const addComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.id) {
      if (window.confirm('로그인 후 댓글을 작성할 수 있습니다.')) {
        document.location.href = '/signup';
        return;
      }
      return;
    }
    if (newComment.trim() !== '') {
      const res = await axios({
        method: 'POST', // 수정: POST 메서드 사용
        url: `${process.env.REACT_APP_HOST}/api/comment/addComment`,
        data: {
          memberId: user.id,
          content: newComment,
          isSecret,
          parentIndex: null,
          postId: Number(postId),
        },
      });
      setNewComment('');
      getComment();
    }
  };

  const addReply = async (parentIndex: number) => {
    if (!user.id) {
      if (window.confirm('로그인 후 댓글을 작성할 수 있습니다.')) {
        document.location.href = '/signup';
        return;
      }
      return;
    }
    if (newReply.trim() !== '') {
      const res = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_HOST}/api/comment/addComment`,
        data: {
          memberId: user.id,
          content: newReply,
          isSecret,
          parentIndex,
          postId: Number(postId),
        },
      });
      setNewReply('');
      setReplyTo(null);
      getComment();
    }
  };

  const renderComments = (parentIndex: number) => {
    return (
      <form>
        <p className="addCommentTitle">답댓글 작성</p>
        <textarea
          className="commentArea"
          style={{ width: '100%', height: '50px', marginTop: '10px' }}
          value={newReply}
          placeholder="답글을 입력하세요."
          onChange={(e) => setNewReply(e.target.value)}
        ></textarea>
        <div className="commentBtns">
          <button
            type="button"
            className="secretBtn"
            style={
              isSecret
                ? theme
                : { color: theme.background, background: theme.color }
            }
            onClick={() => setIsSecret(isSecret === 1 ? 0 : 1)}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/ico-secret.png`}
              alt=""
            />
            <p>{isSecret ? '비밀댓글 해제' : '비밀댓글'}</p>
          </button>
          <button
            type="button"
            className="addComment"
            style={theme}
            onClick={() => addReply(parentIndex)}
          >
            답댓글 추가
          </button>
        </div>
      </form>
    );
  };

  const getComment = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/comment/find`,
      params: { postId },
    });
    setComment(res.data.result);
  };

  const editComment = async (data: CommentObj) => {
    const res = await axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_HOST}/api/comment/edit`,
      data: {
        id: data.id,
        memberId: user.id,
        content: editText,
        isSecret,
        parentIndex: data.parentIndex,
        postId: Number(postId),
      },
    });
    setEditId(null);
    getComment();
  };

  const deleteComment = async (id: number) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) {
      return;
    }
    const res = await axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_HOST}/api/comment/delete`,
      data: { id },
    });
    if (res.data.success) {
      alert('댓글 삭제가 완료되었습니다.');
      getComment();
    }
  };

  useEffect(() => {
    setUser();
    getComment();
  }, []);

  return (
    <BlogComment>
      <div className="commentTop" onClick={toggleComments}>
        <div className="commentCount">{`${
          comment?.length || '0'
        }개의 댓글`}</div>
        <IcoArrLeft
          style={{
            cursor: 'pointer',
            transform: showComments ? 'rotate(90deg)' : 'rotate(-90deg)',
          }}
          onClick={toggleComments}
          className="arrow changeStroke"
        />
      </div>
      {showComments && (
        <div className="commentWrap">
          {comment?.map((val) => {
            if (!val.parentIndex) {
              return (
                <div className="commentBox">
                  <div className="comment" key={val.id}>
                    <div className="commentWriter">
                      <div className="commentInfo">
                        <ProfileImage id={val.memberId} imgwidth="30px" />
                        <div>{val.nickname}</div>
                      </div>
                      {user.id === val.memberId &&
                        (editId === val.id ? (
                          <div className="commentBtns">
                            <button
                              type="button"
                              onClick={() => editComment(val)}
                            >
                              댓글 수정하기
                            </button>
                          </div>
                        ) : (
                          <div className="commentBtns">
                            <button
                              type="button"
                              onClick={() => {
                                setEditText(val.content);
                                setEditId(val.id);
                              }}
                            >
                              수정
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteComment(val.id)}
                            >
                              삭제
                            </button>
                          </div>
                        ))}
                    </div>
                    {val.isSecret &&
                    user.id !== val.memberId &&
                    user.id !== Number(id) ? (
                      <div className="commentContent secret">
                        비밀 댓글입니다.
                      </div>
                    ) : (
                      <div className="commentContent">
                        {editId === val.id ? (
                          <textarea
                            rows={5}
                            style={{
                              width: '100%',
                              border: '1px solid #e2e7e2',
                            }}
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                          ></textarea>
                        ) : (
                          val.content
                        )}
                      </div>
                    )}
                    {editId === val.id || (
                      <div className="commentBottom">
                        <div className="commentTime">
                          {getTimeText(val.createdAt || '')}
                        </div>

                        {(val.isSecret &&
                          user.id !== val.memberId &&
                          user.id !== Number(id)) || (
                          <button
                            className="replyBtn"
                            onClick={() => setReplyTo(val.id)}
                            style={{ color: '#777' }}
                          >
                            답댓글 달기
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  {replyTo === val.id && renderComments(val.id)}
                  {comment?.map((data) => {
                    if (val.id === data.parentIndex) {
                      return (
                        <div className="comment replyComment" key={data.id}>
                          <div className="commentWriter">
                            <div className="commentInfo">
                              <ProfileImage
                                id={data.memberId}
                                imgwidth="30px"
                              />
                              <div>{data.nickname}</div>
                            </div>
                            {user.id === data.memberId &&
                              (editId === data.id ? (
                                <div className="commentBtns">
                                  <button
                                    type="button"
                                    onClick={() => editComment(data)}
                                  >
                                    댓글 수정하기
                                  </button>
                                </div>
                              ) : (
                                <div className="commentBtns">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditText(data.content);
                                      setEditId(data.id);
                                    }}
                                  >
                                    수정
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => deleteComment(data.id)}
                                  >
                                    삭제
                                  </button>
                                </div>
                              ))}
                          </div>
                          {data.isSecret &&
                          user.id !== data.memberId &&
                          user.id !== Number(id) ? (
                            <div className="commentContent secret">
                              비밀 댓글입니다.
                            </div>
                          ) : (
                            <div className="commentContent">
                              {editId === data.id ? (
                                <textarea
                                  rows={5}
                                  style={{
                                    width: '100%',
                                    border: '1px solid #e2e7e2',
                                  }}
                                  value={editText}
                                  onChange={(e) => setEditText(e.target.value)}
                                ></textarea>
                              ) : (
                                data.content
                              )}
                            </div>
                          )}
                          {editId === data.id || (
                            <div className="commentBottom">
                              <div className="commentTime">
                                {getTimeText(data.createdAt || '')}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    }
                  })}
                </div>
              );
            }
          })}
        </div>
      )}
      <form style={{ margin: 0 }}>
        <p className="addCommentTitle">댓글 작성</p>
        {/* {replyTo && <p>대댓글 작성 중...</p>} */}
        <textarea
          className="commentArea"
          value={newComment}
          placeholder="블로그가 훈훈해지는 댓글 부탁드립니다."
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <div className="commentBtns">
          <button
            type="button"
            className="secretBtn"
            style={
              isSecret
                ? theme
                : { color: theme.background, background: theme.color }
            }
            onClick={() => setIsSecret(isSecret === 1 ? 0 : 1)}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/ico-secret.png`}
              alt=""
            />
            <p>{isSecret ? '비밀댓글 해제' : '비밀댓글'}</p>
          </button>
          <button
            type="button"
            className="addComment"
            style={theme}
            onClick={addComment}
          >
            댓글 추가
          </button>
        </div>
      </form>
    </BlogComment>
  );
}
