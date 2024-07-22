// controllers/eventController.js
const Event = require('../models/event');
const User = require('../models/users');
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

exports.updateEvent = async (req, res) => {
    const { id } = req.params;
    const { name, date, time, description, special_guests, cost, latitude, longitude, location_name, status } = req.body;
    try {
        const event = await Event.findByPk(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found!' });
        }
        await event.update({ name, date, time, description, special_guests, cost, latitude, longitude, location_name, status });
        res.status(200).json({ message: 'Event updated!', event });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findByPk(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found!' });
        }
        await event.destroy();
        res.status(200).json({ message: 'Event deleted!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.findAll({
            include: {
                model: User,
                through: { attributes: [] },
                attributes: ['id', 'username', 'email']
            }
        });
        // Actualizar el estado de los eventos según la fecha
        const today = new Date();
        events.forEach(event => {
            if (new Date(event.date) < today && event.status !== 'inactive') {
                event.status = 'inactive';
                event.save();
            }
        });
        res.status(200).json({ events });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findByPk(id, {
            include: {
                model: User,
                through: { attributes: [] },
                attributes: ['id', 'username', 'email']
            }
        });
        if (!event) {
            return res.status(404).json({ message: 'Event not found!' });
        }
        res.status(200).json({ event });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
