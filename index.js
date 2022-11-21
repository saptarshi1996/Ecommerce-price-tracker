const express = require('express');
const cors = require('cors');

const {
  environment: {
    PORT,
    HOST,
  },
} = require('./config/constant');

const authMiddleware = require('./middlewares/auth');

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));
app.use(cors());

app.use('/auth', authRoute);
app.use('/user', authMiddleware, userRoute);

app.listen(PORT, HOST, () => console.log(`Server on PORT ${PORT} at ${HOST}`));
