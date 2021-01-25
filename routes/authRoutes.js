const { Router } = require('express');
const { authUser, logoutUser } = require('../controllers/authController');

const router = Router();

router.post('/login', authUser);
router.get('/logout', logoutUser);

module.exports = router;
