// controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users'); // Asegúrate de que la ruta al modelo User sea correcta
require('dotenv').config();

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({ username, email, password: hashedPassword });
        
        // Generar token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        
        res.status(201).json({ message: 'User created!', userId: user.id, token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password!' });
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid email or password!' });
        }
        const token = jwt.sign({  userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({  userId: user.id, token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
