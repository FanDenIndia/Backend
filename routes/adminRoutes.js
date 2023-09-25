const express = require('express');

const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  currentAdmin,
  updateEvent,
  deleteEvent,
  addEvent,
  getallevents,
  updateEventRegis,
  getAllEventRegis,
  particularEventRegis,
  updateCoordinator,
  getCoordinator,
  CoordinatorEvents,
  addVenue,
  getAllVenue,
  addArticle,
  getAllArticle,
  addFeaturedEvent,
  removeFeaturedEvent,
  deleteArticle,
} = require('../controllers/adminController');
const validateAdminToken = require('../middleware/validateAdminToken');
const verifyAdmin = require('../middleware/verifyAdmin');

router.post('/login', loginAdmin);
router.post('/register', registerAdmin);
router.get('/current', validateAdminToken, currentAdmin);
router.post('/addEvent', verifyAdmin, addEvent);
router.post('/addFeaturedEvent', verifyAdmin, addFeaturedEvent);
router.post('/removeFeaturedEvent', verifyAdmin, removeFeaturedEvent);
router.get('/allevents', verifyAdmin, getallevents);
router.put('/updateEvent/:id', verifyAdmin, updateEvent);
router.delete('/deleteEvent/:id', verifyAdmin, deleteEvent);
router.get('/alleventregis', verifyAdmin, getAllEventRegis);
router.get('/particulareventregis', verifyAdmin, particularEventRegis);
router.put('/updateeventregis', updateEventRegis);
router.put('/updatecoordinator', verifyAdmin, updateCoordinator);
router.get('/getcoordinator', verifyAdmin, getCoordinator);
router.get('/coordinatorevents', verifyAdmin, CoordinatorEvents);
router.post('/addvenue', verifyAdmin, addVenue);
router.get('/getallvenue', verifyAdmin, getAllVenue);
router.post('/addArticle', verifyAdmin, addArticle);
router.get('/getallarticle', getAllArticle);
router.delete('/deleteArticle/:id', verifyAdmin, deleteArticle);

module.exports = router;
