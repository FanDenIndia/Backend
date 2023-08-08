const express = require('express');
const {
  geteventsbyemail,
  createEventRegis,
  getallemailsforparticularevent,
} = require('../controllers/eventregisController');

const verifyAdmin = require('../middleware/verifyAdmin');

const router = express.Router();

router.post('/neweventregis', createEventRegis);
router.get('/userevents', geteventsbyemail);
router.get('/particularevents', verifyAdmin, getallemailsforparticularevent);

module.exports = router;
