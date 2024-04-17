const express = require('express');
const db = require('./models');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');

const app = express();
const PORT = 8000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const memberRouter = require('./routes/member');
app.use('/api/member', memberRouter);
const chatRouter = require('./routes/chat');
app.use('/api/chat', chatRouter);
const blogRouter = require('./routes/blog');
app.use('/api/blog', blogRouter);
const commentRoutes = require('./routes/comment');
app.use('/api/comment', commentRoutes);
const postRoutes = require('./routes/post');
app.use('/api/post', postRoutes);
const subscribeRoutes = require('./routes/subscribe');
app.use('/api/sub', subscribeRoutes);
const likeRoutes = require('./routes/like');
app.use('/api/like', likeRoutes);

// 채팅(소켓)
io.on('connection', (socket) => [
  // 채팅방 접속
  socket.on('enter', (res) => {
    const { roomId } = res;
    socket.join(roomId);
    socket.roomId = roomId;
    console.log(roomId, '접속 완료');
  }),
  // 채팅 입력
  socket.on('msg', (res) => {
    const { chatMsg, userId, roomId } = res;
    console.log('채팅 수신');
    io.to(roomId).emit('newMsg', {
      chatMsg,
      userId,
      roomId,
    });
  }),
]);

db.sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
