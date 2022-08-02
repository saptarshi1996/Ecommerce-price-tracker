const http = require('http');
const express = require('express');
const cors = require('cors');

const authMiddleware = require('../middlewares/auth');

const userRouter = require('../routes/user');
const siteRouter = require('../routes/site');
const authRouter = require('../routes/auth');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));

app.use('/user', authMiddleware, userRouter);
app.use('/site', authMiddleware, siteRouter);
app.use('/auth', authRouter);

module.exports = server;
