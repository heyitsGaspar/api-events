// models/eventRegistration.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('../models/users');
const Event = require('../models/event');

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
}, {
    timestamps: true,
});

User.belongsToMany(Event, { through: EventRegistration, foreignKey: 'userId' });
Event.belongsToMany(User, { through: EventRegistration, foreignKey: 'eventId' });

module.exports = EventRegistration;
