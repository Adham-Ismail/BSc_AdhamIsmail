const express = require('express');
const router = express.Router();
const influxController = require('../Controllers/influxController');

router.get('/data', influxController.getData);

module.exports = router;