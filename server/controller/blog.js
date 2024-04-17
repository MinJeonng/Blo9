const { Blog, Category, Subscribe } = require('../models');
const { where } = require('sequelize');

// id로 블로그 조회
exports.blog = async (req, res) => {
  const { id } = req.query;
  const result = await Blog.findOne({ where: { id } });
  if (result) {
    res.json({ success: true, msg: '블로그 조회 완료', result });
  } else {
    res.json({ success: false, msg: '블로그 없음' });
  }
};

// member id로 블로그 조회
exports.find = async (req, res) => {
  const { memberId } = req.query;
  const result = await Blog.findOne({ where: { memberId } });
  if (result) {
    res.json({ success: true, msg: '블로그 조회 완료', result });
  } else {
    res.json({ success: false, msg: '블로그 없음' });
  }
};

// 블로그 정보 수정
exports.update = async (req, res) => {
  const {
    memberId,
    nickname,
    blogTitle,
    theme,
    blogInfo,
    bgColor,
    fontColor,
    writerImg,
  } = req.body;
  const find = await Blog.findOne({ where: { memberId } });
  if (find) {
    const result = await Blog.update(
      { nickname, blogTitle, theme, blogInfo, bgColor, fontColor, writerImg },
      { where: { memberId } }
    );
  } else {
    const result = await Blog.create({
      memberId,
      nickname,
      blogTitle,
      theme,
      blogInfo,
      bgColor,
      fontColor,
      writerImg,
    });
  }
  res.json({ success: true, msg: '블로그 수정 완료' });
};

// 회원별 구독 리스트 조회
exports.subList = async (req, res) => {
  const result = await Subscribe.findAll({
    where: { memberId: req.query.memberId },
  });
  res.json({ success: true, result, msg: '구독 리스트 조회 완료' });
};

// 구독 확인
exports.checkSub = async (req, res) => {
  const { memberId, blogId } = req.query;
  const result = await Subscribe.findOne({ where: { memberId, blogId } });
  if (result) {
    res.json({ success: true, msg: '구독 중' });
  } else {
    res.json({ success: false, msg: '구독 안 함' });
  }
};

// 구독자 리스트 조회
exports.findSub = async (req, res) => {
  const { blogId } = req.query;
  const find = await Subscribe.findAll({ where: { blogId } });
  const result = {
    count: find.length,
    memberList: find.map(({ memberId }) => {
      return memberId;
    }),
  };
  res.json({ success: true, result, msg: '구독자 리스트 조회 완료' });
};

// 구독하기 버튼 클릭
exports.clickSub = async (req, res) => {
  const { memberId, blogId } = req.body;
  const find = await Subscribe.findOne({ where: { memberId, blogId } });
  if (find) {
    const result = await Subscribe.destroy({ where: { memberId, blogId } });
    const count = await Subscribe.findAll({ where: { blogId } });
    const update = await Blog.update(
      { subscribeCount: count.length },
      { where: { id: blogId } }
    );
    res.json({ success: true, msg: '구독 삭제 완료' });
  } else {
    const result = await Subscribe.create({ memberId, blogId });
    const count = await Subscribe.findAll({ where: { blogId } });
    const update = await Blog.update(
      { subscribeCount: count.length },
      { where: { id: blogId } }
    );
    res.json({ success: true, msg: '구독 추가 완료' });
  }
};

// 카테고리 하나 조회
exports.findCategory = async (req, res) => {
  const result = await Category.findOne({ where: { id: req.query.id } });
  res.json({ success: true, result, msg: '카테고리 조회 완료' });
};

// 카테고리 리스트 조회
exports.getCategory = async (req, res) => {
  const { memberId } = req.query;
  const find = await Blog.findOne({ where: { memberId } });
  if (find) {
    const result = await Category.findAll({ where: { blogId: find.id } });
    res.json({ success: true, result, msg: '블로그 조회 완료' });
  } else {
    res.json({ success: false, msg: '블로그 없음' });
  }
};

// 카테고리 추가
exports.newCategory = async (req, res) => {
  const { categoryName, group, memberId } = req.body;
  const find = await Blog.findOne({ where: { memberId } });
  const { id } = find;
  const result = await Category.create({ categoryName, group, blogId: id });
  res.json({ success: true, msg: '카테고리 추가 완료' });
};

// 카테고리 수정
exports.updateCategory = async (req, res) => {
  const { categoryName, group, id } = req.body;
  const result = await Category.update(
    { categoryName, group },
    { where: { id } }
  );
  res.json({ success: true, msg: '카테고리 수정 완료' });
};

// 카테고리 삭제
exports.delCategory = async (req, res) => {
  const result = await Category.destroy({ where: { id: req.body.id } });
  res.json({ success: true, msg: '카테고리 삭제 완료' });
};
