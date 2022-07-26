const express = require('express');

const user = require('./routes/user');
const auth = require('./routes/auth');

const app = express();

const router = express.Router();

router.use('/user', user);
router.use('/auth', auth);

app.use('/', router);

const PORT = process.env.PORT || 9099;
app.listen(PORT, () => console.log('Server on PORT', PORT));
