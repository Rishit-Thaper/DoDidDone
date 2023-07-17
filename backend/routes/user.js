const express = require('express');

const router = express.Router();

const { loginController, signController } = require('../controller/userController');

router.post('/login',loginController)
router.post('/signup',signController)

module.exports = router