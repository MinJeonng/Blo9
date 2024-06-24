import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { BlogObject, CategoryObj, PostObject } from '../types';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import { ErrorMsgGrey, ErrorMsgRed } from './ErrorMsg';
import { ToggleBtn } from './Btns';
import { ArrList } from './Lists';
import { storage } from '../config/Firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import ProfileImage from './ProfileImage';
import Pagination from './Pagination';
import { getTimeText } from './Functions';
const TableStyle = styled.table`
  width: 100%;
  margin: 10px 0 30px;
`;
const ThStyle = styled.th`
  width: 33.3%;
  line-height: 50px;
  background: #f5f7f9;
  color: #333;
  border-right: 1px solid #e3e5e7;
`;
const TdStyle = styled.td`
  width: 33.3%;
  line-height: 50px;
  text-align: center;
  border-right: 1px solid #ececec;
  border-bottom: 1px solid #ececec;
`;
const CheckBox = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  .flexBox {
    display: flex;
    align-items: flex-start;
    label {
      margin-left: 10px;
      span {
        font-size: 12px;
        color: #777;
      }
    }
  }
  .add {
    width: 100%;
    input {
      line-height: 30px;
      background-color: #f5f7fa;
      padding: 0 15px;
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 10px;
    }
    select {
      width: 100%;
      padding: 8px 10px;
    }
  }
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  .btn {
    line-height: 30px;
    padding: 0 10px;
    margin-left: 10px;
    border-radius: 4px;
    word-break: keep-all;
    &.active {
      border: 1px solid #fbc02d;
      color: #fbc02d;
    }
    &.disabled {
      background: #f5f7fa;
      color: #abbed1;
    }
  }
`;
const BoxStyle = styled.div`
  width: 100%;
  border: none;
  border-radius: 6px;
  background-color: #f6f7f9;
  box-sizing: border-box;
  padding: 10px;
  color: #89939e;
  font-size: 14px;
  margin-bottom: 20px;
  input {
    width: 100%;
    line-height: 2;
    margin-top: 6px;
  }
  label {
    display: block;
  }
  textarea {
    width: 100%;
    margin-top: 6px;
    line-height: 1.5;
    background: transparent;
    border: none;
  }
`;

export const EditBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  .btn {
    display: block;
    padding: 0 40px;
    line-height: 50px;
    box-sizing: border-box;
    border-radius: 50px;
    &.btnCancle {
      border: 1px solid #fbc02d;
      margin-right: 10px;
    }
    &.btnEdit {
      background: #fbc02d;
      color: #fff;
    }
  }
`;
const TextBtn = styled.button`
  display: block;
  margin: 0 auto;
  color: #fbc02d;
  font-weight: 700;
  line-height: 50px;
`;
const BlogBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .profileImg {
    width: 60px;
    height: 60px;
    background: #ddd;
    border-radius: 50%;
  }
  .editImg {
    padding: 0 15px;
    line-height: 30px;
    color: #fbc02d;
    border: 1px solid #fbc02d;
    height: fit-content;
    border-radius: 30px;
    margin-left: 15px;
  }
