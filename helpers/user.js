require('dotenv').config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { JWT_SECRET } = process.env;

exports.hashPassword = ({
  password,
}) => bcrypt.hashSync(password, bcrypt.genSaltSync());

exports.comparePassword = ({
  password,
  hash,
}) => bcrypt.compareSync(password, hash);

exports.generateOtp = () => Math.floor(100000 + Math.random() * 900000);

exports.getExpiryAndGeneratedTime = ({
  addedMinutes,
}) => {
  const createdAt = new Date();
  const expiredAt = new Date(createdAt.getTime() + addedMinutes * 60000);
  return {
    createdAt,
    expiredAt,
  };
};

exports.generateToken = ({
  id,
}) => new Promise((resolve, reject) => {
  try {
    const token = jwt.sign({ id }, JWT_SECRET);
    resolve(token);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.verifyToken = ({
  token,
}) => new Promise((resolve, reject) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    resolve(payload);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});
