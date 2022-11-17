require('dotenv').config();

const brcypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

exports.comparePassword = ({
  password,
  hash,
}) => brcypt.compareSync(password, hash);

exports.hashPassword = ({
  password,
}) => brcypt.hashSync(password, brcypt.genSaltSync());

exports.generateToken = ({
  id,
}) => new Promise((resolve, reject) => {
  try {
    const token = jwt.sign(id, JWT_SECRET);
    resolve(token);
  } catch (ex) {
    reject(new Error(ex.message));
  }
});

exports.generateOtp = () => Math.floor(100000 + Math.random() * 900000);
