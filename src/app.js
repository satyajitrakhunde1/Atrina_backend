const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');

require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGODB_URL);

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', taskRoutes);

module.exports = app;
