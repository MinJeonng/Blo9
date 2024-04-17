const express = require('express');
const {
  addComment,
  find,
  editComment,
  deleteComment,
} = require('../controller/comment');
const router = express.Router();

router.post('/addComment', addComment);
router.get('/find', find);
router.patch('/edit', editComment);
router.delete('/delete', deleteComment);

module.exports = router;
