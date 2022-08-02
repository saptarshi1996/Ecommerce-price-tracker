const { PrismaClient } = require('@prisma/client');

const {
  user,
  userAuthentication,
  userSocket,
} = new PrismaClient();

exports.findUser = (data) => new Promise(async (resolve, reject) => {
  try {
    const userFound = await user.findFirst({
      where: data,
      select: {
        id: true,
        isVerified: true,
        password: true,
      }
    });
    resolve(userFound);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.findUserById = (id) => new Promise(async (resolve, reject) => {
  try {
    const userFound = await user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
      }
    });
    resolve(userFound);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.createUser = (data) => new Promise(async (resolve, reject) => {
  try {
    const userCreated = await user.create({ data });
    resolve(userCreated);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.createUserAuthenticatipn = (data) => new Promise(async (resolve, reject) => {
  try {
    const userAuthenticationCreated = await userAuthentication.create({ data });
    resolve(userAuthenticationCreated);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.findUserAuthentication = (data) => new Promise(async (resolve, reject) => {
  try {
    const userAuthenticationFound = await userAuthentication.findFirst({
      where: data,
      select: {
        id: true,
        isRevoked: true,
      },
    });
    resolve(userAuthenticationFound);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.updateUserAuthenticationRevoke = ({ userId }) => new Promise(async (resolve, reject) => {
  try {
    await userAuthentication.updateMany({
      where: {
        userId,
        isRevoked: false,
      },
      data: {
        isRevoked: true,
      }
    });
    resolve();
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.verifyUser = ({ userId }) => new Promise(async (resolve, reject) => {
  try {
    await user.update({
      where: {
        id: userId,
      },
      data: {
        isVerified: true,
      }
    });
    resolve();
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.createSocketConnection = ({
  userId,
  socketId,
}) => new Promise(async (resolve, reject) => {
  try {
    await userSocket.create({
      data: {
        userId,
        socketId,
        isActive: true,
      },
    });
    resolve();
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.getSocketIdForUser = ({
  userId,
}) => new Promise(async (resolve, reject) => {
  try {
    const socketId = await userSocket.findMany({
      where: {
        userId,
        isActive: true,
      },
      select: {
        socketId: true,
      },
    });

    resolve(socketId.map((socket) => socket.socketId));
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.closeSocketConnection = ({
  userId,
  socketId,
}) => new Promise(async (resolve, reject) => {
  try {
    await userSocket.updateMany({
      where: {
        userId,
        socketId,
      },
      data: {
        isActive: false,
      }
    });
    resolve();
  } catch (ex) {
    reject(new Error(ex.message));
  }
});
