// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event_controller');

// Rutas para los eventos
router.post('/create', eventController.createEvent);
router.post('/register', eventController.registerForEvent);
router.put('/update/:id', eventController.updateEvent);
router.delete('/delete/:id', eventController.deleteEvent);
router.get('/all', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);

module.exports = router;
