const { PrismaClient } = require('@prisma/client');

const {
  user: User,
  userVerification: UserVerification,
} = new PrismaClient();

exports.findUser = ({
  where,
  select,
}) => new Promise(async (resolve, reject) => {
  try {
    console.log(where);
    console.log(select);
    const userExists = await User.findFirst({
      where,
      select,
    });

    console.log(userExists);

    resolve(userExists);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

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

exports.updateUser = ({
  data,
  where,
  many = false,
}) => new Promise(async (resolve, reject) => {
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

exports.findUserVerification = ({
  where,
  select,
}) => new Promise(async (resolve, reject) => {
  try {
    const userVerificationExists = await UserVerification.findFirst({
      where,
      select,
    });

    resolve(userVerificationExists);
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

exports.updateUserVerification = ({
  data,
  where,
  many,
}) => new Promise(async (resolve, reject) => {
  try {
    if (!many) {
      const updatedVerification = await UserVerification.update({
        data,
        where,
      });
      resolve(updatedVerification);
    } else {
      const updatedVerification = await UserVerification.updateMany({
        data,
        where,
      });
      resolve(updatedVerification);
    }
  } catch (ex) {
    reject(new Error(ex.message));
  }
});
