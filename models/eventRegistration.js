// models/EventRegistration.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Event = require('../models/event');
const User = require('../models/users');

const EventRegistration = sequelize.define('EventRegistration', {
    eventId: {
        type: DataTypes.INTEGER,
        references: {
            model: Event,
            key: 'id',
        },
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
    registeredAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = EventRegistration;
