const { Member } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { where } = require('sequelize');

// 회원가입
exports.signup = async (req, res) => {
  const { username, birth, email, pw } = req.body;
  const find = await Member.findOne({ where: { email } });
  if (find) {
    res.json({ success: false, msg: '아이디 중복' });
  } else {
    const password = await bcrypt.hash(pw, 11);
    const result = await Member.create({ username, birth, email, password });
    res.json({ success: true, msg: '회원가입 완료' });
  }
};

// 로그인
exports.login = async (req, res) => {
  const { email, pw, maintain } = req.query;
  const result = await Member.findOne({ where: { email } });
  if (result) {
    const success = await bcrypt.compare(pw, result.password);
    if (success) {
      if (maintain) {
        const token = jwt.sign({ id: result.id }, process.env.SECRET, {
          expiresIn: '30d',
        });
        res.json({ success, msg: '로그인 완료', result, token });
      } else {
        const token = jwt.sign({ id: result.id }, process.env.SECRET, {
          expiresIn: '1h',
        });
        res.json({ success, msg: '로그인 완료', result, token });
      }
    } else {
      res.json({ success, msg: '비밀번호 오류' });
    }
  } else {
    res.json({ success: false, msg: '이메일 오류' });
  }
};

// 회원 인증
exports.find = async (req, res) => {
  const { id } = req.user;
  const result = await Member.findOne({ where: { id } });
  res.json({ success: true, result });
};

// id로 회원 검색하기
exports.searchId = async (req, res) => {
  const { id } = req.query;
  const result = await Member.findOne({ where: { id } });
  res.json({ success: true, result });
};

// 회원 정보 수정
exports.update = async (req, res) => {
  if (req.body.pw) {
    const { id, nowPw, pw, email } = req.body;
    const find = await Member.findOne({ where: { id } });
    const success = await bcrypt.compare(nowPw, find.password);
    if (success) {
      const password = await bcrypt.hash(pw, 11);
      const result = await Member.update(
        { password, email },
        { where: { id } }
      );
      res.json({ success, msg: '회원정보 수정 완료' });
    } else {
      res.json({ success, msg: '비밀번호 오류' });
    }
  } else {
    const { email, id } = req.body;
    const result = Member.update({ email: email }, { where: { id } });
    res.json({ success: true, msg: '회원정보 수정 완료' });
  }
};

// 회원 정보 삭제
exports.destroy = async (req, res) => {
  const result = await Member.destroys({ where: { id: req.body.id } });
  res.json({ success: true, msg: '회원 탈퇴 완료' });
};
