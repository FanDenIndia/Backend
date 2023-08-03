const express = require('express');
const {
  geteventsbyemail,
  createEventRegis,
  getallemailsforparticularevent,
} = require('../controllers/eventregisController');

const router = express.Router();

router.post('/neweventregis', createEventRegis);
router.get('/userevents', geteventsbyemail);
router.get('/particularevents', getallemailsforparticularevent);

module.exports = router;
