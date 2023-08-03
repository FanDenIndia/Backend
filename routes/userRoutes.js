const express = require('express');
const {
  registerUser,
  currentUser,
  loginUser,
} = require('../controllers/userController');
const validateUserToken = require('../middleware/validateUserToken');
// const verifyCoordinator = require("../middleware/verifyCoordinator");

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/current', validateUserToken, currentUser);

// router.get("/coordinator/events/:id",verifyCoordinator,getCoordinatorEvents)
//
module.exports = router;
