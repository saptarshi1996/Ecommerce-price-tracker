const server = require('./app');

console.log('Socket connected');
const io = require('socket.io', {
  cors: {
    origin: '*',
  },
})(server);

module.exports = io;
