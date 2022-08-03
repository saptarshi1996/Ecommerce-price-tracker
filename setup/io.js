const io = require('./socket');

const userDao = require('../dao/user');

console.log('Io Set');
io.on('connection', (socket) => {
  socket.on('userConnected', async (data) => {
    const payload = JSON.parse(data);
    await userDao.createSocketConnection({
      userId: payload.userId,
      socketId: socket.id,
    });
  });

  socket.on('disconnected', async (reason) => {
    console.log(reason);
    await userDao.closeSocketConnection({
      socketId: socket.id,
    });
  });
});

exports.emitToUser = async ({
  userId,
  event,
  data,
}) => {
  const socket = await userDao.getSocketIdForUser({ userId });
  socket.forEach((id) => io.to(id).emit(event, data));
  Promise.resolve();
};
