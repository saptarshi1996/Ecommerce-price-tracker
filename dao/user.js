const { PrismaClient } = require('@prisma/client');

const {
  user: User,
  userVerification: UserVerification,
} = new PrismaClient();

exports.createUser = ({
  data,
}) => new Promise(async (resolve, reject) => {
  try {
    const userCreated = await User.create({
      data,
    });

    resolve(userCreated);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.findUser = ({
  where,
  select,
}) => new Promise(async (resolve, reject) => {
  try {
    const userFound = await User.findFirst({
      where,
      select,
    });

    resolve(userFound);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.updateUser = ({
  where,
  data,
}, many = false) => new Promise(async (resolve, reject) => {
  try {
    if (!many) {
      const updatedUser = await User.update({
        where,
        data,
      });
      resolve(updatedUser);
    } else {
      const updatedUser = await User.updateMany({
        where,
        data,
      });
      resolve(updatedUser);
    }
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.createUserVerification = ({
  data,
}) => new Promise(async (resolve, reject) => {
  try {
    const userVerificationCreated = await UserVerification.create({
      data,
    });

    resolve(userVerificationCreated);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.findUserVerification = ({
  where,
  select,
}) => new Promise(async (resolve, reject) => {
  try {
    const userVerificationFound = await UserVerification.findFirst({
      where,
      select,
    });
    resolve(userVerificationFound);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.updateUserVerification = ({
  data,
  where,
}, many) => new Promise(async (resolve, reject) => {
  try {
    if (!many) {
      const updatedVerification = await UserVerification.update({
        data,
        where,
      });

      resolve(updatedVerification);
    } else {
      const updateUserVerification = await UserVerification.updateMany({
        data,
        where,
      });
      resolve(updateUserVerification);
    }
  } catch (ex) {
    reject(new Error(ex.message));
  }
});
