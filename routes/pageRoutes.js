const { Router } = require('express');
const { renderHome } = require('../controllers/pageController').default;

const router = Router();

router.get('/', renderHome);

export default router;
