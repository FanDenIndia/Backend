
const express = require('express');
const { geteventsbyemail, createEventRegis} = require('../controllers/eventregisController');

const router = express.Router();

router.post('/neweventregis', createEventRegis);
router.get('/userevents', geteventsbyemail);


module.exports = router;