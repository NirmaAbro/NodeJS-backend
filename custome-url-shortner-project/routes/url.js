const express = require('express');
const router = express.Router();
const { handleGenerateNewShortUrl ,handlegetAnalytics } = require('../controllers/url');

router.post('/', handleGenerateNewShortUrl);
router.get('/analytics/:shortid', handlegetAnalytics);


module.exports = router;