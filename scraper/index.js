require('dotenv').config();

const express = require('express');

const app = express();

const PORT = process.env.WORKER_PORT;
const HOST = process.env.WORKER_HOST;

app.listen(PORT, HOST, () => console.log(`Worker on PORT ${PORT}`));

require('./jobs/amazon');
