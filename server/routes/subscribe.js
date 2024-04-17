const express = require('express');
const { getInfo } = require('../controller/subscribe');

const router = express.Router();

router.get('/getInfo', getInfo);

module.exports = router;
