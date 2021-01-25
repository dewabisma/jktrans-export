// @desc    render home
// @route   GET /
// @access  Public
const renderHome = async (req, res) => {
  res.render('index.ejs');
};

module.exports = { renderHome };
