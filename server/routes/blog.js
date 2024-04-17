const express = require('express');
const {
  blogDetail,
  find,
  update,
  getCategory,
  newCategory,
  delCategory,
  updateCategory,
  findCategory,
  checkSub,
  findSub,
  clickSub,
  subList,
  blog,
  addView,
} = require('../controller/blog');

const router = express.Router();

router.get('/blog', blog);
router.get('/find', find);
router.patch('/update', update);
router.get('/subList', subList);
router.get('/checkSub', checkSub);
router.get('/findSub', findSub);
router.post('/clickSub', clickSub);
router.get('/findCategory', findCategory);
router.get('/getCategory', getCategory);
router.post('/newCategory', newCategory);
router.delete('/delCategory', delCategory);

// router.post('/write',)

router.patch('/updateCategory', updateCategory);
// router.get('/:id', blogDetail);

module.exports = router;
