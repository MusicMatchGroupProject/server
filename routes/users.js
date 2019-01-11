var express = require('express');
var router = express.Router();
const { userCon } = require('../controllers');

router.post('/register', userCon.register);
router.post('/login', userCon.login);
router.post('/login/google', userCon.googleLogin);

module.exports = router;
