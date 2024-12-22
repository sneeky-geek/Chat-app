const express = require('express');
const cors = require('cors');
const path = require('path');
const messageRoutes = require('./routes/messages');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.use('/api/messages', messageRoutes);

// Default route for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/front.html'));
});

module.exports = app;
