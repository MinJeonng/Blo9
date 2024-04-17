import { useParams } from 'react-router-dom';
import { BlogHeader } from '../components/Headers';
import Content from '../components/Content';
import CommentComponent from '../components/BlogComment';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getColor } from '../components/Functions';
import { BlogObject, ColorObject, PostObject } from '../types';
import Footer from '../components/Footer';

export default function ContentPage() {
  const { id, postId } = useParams<{ id?: string; postId?: string }>();
  const [post, setPost] = useState<PostObject>({
    id: 0,
    postTitle: '',
    content: '',
    hashtag: [],
  });
  const [theme, setTheme] = useState<ColorObject>({
    background: '#333',
    color: '#fff',
  });
  const [blog, setBlog] = useState<BlogObject>({
    id: Number(id),
    blogTitle: 'NOT FOUND',
    nickname: '',
  });

  useEffect(() => {
    const getBlog = async () => {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_HOST}/api/blog/find`,
        params: { memberId: id },
      });
      const { bgColor, fontColor } = res.data.result;
      getColor(setTheme, res.data.result.theme, fontColor, bgColor);
      setBlog(res.data.result);
      const getPost = async () => {
        const res2 = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_HOST}/api/post/find`,
          params: { id: postId },
        });
        if (res2.data.result.blogId === res.data.result.id) {
          setPost(res2.data.result);
        }
      };
      getPost();
    };
    getBlog();
  }, [id, postId]);
  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `블로그`;
  }, []);

  return (
    <div className="wrap">
      <BlogHeader id={Number(id)} />
      {post.id ? (
        <>
          <Content post={post} theme={theme} blog={blog} />
          <CommentComponent theme={theme} />
        </>
      ) : (
        <div className="body">존재하지 않는 포스트입니다.</div>
      )}
      <Footer />
    </div>
  );
}