`;
const ThemeBox = styled.div<{ bgcolor?: string; txtcolor?: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  .text {
    display: flex;
    line-height: 20px;
    width: 75%;
    .colorIcon {
      width: 20px;
      height: 20px;
      background: ${(props) => props.bgcolor || '#fff'};
      border: 2px solid ${(props) => props.txtcolor || '#333'};
      box-sizing: border-box;
      border-radius: 50%;
    }
    .colorName {
      margin: 0 0 0 10px;
      &.custom {
        width: 85%;
        .customInput {
          margin-top: 10px;
          width: 100%;
          border: 1px solid #eee;
          border-radius: 6px;
          position: relative;
          label {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 10px;
          }
          input {
            display: block;
            width: 100%;
            line-height: 30px;
            text-align: right;
            padding: 0 10px 0 60px;
            box-sizing: border-box;
          }
        }
      }
    }
  }
  .btn {
    border: 2px solid #d9dbdf;
    padding: 0;
    border-radius: 50px;
    display: flex;
    .btnText {
      display: inline-block;
      width: 20px;
      line-height: 20px;
      background: #7e7f81;
      color: #7e7f81;
      border-radius: 50%;
      margin: 2px;
      font-size: 10px;
      &.off {
        background: transparent;
        margin-left: 5px;
        text-align: center;
        text-indent: -8px;
      }
      &.on {
        color: transparent;
        text-indent: 6px;
      }
    }
    &.active {
      .on {
        color: #7e7f81;
        background: transparent;
      }
      .off {
        color: transparent;
        background: ${(props) => props.txtcolor || '#333'};
      }
    }
  }
`;
const RectBtn = styled.button`
  display: block;
  margin: 0 auto;
  color: #fff;
  background: #fbc02d;
  line-height: 30px;
  padding: 0 20px;
  border-radius: 6px;
  margin-top: 20px;
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
  color: ${(props) => (props.selectedBar ? '#333333' : '#7E7F81')};
  margin-bottom: 5px;
`;
const SetBar = styled.div`
  display: flex;
  position: absolute;
  top: 100px;
  right: 0;
  flex-direction: column;
  align-items: flex-start;
  width: 300px;
`;

export function SetMenu() {
  return (
    <>
      <Link to="/setting/post">
        <ArrList>글 관리</ArrList>
      </Link>
      <Link to="/setting/category">
        <ArrList>카테고리 관리</ArrList>
      </Link>
      <Link to="/setting/info">
        <ArrList>개인정보 수정</ArrList>
      </Link>
      <Link to="/setting/blog">
        <ArrList>블로그 편집</ArrList>
      </Link>
    </>
  );
}
export function PcSetMenu() {
  const [selectedBar, setSelectedBar] = useState('홈');
  return (
    <>
      <SetBar>
        <span style={{ fontWeight: '700', marginBottom: '20px' }}>설정</span>
        <StyledButton
          selectedBar={selectedBar === '홈'}
          onClick={() => setSelectedBar('홈')}
        >
          <Link to="/setting">홈</Link>
        </StyledButton>
        <StyledButton
          selectedBar={selectedBar === '글 관리'}
          onClick={() => setSelectedBar('글 관리')}
        >
          <Link to="/setting/post">글 관리</Link>
        </StyledButton>
        <StyledButton
          selectedBar={selectedBar === '카테고리 관리'}
          onClick={() => setSelectedBar('카테고리 관리')}
        >
          <Link to="/setting/category">카테고리 관리</Link>
        </StyledButton>
        <StyledButton
          selectedBar={selectedBar === '개인 정보 수정'}
          onClick={() => setSelectedBar('개인 정보 수정')}
        >
          <Link to="/setting/info">개인 정보 수정</Link>
        </StyledButton>
        <StyledButton
          selectedBar={selectedBar === '블로그 편집'}
          onClick={() => setSelectedBar('블로그 편집')}
        >
          <Link to="/setting/blog">블로그 편집</Link>
        </StyledButton>
      </SetBar>
    </>
  );
}

