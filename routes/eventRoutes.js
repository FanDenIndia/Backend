const express = require('express');
const {
  getEvent,
  getPastEvent,
  getUpcomingEvent,
} = require('../controllers/eventController');

const router = express.Router();

router.get('/', getEvent);
router.get('/pastevent', getPastEvent);
router.get('/upcomingevent', getUpcomingEvent);

module.exports = router;
