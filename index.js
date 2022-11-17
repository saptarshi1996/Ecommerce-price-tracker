require('dotenv').config();

const express = require('express');
const cors = require('cors');

const userRoute = require('./routes/user');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));
app.use(cors());

app.use('/auth', userRoute);

const PORT = +process.env.PORT;
app.listen(PORT, () => console.log(`Server on PORT ${PORT}`));
