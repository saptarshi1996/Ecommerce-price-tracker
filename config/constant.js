require('dotenv').config();

module.exports = {

  environment: {
    PORT: +process.env.PORT,
    HOST: process.env.HOST,
  },

};
