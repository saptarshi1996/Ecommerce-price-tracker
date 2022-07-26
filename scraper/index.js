const express = require('express');

const app = express();

const router = express.Router();

app.use('/', router);

const PORT = 9090;
app.listen(PORT, () => console.log('Scraper Server on PORT', PORT));
