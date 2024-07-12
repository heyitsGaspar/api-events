// routes/events.js
const express = require('express');
const eventController = require('../controllers/event_controller');

const router = express.Router();

router.post('/create', eventController.createEvent);
router.post('/register', eventController.registerForEvent);

module.exports = router;
