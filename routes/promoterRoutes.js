const express = require('express');
const { registerPromoter, getAllPromoters } = require('../controllers/promoterController');
const validateUserToken = require('../middleware/validateUserToken');
const validateAdminToken = require('../middleware/validateAdminToken');

const router = express.Router();

router.post('/registerPromoter', validateUserToken,registerPromoter);
router.get('/getAllPromoters',validateAdminToken,getAllPromoters)

module.exports = router;