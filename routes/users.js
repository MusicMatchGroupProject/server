var express = require('express');
var router = express.Router();
const { userCon } = require('../controllers');

router.post('/singup', userCon.singup);
router.post('/login', userCon.login);

module.exports = router;
