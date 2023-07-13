const express = require("express")

const router = express.Router();
const {
    registerAdmin, loginAdmin, currentAdmin, updateEvent, deleteEvent, addEvent, getallevents, updateEventRegis, getAllEventRegis, particularEventRegis,updateCoordinator
} = require("../controllers/adminController");
const validateAdminToken = require("../middleware/validateAdminToken");
const verifyAdmin = require('../middleware/verifyAdmin')

router.post("/login", loginAdmin);
router.post("/register", registerAdmin);
router.get("/current", validateAdminToken, currentAdmin);
router.post('/addEvent', verifyAdmin, addEvent)
router.get('/allevents', verifyAdmin, getallevents);
router.put('/updateEvent/:id', verifyAdmin, updateEvent)
router.delete('/deleteEvent/:id', verifyAdmin, deleteEvent)
router.get('/alleventregis', verifyAdmin, getAllEventRegis);
router.get('/particulareventregis', verifyAdmin, particularEventRegis);
router.put('/updateeventregis', verifyAdmin, updateEventRegis);
router.put('/updatecoordinator', verifyAdmin, updateCoordinator);

module.exports = router;