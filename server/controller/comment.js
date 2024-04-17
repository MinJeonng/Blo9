const { where } = require('sequelize');
const { Comment, Member, Blog } = require('../models');

// 새 댓글 추가 시 유효성 검사 추가 예시
exports.addComment = async (req, res) => {
  try {
    const { memberId, content, isSecret, parentIndex, postId } = req.body;

    // 유효성 검사 예시
    // if (!author || !content || typeof isSecret !== 'boolean' || !postId) {
    //   return res.status(400).json({ message: '잘못된 요청입니다.' });
    // }

    const newComment = await Comment.create({
      memberId,
      content,
      isSecret,
      parentIndex,
      postId,
    });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// 댓글 조회
exports.find = async (req, res) => {
  const { postId } = req.query;
  const comment = await Comment.findAll({ where: { postId } });
  let result = [];
  for (let i = 0; i < comment.length; i++) {
    const { memberId, content, isSecret, parentIndex, createdAt, id } =
      comment[i];
    const searchBlog = await Blog.findOne({ where: { memberId } });
    if (searchBlog) {
      result.push({
        id,
        memberId,
        content,
        isSecret,
        parentIndex,
        createdAt,
        nickname: searchBlog.nickname,
      });
    } else {
      const searchMember = await Member.findOne({ where: { id: memberId } });
      result.push({
        id,
        memberId,
        content,
        isSecret,
        parentIndex,
        createdAt,
        nickname: searchMember.username,
      });
    }
  }
  res.json({ success: true, result, msg: '댓글 조회 완료' });
};

// 댓글 수정
exports.editComment = async (req, res) => {
  const { id, memberId, content, isSecret, parentIndex, postId } = req.body;
  const result = await Comment.update(
    { memberId, content, isSecret, parentIndex, postId },
    { where: { id } }
  );
  if (result) {
    res.json({ success: true, msg: '댓글 수정 완료' });
  }
};

// 댓글 삭제
exports.deleteComment = async (req, res) => {
  const result = await Comment.destroy({ where: { id: req.body.id } });
  if (result) {
    res.json({ success: true, msg: '댓글 삭제 완료' });
  }
};
