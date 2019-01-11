var express = require('express');
var router = express.Router();
const { translateCon } = require('../controllers');

router.post('/', translateCon.translate);

module.exports = router;
