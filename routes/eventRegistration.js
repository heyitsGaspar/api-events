// eventRegistrationRoutes.js
const express = require('express');
const router = express.Router();
const { registerToEvent } = require('../controllers/event_controller');


// Rutas de inscripción a eventos
router.post('/events/register', registerToEvent);

module.exports = router;
