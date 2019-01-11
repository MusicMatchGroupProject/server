var express = require('express');
var router = express.Router();
const voiceController = require('../controllers/voice')

router.use('/voice', voiceController.notFound);

module.exports = router;
