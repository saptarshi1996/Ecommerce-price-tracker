require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

exports.checkPassword = ({
  password,
  hash,
}) => bcrypt.compareSync(password, hash);

exports.hashPassword = ({
  password,
}) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

exports.generateToken = (id) => jwt.sign(id, JWT_SECRET);

exports.verifyToken = (token) => new Promise((resolve, reject) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    resolve(decoded);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.generateOtp = () => Math.floor(100000 + Math.random() * 900000);
