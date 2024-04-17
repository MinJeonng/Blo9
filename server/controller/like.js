const { Post, Blog, Like } = require('../models');

// 좋아요 누른 게시글 정보 불러오기
exports.getInfo = async (req, res) => {
  const { postId } = req.query;
  const postInfo = await Post.findOne({ where: { id: postId } });
  const blogInfo = await Blog.findOne({ where: { id: postInfo.blogId } });
  res.json({
    success: true,
    result: {
      memberId: blogInfo.memberId,
      blogId: blogInfo.id,
      nickname: blogInfo.nickname,
      title: postInfo.postTitle,
      content: postInfo.content,
      createdAt: postInfo.createdAt,
    },
    msg: '좋아요 정보 검색 완료',
  });
};

// 회원별 좋아요 리스트 조회
exports.likeList = async (req, res) => {
  const result = await Like.findAll({
    where: { memberId: req.query.memberId },
  });
  res.json({ success: true, result, msg: '좋아요 리스트 조회 완료' });
};

// 좋아요 여부 조회
exports.checkLike = async (req, res) => {
  const { memberId, postId } = req.query;
  const result = await Like.findOne({ where: { memberId, postId } });
  if (result) {
    res.json({ success: true, msg: '좋아요 중' });
  } else {
    res.json({ success: false, msg: '좋아요 안 함' });
  }
};

// 좋아요 리스트 조회
exports.findLike = async (req, res) => {
  const { postId } = req.query;
  const find = await Like.findAll({ where: { postId } });
  const result = {
    count: find.length,
    memberList: find.map(({ memberId }) => {
      return memberId;
    }),
  };
  res.json({ success: true, result, msg: '좋아요 리스트 조회 완료' });
};

// 좋아요 버튼 클릭
exports.clickLike = async (req, res) => {
  const { memberId, postId } = req.body;
  const find = await Like.findOne({ where: { memberId, postId } });
  if (find) {
    const result = await Like.destroy({ where: { memberId, postId } });
    const count = await Like.findAll({ where: { postId } });
    const update = await Post.update(
      { likeCount: count.length },
      { where: { id: postId } }
    );
    res.json({ success: true, msg: '좋아요 삭제 완료' });
  } else {
    const result = await Like.create({ memberId, postId });
    const count = await Like.findAll({ where: { postId } });
    const update = await Post.update(
      { likeCount: count.length },
      { where: { id: postId } }
    );
    res.json({ success: true, msg: '좋아요 추가 완료' });
  }
};
