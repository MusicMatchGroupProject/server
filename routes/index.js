var express = require('express');
var router = express.Router();
const userRouter = require('./users');
const translateRouter = require('./translate');

router.use('/users', userRouter);
router.use('/translate', translateRouter);

module.exports = router;
