const express = require('express');
const { getInfo, likeList } = require('../controller/like');

const router = express.Router();

router.get('/getInfo', getInfo);
router.get('/likeList', likeList);

module.exports = router;
