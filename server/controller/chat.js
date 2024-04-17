const { Chat, Room, Member, Blog } = require('../models');
const { Op, where } = require('sequelize');

// 채팅 리스트 조회
exports.find = async (req, res) => {
  const { userId } = req.query;
  const result = [];
  const find1 = await Room.findAll({
    where: {
      roomId: { [Op.like]: `%to${userId}` },
    },
  });
  const find2 = await Room.findAll({
    where: {
      roomId: { [Op.like]: `${userId}to%` },
    },
  });

  if (find1) {
    for (let i = 0; i < find1.length; i++) {
      const [findId, _] = find1[i].roomId.split('to');
      console.log(findId);
      if (findId) {
      }
      const searchBlog = await Blog.findOne({ where: { memberId: findId } });
      if (searchBlog) {
        result.push({
          id: find1[i].id,
          roomId: find1[i].roomId,
          recentMsg: find1[i].recentMsg,
          updatedAt: find1[i].updatedAt,
          nickname: searchBlog.nickname,
        });
      } else {
        const searchMember = await Member.findOne({ where: { id: findId } });
        result.push({
          id: find1[i].id,
          roomId: find1[i].roomId,
          recentMsg: find1[i].recentMsg,
          updatedAt: find1[i].updatedAt,
          nickname: searchMember.username,
        });
      }
    }
  }
  if (find2) {
    for (let i = 0; i < find2.length; i++) {
      const [_, findId] = find2[i].roomId.split('to');
      console.log(findId);
      const searchBlog = await Blog.findOne({ where: { memberId: findId } });
      if (searchBlog) {
        result.push({
          id: find2[i].id,
          roomId: find2[i].roomId,
          recentMsg: find2[i].recentMsg,
          updatedAt: find2[i].updatedAt,
          nickname: searchBlog.nickname,
        });
      } else {
        const searchMember = await Member.findOne({ where: { id: findId } });
        result.push({
          id: find2[i].id,
          roomId: find2[i].roomId,
          recentMsg: find2[i].recentMsg,
          updatedAt: find2[i].updatedAt,
          nickname: searchMember.username,
        });
      }
    }
  }
  res.json({
    success: true,
    result,
    msg: '채팅 리스트 조회 완료',
  });
};

// 채팅 내역 조회
exports.check = async (req, res) => {
  const { roomId } = req.query;
  const result = await Chat.findAll({ where: { roomId } });
  res.json({ success: true, result, msg: '채팅 내역 조회 완료' });
};

// 채팅 내용 추가
exports.write = async (req, res) => {
  const { userId, chatMsg, roomId } = req.body;
  const result = await Chat.create({ userId, chatMsg, roomId });
  // 해당 채팅방 룸리스트 조회
  const find = await Room.findOne({ where: { roomId } });
  if (find) {
    const update = await Room.update(
      { recentMsg: chatMsg },
      { where: { roomId } }
    );
  } else {
    const add = await Room.create({ roomId, recentMsg: chatMsg });
  }
  console.log('완료');
  res.json({ success: true, result, msg: '채팅 추가 완료' });
};

// 닉네임 조회
exports.nickname = async (req, res) => {
  console.log('닉네임 조회');
  const { memberId } = req.query;
  const searchBlog = await Blog.findOne({ where: { memberId } });
  if (searchBlog) {
    res.json({
      success: true,
      result: { nickname: searchBlog.nickname },
      msg: '닉네임 조회 완료',
    });
  } else {
    const searchMember = await Member.findOne({ where: { id: memberId } });
    res.json({
      success: true,
      result: { nickname: searchMember.username },
      msg: '닉네임 조회 완료',
    });
  }
};
