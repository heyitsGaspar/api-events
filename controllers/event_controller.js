// controllers/eventController.js
const Event = require('../models/event');
const EventRegistration = require('../models/eventRegistration');

exports.createEvent = async (req, res) => {
    const { name, date, time, description, special_guests, cost, latitude, longitude, location_name, status, createdBy } = req.body;
    try {
        const event = await Event.create({ name, date, time, description, special_guests, cost, latitude, longitude, location_name, status, createdBy });
        res.status(201).json({ message: 'Event created!', event });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.registerForEvent = async (req, res) => {
    const { eventId, userId } = req.body;
    try {
        const registration = await EventRegistration.create({ eventId, userId });
        res.status(201).json({ message: 'Registered for event!', registration });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
