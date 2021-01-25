const { Router } = require('express');
const { renderHome } = require('../controllers/pageController');

const router = Router();

router.get('/', renderHome);

module.exports = router;
