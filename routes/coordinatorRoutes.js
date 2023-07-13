const express = require("express")
const {loginCoordinator,registerCoordinator,currentCoordinator,coordinatorEventRegis,updateEventRegis}  = require("../controllers/coordinatorController")

const router = express.Router();

const validateCoordinatorToken = require("../middleware/validateCoordinatorToken");
const verifyCoordinator = require('../middleware/verifyCoordinator')
const verifyAdmin = require('../middleware/verifyAdmin')

router.post("/login", loginCoordinator);
router.post("/register", verifyAdmin,registerCoordinator);
router.get("/current", validateCoordinatorToken, currentCoordinator);
router.get('/particulareventregis', verifyCoordinator, coordinatorEventRegis);
router.put('/updateeventregis', verifyCoordinator, updateEventRegis);


module.exports = router;