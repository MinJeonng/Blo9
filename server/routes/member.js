const express = require('express');
const {
  signup,
  login,
  find,
  searchId,
  update,
  destroy,
} = require('../controller/member');
const { auth } = require('../middleware');
const router = express.Router();

router.post('/signup', signup);
router.get('/login', login);
router.get('/find', auth, find);
router.get('/searchId', searchId);
router.patch('/update', update);
router.delete('/destroy', destroy);

module.exports = router;
