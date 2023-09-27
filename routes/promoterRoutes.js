const express = require('express');
const { registerPromoter, getAllPromoters, addEventRegis } = require('../controllers/promoterController');
const validateUserToken = require('../middleware/validateUserToken');
const validateAdminToken = require('../middleware/validateAdminToken');

const router = express.Router();

router.post('/registerPromoter', validateUserToken,registerPromoter);
router.put('/addEventRegis', validateUserToken,addEventRegis);
router.get('/getAllPromoters',validateAdminToken,getAllPromoters)

module.exports = router;