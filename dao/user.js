const { PrismaClient } = require('@prisma/client');

const {
  user,
} = new PrismaClient();

exports.getUserById = ({
  id,
}) => new Promise(async (resolve, reject) => {
  try {
    const userObject = await user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        password: true,
        isUserVerified: true,
      }
    });

    resolve(userObject);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.getUserByEmail = ({
  email,
}) => new Promise(async (resolve, reject) => {
  try {
    const userObject = await user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        password: true,
        isUserVerified: true,
      }
    });

    resolve(userObject);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.createUser = (
  userObject
) => new Promise(async (resolve, reject) => {
  try {
    const userCreated = await user.create({
      data: userObject,
    });

    resolve(userCreated);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});
