const express = require('express');

const {
  createOrder,
  cancelOrder,
  getAllOrder,
} = require('../controllers/orderController');

const validateUserToken = require('../middleware/validateUserToken');
const verifyAdmin = require('../middleware/verifyAdmin');

const router = express.Router();

router.post('/createOrder', createOrder);

router.post('/cancelOrder', validateUserToken, cancelOrder);

router.get('/getAllOrder', verifyAdmin, getAllOrder);

module.exports = router;
