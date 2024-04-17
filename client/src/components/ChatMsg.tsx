import styled from 'styled-components';
import { ChatMsgProps, SendMsgProps } from '../types';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const BoxStyle = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
`;
const TimeStyle = styled.p`
  color: #a9a9a9;
  font-size: 12px;
  line-height: 20px;
`;
const ChatStyle = styled.p`
  padding: 10px;
  border-radius: 20px;
  max-width: 60vw;
  background: #f1f1f1;
  color: #333;
`;
const InputBox = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: #fff;
  padding: 15px;
  box-sizing: border-box;
`;
const TextInput = styled.input`
  width: 100%;
  margin: 0;
  padding: 0 70px 0 20px;
  box-sizing: border-box;
  border: none;
  background: #f5f5f5;
  line-height: 40px;
  border-radius: 20px;
  font-size: 16px;
  @media (min-width: 1160px) {
    display: block;
    width: 1200px;
    margin: 0 auto;
  }
`;
const SendBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  line-height: 30px;
  border-radius: 15px;
  background: #fbc02d;
  padding: 0 10px;
  color: #fff;
  @media (min-width: 1160px) {
    right: 50%;
    transform: translateX(590px);
  }
`;

export function MyChatMsg({ text, sendTime }: ChatMsgProps) {
  const writtenTime = new Date(sendTime);
  const HOUR = writtenTime.getHours();
  const MINUTE = writtenTime.getMinutes();
  useEffect(() => {}, []);
  return (
    <BoxStyle style={{ justifyContent: 'flex-end' }}>
      <TimeStyle>
        {HOUR <= 12 ? `오전 ${HOUR}:${MINUTE}` : `오후 ${HOUR - 12}:${MINUTE}`}
      </TimeStyle>
      <ChatStyle
        style={{ background: '#43a046', color: '#fff', marginLeft: '10px' }}
      >
        {text}
      </ChatStyle>
    </BoxStyle>
  );
}
export function OpChatMsg({ text, sendTime }: ChatMsgProps) {
  const writtenTime = new Date(sendTime);
  const HOUR = writtenTime.getHours();
  const MINUTE = writtenTime.getMinutes();
  useEffect(() => {}, []);
  return (
    <BoxStyle>
      <ChatStyle style={{ marginRight: '10px' }}>{text}</ChatStyle>
      <TimeStyle>
        {HOUR <= 12 ? `오전 ${HOUR}:${MINUTE}` : `오후 ${HOUR - 12}:${MINUTE}`}
      </TimeStyle>
    </BoxStyle>
  );
}

export function DateChatMsg({ children }: any) {
  return (
    <div
      style={{
        textAlign: 'center',
        color: '#a9a9a9',
        fontSize: '12px',
        marginBottom: '10px',
      }}
    >
      {children}
    </div>
  );
}

export function InputChat({ userId, chatlist }: SendMsgProps) {
  const socketRef = useRef(io('/'));
  const socket = socketRef.current;
  // const socket = socketIOClient(`${process.env.REACT_APP_HOST}`);
  const [chatMsg, setChatMsg] = useState<string>('');
  const [chatData, setChatData] = chatlist;
  const sendMsg = async () => {
    if (chatMsg.trim().length === 0) {
      return;
    }
    socket.emit('msg', {
      chatMsg,
      userId,
    });
    const res = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_HOST}/api/chat/write`,
      data: { userId, roomId: chatData.roomId, chatMsg },
    });
    setChatData({
      open: true,
      data: [...chatData.data, res.data.result],
      roomId: chatData.roomId,
      nickname: chatData.nickname,
    });
    setChatMsg('');
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatMsg(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      sendMsg();
    }
  };
  useEffect(() => {}, []);
  return (
    <InputBox>
      <TextInput
        type="text"
        placeholder="채팅 내용을 입력하세요."
        value={chatMsg}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <SendBtn type="button" onClick={sendMsg}>
        전송
      </SendBtn>
    </InputBox>
  );
}
