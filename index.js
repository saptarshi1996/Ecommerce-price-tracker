const express = require('express');
const cors = require('cors');

const siteRouter = require('./routes/site');
const authRouter = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));

app.use('/site', siteRouter);
app.use('/auth', authRouter);

const PORT = process.env.PORT || 8443;
const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => console.log(`Server on PORT ${PORT}`));
