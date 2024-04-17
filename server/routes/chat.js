const express = require('express');
const { check, write, find, nickname } = require('../controller/chat');
const router = express.Router();

router.get('/find', find);
router.get('/check', check);
router.post('/write', write);
router.get('/nickname', nickname);

module.exports = router;