export function SetHome() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1160);
  const [user, setUser] = useAuth();
  const [blog, setBlog] = useState<BlogObject>();
  useEffect(() => {
    const getBlog = async () => {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_HOST}/api/blog/find`,
        params: { memberId: user.id },
      });
      setBlog(res.data.result);
    };
    if (user.id) {
      getBlog();
    }
  }, [user]);

  useEffect(() => {
    function handleResize() {
      setIsLargeScreen(window.innerWidth > 1160);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setUser();
    }
  }, []);
  return (
    <>
      <TableStyle className="settingTable">
        <thead>
          <tr>
            <ThStyle>분류</ThStyle>
            <ThStyle style={{ border: 'none' }}>누적</ThStyle>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TdStyle>조회수</TdStyle>
            <TdStyle style={{ borderRight: 'none' }}>
              {blog?.view || '0'}회
            </TdStyle>
          </tr>
          <tr>
            <TdStyle>구독자 수</TdStyle>
            <TdStyle style={{ borderRight: 'none' }}>
              {blog?.subscribeCount || '0'}명
            </TdStyle>
          </tr>
        </tbody>
      </TableStyle>
      {!isLargeScreen && <SetMenu />}
    </>
  );
}

export function SetPost() {
  const navigate = useNavigate();
  const [user, setUser] = useAuth();
  const [postList, setPostList] = useState<PostObject[]>();
  const [category, setCategory] = useState<CategoryObj[]>();
  const getPost = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/post/category`,
      params: { id: user.id },
    });
    setPostList(res.data.result);
  };

  const getCategory = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/blog/getCategory`,
      params: { memberId: user.id },
    });
    setCategory(res.data.result);
  };
  const editFunc = (id: number) => {
    localStorage.setItem('postId', `${id}`);
    navigate('/post/write');
  };
  const deleteFunc = async (id: number) => {
    if (!window.confirm('게시글을 삭제하시겠습니까?')) {
      return;
    }
    const res = await axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_HOST}/api/post/delete`,
      data: { id },
    });
    if (res.data.success) {
      alert('게시글 삭제가 완료되었습니다.');
      getPost();
    }
  };
  useEffect(() => {
    if (user.id) {
      getPost();
      getCategory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setUser();
    } else {
      alert('로그인 후 이용 가능합니다.');
      document.location.href = '/signup';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {postList?.map((data) => (
        <CheckBox key={data.id}>
          <div className="flexBox" style={{ marginBottom: '10px' }}>
            <input type="checkbox" id="check1" />
            <label htmlFor="check01">
              {data.postTitle}
              <br />
              <span>
                {data.categoryId
                  ? category?.map((val) => {
                      if (val.id === data.categoryId) {
                        return val.categoryName;
                      }
                      return;
                    })
                  : '카테고리 없음'}{' '}
                &#183; {getTimeText(data.createdAt || '')}
              </span>
            </label>
          </div>
          <BtnBox>
            <div className="btn active" onClick={() => editFunc(data.id)}>
              수정
            </div>
            <div className="btn disabled" onClick={() => deleteFunc(data.id)}>
              삭제
            </div>
          </BtnBox>
        </CheckBox>
      ))}

      <RectBtn onClick={() => navigate('/post/write')}>글쓰기</RectBtn>
    </>
  );
}
export function SetCategory({ itemsPerPage = 3 }) {
  const [user, setUser] = useAuth();
  const [list, setList] = useState<CategoryObj[]>([]);
  const [isBlogExist, setIsbBlogExist] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>('');
  const [newGroup, setNewGroup] = useState<string>('일상');
  const [create, setCreate] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const categoryStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  const unchangeCate = (id: number, name: string, group: string) => (
    <CheckBox key={id} style={categoryStyle}>
      <div className="flexBox" style={{ alignItems: 'center' }}>
        <input type="checkbox" id="check1" />
        <label htmlFor="check01">
          {name}
          <span> {group}</span>
        </label>
      </div>
      <BtnBox>
        <div
          className="btn active"
          onClick={() => {
            setEditId(id);
            setCreate(false);
            setNewName(name);
            setNewGroup(group);
          }}
        >
          수정
        </div>
        <div className="btn disabled" onClick={() => deleteFunc(id)}>
          삭제
        </div>
      </BtnBox>
    </CheckBox>
  );
  const changeCate = (id: number) => (
    <CheckBox style={categoryStyle}>
      <div className="add">
        <input
          type="text"
          placeholder="카테고리명"
          onChange={(e) => setNewName(e.target.value)}
          value={newName}
        />
        <select onChange={(e) => setNewGroup(e.target.value)} value={newGroup}>
          <option value="일상">일상</option>
          <option value="스포츠">스포츠</option>
          <option value="IT&#183;과학">IT&#183;과학</option>
          <option value="시사&#183;경제">시사&#183;경제</option>
          <option value="글로벌">글로벌</option>
        </select>
      </div>
      <BtnBox>
        <div className="btn active" onClick={() => editFunc(id)}>
          저장
        </div>
        <div className="btn disabled" onClick={() => deleteFunc(id)}>
          삭제
        </div>
      </BtnBox>
    </CheckBox>
  );
  const newCate = () => (
    <CheckBox style={categoryStyle}>
      <div className="add">
        <input
          type="text"
          placeholder="카테고리명"
          onChange={(e) => setNewName(e.target.value)}
        />
        <select onChange={(e) => setNewGroup(e.target.value)}>
          <option value="일상">일상</option>
          <option value="스포츠">스포츠</option>
          <option value="IT&#183;과학">IT&#183;과학</option>
          <option value="시사&#183;경제">시사&#183;경제</option>
          <option value="글로벌">글로벌</option>
        </select>
      </div>
      <BtnBox>
        <div className="btn active" onClick={addFunc}>
          등록
        </div>
        <div className="btn disabled" onClick={() => setCreate(false)}>
          삭제
        </div>
      </BtnBox>
    </CheckBox>
  );
  const getList = async () => {
    if (user.id) {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_HOST}/api/blog/getCategory`,
        params: { memberId: user.id },
      });
      setIsbBlogExist(res.data.success);
      if (res.data.result) {
        setList(res.data.result);
      }
    }
  };
  const addFunc = async () => {
    const data = {
      group: newGroup,
      categoryName: newName,
      memberId: user.id,
    };
    const res = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_HOST}/api/blog/newCategory`,
      data,
    });
    getList();
    setCreate(false);
  };
  const editFunc = async (id: number) => {
    const res = await axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_HOST}/api/blog/updateCategory`,
      data: {
        group: newGroup,
        categoryName: newName,
        id,
      },
    });
    document.location.reload();
  };
  const deleteFunc = async (id: number) => {
    if (!window.confirm('삭제하시겠습니까?')) {
      return;
    }
    const res = await axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_HOST}/api/blog/delCategory`,
      data: { id },
    });
    alert(res.data.msg);
    getList();
  };
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setUser();
    } else {
      alert('로그인 후 이용 가능합니다.');
      document.location.href = '/signup';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <>
      {isBlogExist || (
        <Link to="/setting/blog">
          블로그가 없습니다.{' '}
          <span style={{ textDecoration: 'underline' }}> 블로그 생성하기</span>
        </Link>
      )}
      {isBlogExist && list.length === 0 && <p>카테고리를 생성해주세요!</p>}
      {isBlogExist &&
        // list.map (1)
        currentItems.map(({ id, categoryName, group }) => {
          if (editId === id) {
            return changeCate(id);
          } else {
            return unchangeCate(id, categoryName, group);
          }
        })}
      {create && newCate()}
      {isBlogExist && !create && (
        <RectBtn
          onClick={() => {
            setEditId(0);
            setCreate(true);
            setNewName('');
          }}
        >
          카테고리 추가
        </RectBtn>
      )}
      {list.length >= 1 && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={list.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </>
  );
}

export function SetInfo() {
  const navigate = useNavigate();
  const [user, setUser] = useAuth();
  const [email, setEmail] = useState<string>('');
  const [nowPw, setNowPw] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [confirmPw, setConfirmPw] = useState<string>('');
  const nowPwRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const editFunc = async () => {
    let data;
    if (confirmPw !== pw) {
      alert('비밀번호가 일치하지 않습니다.');
      pwRef.current?.focus();
      return;
    }
    if (nowPw) {
      data = {
        id: user.id,
        email,
        nowPw,
        pw,
      };
    } else {
      data = { id: user.id, email };
    }
    const res = await axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_HOST}/api/member/update`,
      data,
    });
    if (res.data.success) {
      alert('개인 정보 수정이 완료되었습니다.');
      document.location.reload();
    } else {
      alert('현재 비밀번호가 일치하지 않습니다.');
      nowPwRef.current?.focus();
    }
  };
  const deleteFunc = async () => {
    // confirm('pw');
    if (!window.confirm('탈퇴하시겠습니까?')) {
      return;
    }
    const res = await axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_HOST}/api/member/destroy`,
      data: { id: user.id },
    });
    if (res.data.success) {
      alert('회원 탈퇴가 완료되었습니다.');
      document.location.href = '/';
    }
  };
  useEffect(() => {
    setUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setEmail(user.email);
  }, [user]);
  return (
    <>
      <div
        className="disabledInfo"
        style={{ borderBottom: '1px solid #eee', margin: '0 0 20px' }}
      >
        <BoxStyle>
          <label>이름</label>
          <input type="text" value={user.username || ''} readOnly />
        </BoxStyle>
        <BoxStyle>
          <label>생년월일</label>
          <input type="text" value={user.birth || ''} readOnly />
        </BoxStyle>
      </div>
      <div className="activeInfo">
        <BoxStyle>
          <label>이메일</label>
          <input
            type="email"
            value={email || user.email || ''}
            onChange={(e) => setEmail(e.target.value)}
          />
        </BoxStyle>
        <ErrorMsgGrey>
          * 비밀번호 변경 시에만 아래의 정보를 입력해주세요.
        </ErrorMsgGrey>
        <BoxStyle>
          <label>현재 비밀번호</label>
          <input
            type="password"
            onChange={(e) => setNowPw(e.target.value)}
            ref={nowPwRef}
          />
        </BoxStyle>
        <BoxStyle>
          <label>변경 비밀번호</label>
          <input
            type="password"
            onChange={(e) => setPw(e.target.value)}
            ref={pwRef}
          />
        </BoxStyle>
        <BoxStyle>
          <label>비밀번호 확인</label>
          <input
            type="password"
            onChange={(e) => setConfirmPw(e.target.value)}
          />
        </BoxStyle>
        {confirmPw === pw || (
          <ErrorMsgRed>* 비밀번호가 일치하지 않습니다.</ErrorMsgRed>
        )}
      </div>
      <EditBox>
        <button className="btn btnCancle" onClick={() => navigate('/setting')}>
          취소
        </button>
        <button className="btn btnEdit" onClick={editFunc}>
          수정
        </button>
      </EditBox>
      <TextBtn onClick={deleteFunc}>회원탈퇴</TextBtn>
    </>
  );
}
export function SetBlog() {
  const navigate = useNavigate();
  const [user, setUser] = useAuth();
  const [nickname, setNickname] = useState<string>('');
  const [blogTitle, setBlogTitle] = useState<string>('');
  const [blogInfo, setBlogInfo] = useState<string>('');
  const [theme, setTheme] = useState<number>(1);
  const [customBg, setCustomBg] = useState<string>('');
  const [customText, setCustomText] = useState<string>('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const setInfo = async () => {
    if (user.id) {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_HOST}/api/blog/find`,
        params: { memberId: user.id },
      });
      if (res.data.result) {
        setNickname(res.data.result.nickname);
        setBlogTitle(res.data.result.blogTitle);
        setBlogInfo(res.data.result.blogInfo || '');
        setTheme(res.data.result.theme);
        setCustomBg(res.data.result.bgColor || '#fff');
        setCustomText(res.data.result.fontColor || '#333');
      }
    }
  };
  const editFunc = async () => {
    if (!nickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }
    if (!blogTitle.trim()) {
      alert('블로그 제목을 입력해주세요.');
      return;
    }
    let imageUrl = uploadedImageUrl; // 기존 업로드된 이미지 URL 사용
    if (selectedFile && !uploadedImageUrl) {
      const uploadUrl = await uploadImage(selectedFile);
      if (uploadUrl) {
        imageUrl = uploadUrl;
        setUploadedImageUrl(uploadUrl);
        // setPreviewImageUrl(null); // 업로드 후 미리보기 URL 초기화
      }
    }
    const res = await axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_HOST}/api/blog/update`,
      data: {
        memberId: user.id,
        nickname,
        blogTitle,
        blogInfo,
        theme,
        bgColor: customBg,
        fontColor: customText,
        writerImg: imageUrl,
      },
    });
    if (res.data.success) {
      alert('블로그 수정이 완료되었습니다.');
      setInfo();
      window.scrollTo(0, 0);
    }
  };

  // uploadImage 함수 수정
  const uploadImage = async (file: File): Promise<string | undefined> => {
    if (!file) return;
    const fileId = user.id; // 파일명을 사용자 ID로 설정
    const imageRef = ref(storage, `profileImages/${fileId}`); // 스토리지 내의 저장 경로를 지정
    await uploadBytes(imageRef, file); // 파일을 업로드
    const url = await getDownloadURL(imageRef); // 업로드된 파일의 URL 가져옴
    return url; // URL을 반환
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;
    setSelectedFile(file); // 선택된 파일을 상태에 저장

    // 미리보기 URL 생성 및 저장
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInputClick = () => {
    fileInputRef.current?.click();
  };
  const handleDefaultImageClick = () => {
    setPreviewImageUrl(null);
  };

  useEffect(() => {
    setUser();
    setInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <BlogBox>
        <ProfileImage
          id={user.id || 0}
          profileimg={previewImageUrl}
          setPreview={setPreviewImageUrl}
          imgwidth={'80px'}
        />
        <input
          type="file"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
          ref={fileInputRef}
        />
        <button className="editImg" onClick={triggerFileInputClick}>
          프로필 사진 변경
        </button>

        <button className="editImg" onClick={handleDefaultImageClick}>
          기본이미지
        </button>
      </BlogBox>
      <BoxStyle>
        <label>닉네임 *</label>
        <input
          type="text"
          placeholder="닉네임을 입력해주세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </BoxStyle>
      <BoxStyle>
        <label>블로그 제목 *</label>
        <input
          type="text"
          placeholder="블로그 제목을 입력해주세요"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
        />
      </BoxStyle>
      <BoxStyle>
        <label>소개</label>
        <textarea
          rows={3}
          placeholder="블로그 소개 문구를 입력해주세요"
          value={blogInfo}
          onChange={(e) => setBlogInfo(e.target.value)}
        ></textarea>
      </BoxStyle>
      <h3>블로그 색상 변경</h3>
      <ThemeBox bgcolor="#f6f7f9" txtcolor="#333">
        <div className="text">
          <p className="colorIcon"></p>
          <p className="colorName">색상 1</p>
        </div>
        <div className="toggle" onClick={() => setTheme(1)}>
          <ToggleBtn active={theme === 1} btncolor="#333" />
        </div>
      </ThemeBox>
      <ThemeBox bgcolor="#f6f7f9" txtcolor="#fbc02d">
        <div className="text">
          <p className="colorIcon"></p>
          <p className="colorName">색상 2</p>
        </div>
        <div className="toggle" onClick={() => setTheme(2)}>
          <ToggleBtn active={theme === 2} btncolor="#fbc02d" />
        </div>
      </ThemeBox>
      <ThemeBox bgcolor="#f6f7f9" txtcolor="#11804b">
        <div className="text">
          <p className="colorIcon"></p>
          <p className="colorName">색상 3</p>
        </div>
        <div className="toggle" onClick={() => setTheme(3)}>
          <ToggleBtn active={theme === 3} btncolor="#11804b" />
        </div>
      </ThemeBox>
      <ThemeBox bgcolor="#f2f1ff" txtcolor="#352e91">
        <div className="text">
          <p className="colorIcon"></p>
          <p className="colorName">색상 4</p>
        </div>
        <div className="toggle" onClick={() => setTheme(4)}>
          <ToggleBtn active={theme === 4} btncolor="#352e91" />
        </div>
      </ThemeBox>
      <ThemeBox bgcolor={customBg} txtcolor={customText}>
        <div className="text">
          <p className="colorIcon"></p>
          <div className="colorName custom">
            <p>색상 커스텀</p>
            <ErrorMsgGrey>* 색상은 #~~의 형태로 입력해주세요.</ErrorMsgGrey>
            <div className="customInput">
              <label>배경색</label>
              <input
                type="text"
                className="bgColor"
                placeholder="#ffffff"
                value={customBg}
                onChange={(e) => setCustomBg(e.target.value)}
              />
            </div>
            <div className="customInput">
              <label>글자색</label>
              <input
                type="text"
                className="textColor"
                placeholder="#333333"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="toggle" onClick={() => setTheme(5)}>
          <ToggleBtn active={theme === 5} btncolor={customText} />
        </div>
      </ThemeBox>
      <EditBox>
        <button className="btn btnCancle" onClick={() => navigate('/setting')}>
          취소
        </button>
        <button className="btn btnEdit" onClick={editFunc}>
          수정
        </button>
      </EditBox>
    </>
  );
}
