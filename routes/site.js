const router = require('express').Router();

const siteController = require('../controllers/site');

router.get('/sites', siteController.getSite);

module.exports = router;
