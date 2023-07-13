const express = require('express');
const { getEvent } = require('../controllers/eventController')

const router = express.Router();

router.get('/', getEvent)

module.exports = router;