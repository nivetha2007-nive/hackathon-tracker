const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const hackathonRoutes = require('./routes/hackathons');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Use cors
app.use(express.json());

// Routes
// Routes
app.use('/api/hackathons', hackathonRoutes);

// Health/Connection Check
app.get('/api/health', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    res.json({ status: 'ok', database: dbStatus });
});

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hackathon-tracker';

// Fail fast if not connected
mongoose.set('bufferTimeoutMS', 2500); // Fail faster if not connected
mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000 // Timeout accordingly
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB:', err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
