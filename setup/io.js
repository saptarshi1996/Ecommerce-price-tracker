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

  socket.on('disconnected', (reason) => {
    console.log(reason);
  });
});

exports.emitToUser = ({
  socketId,
  event,
  data,
}) => {
  Promise.resolve(io.to(socketId).emit(event, data));
};
