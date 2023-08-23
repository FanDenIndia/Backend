const express = require('express');

const router = express.Router();
const { sendBulkEmail } = require('../controllers/marketingController');

const validateAdminToken = require('../middleware/validateAdminToken');
const verifyAdmin = require('../middleware/verifyAdmin');

router.post('/email', sendBulkEmail);

module.exports = router;
