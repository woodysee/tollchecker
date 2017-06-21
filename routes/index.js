import express from 'express';
//console.log('Starting routes/index.js');
const router = express.Router();

/* GET index page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Landing For All Page'
  });
});
//console.log('Loaded routes/index.js');
export default router;
