const express = require('express');
const {
  newPost,
  find,
  checkLike,
  findLike,
  clickLike,
  otherPost,
  category,
  likeList,
  popular,
  deletePost,
  mainPop,
  mainNew,
  addView,
} = require('../controller/post');

const router = express.Router();

router.post('/write', newPost);
router.get('/find', find);
router.delete('/delete', deletePost);
router.get('/likeList', likeList);
router.get('/checkLike', checkLike);
router.get('/findLike', findLike);
router.post('/clickLike', clickLike);
router.get('/otherPost', otherPost);
router.get('/category', category);
router.get('/popular', popular);
router.get('/mainPop', mainPop);
router.get('/mainNew', mainNew);
router.patch('/addView', addView);

module.exports = router;
