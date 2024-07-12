// routes/users.js
const express = require('express');
const userController = require('../controllers/user_controller');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
