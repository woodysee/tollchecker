import express from 'express';

const router = express.Router();

/* GET index page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Landing For All Page'
  });
});

export default router;
