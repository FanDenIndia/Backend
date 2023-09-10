const express = require('express');

const router = express.Router();
const { sendBulkEmail, sendEventRegisMail } = require('../controllers/marketingController');

const validateAdminToken = require('../middleware/validateAdminToken');
const verifyAdmin = require('../middleware/verifyAdmin');

router.post('/email', sendBulkEmail);
router.post('/emailEventRegis', sendEventRegisMail);

module.exports = router;
