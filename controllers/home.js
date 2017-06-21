console.log('Starting controllers/home.js');
/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('home', {
    title: 'Home'
  });
};
console.log('Loaded controllers/home.js');
