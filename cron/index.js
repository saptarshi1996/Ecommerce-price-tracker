const express = require('express');

const app = express();
const PORT = process.env.CRON_PORT || 9909;
const HOST = process.env.CRON_HOST || '0.0.0.0';

app.listen(PORT, HOST, () => console.log(`Cron server on PORT ${PORT}`));
