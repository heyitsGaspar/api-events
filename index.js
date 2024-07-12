const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const userRoutes = require('./routes/users');
const eventRoutes = require('./routes/events');
const cors = require('cors');

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);

sequelize.sync()
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(err => console.log(err));

module.exports = app;
