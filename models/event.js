// models/event.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('../models/users');

const Event = sequelize.define('Event', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    special_guests: {
        type: DataTypes.STRING,
    },
    cost: {
        type: DataTypes.DECIMAL(10, 2),
    },
    latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    location_name: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['active', 'inactive', 'cancelled', 'completed']],
        },
    },
    createdBy: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
}, {
    timestamps: true,
});

module.exports = Event;
