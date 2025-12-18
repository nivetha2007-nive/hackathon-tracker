const express = require('express');
const router = express.Router();
const Hackathon = require('../models/Hackathon');

// GET all hackathons
router.get('/', async (req, res) => {
    try {
        const hackathons = await Hackathon.find().sort({ createdAt: -1 });
        res.json(hackathons);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create hackathon
router.post('/', async (req, res) => {
    const hackathon = new Hackathon({
        name: req.body.name,
        eventLink: req.body.eventLink,
        teamSizeLimit: req.body.teamSizeLimit,
        teamMembers: req.body.teamMembers,
        round1Date: req.body.round1Date,
        round2Date: req.body.round2Date,
        round3Date: req.body.round3Date,
        statusRound1: req.body.statusRound1,
        statusRound2: req.body.statusRound2,
        statusRound3: req.body.statusRound3
    });

    try {
        const newHackathon = await hackathon.save();
        res.status(201).json(newHackathon);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update hackathon
router.put('/:id', async (req, res) => {
    try {
        const hackathon = await Hackathon.findById(req.params.id);
        if (!hackathon) return res.status(404).json({ message: 'Hackathon not found' });

        Object.assign(hackathon, req.body);
        const updatedHackathon = await hackathon.save();
        res.json(updatedHackathon);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE hackathon
router.delete('/:id', async (req, res) => {
    try {
        const hackathon = await Hackathon.findById(req.params.id);
        if (!hackathon) return res.status(404).json({ message: 'Hackathon not found' });

        await hackathon.deleteOne();
        res.json({ message: 'Hackathon deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
