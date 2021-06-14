const router = require('express').Router();
const { registerUser, login } = require('../controllers/auth.js');

// REGISTER
router.post('/register', registerUser);

// LOGIN
router.post('/login', login);

module.exports = router;
