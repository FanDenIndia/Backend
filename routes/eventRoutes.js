const express = require('express');
const {
  getEvent,
  getPastEvent,
  getUpcomingEvent,
  getFeaturedEvents,
} = require('../controllers/eventController');

const router = express.Router();

router.get('/', getEvent);
router.get('/pastevent', getPastEvent);
router.get('/upcomingevent', getUpcomingEvent);
router.get('/featuredEvent', getFeaturedEvents);

module.exports = router;
