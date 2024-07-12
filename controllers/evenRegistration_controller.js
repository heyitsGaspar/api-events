// controllers/eventRegistrationController.js

const { registerToEvent, getRegistrationsByEvent } = require('../models/eventRegistration');

async function registerUserToEvent(req, res) {
    const { eventId } = req.params;
    const userId = req.user.userId; // Obtenemos el userId del token JWT

    try {
        // Verificar si el usuario ya está registrado en el evento
        const existingRegistration = await getRegistrationsByEvent(eventId);
        const alreadyRegistered = existingRegistration.some(registration => registration.user_id === userId);
        if (alreadyRegistered) {
            return res.status(400).json({ message: 'Ya estás registrado en este evento.' });
        }

        // Registrar usuario en el evento
        const registration = await registerToEvent(eventId, userId);
        res.status(201).json(registration);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getRegistrationsForEvent(req, res) {
    const { eventId } = req.params;

    try {
        const registrations = await getRegistrationsByEvent(eventId);
        res.status(200).json(registrations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    registerUserToEvent,
    getRegistrationsForEvent,
};
