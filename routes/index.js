var express = require('express');
var router = express.Router();
const userRouter = require('./users');
const translateRouter = require('./translate');
const voiceController = require('../controllers/voice');

router.use('/users', userRouter);
router.use('/translate', translateRouter);
router.use('/voice', voiceController.notFound);

module.exports = router;
