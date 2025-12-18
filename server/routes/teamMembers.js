const express = require('express');
const router = express.Router();
const TeamMember = require('../models/TeamMember');

// GET all members
router.get('/', async (req, res) => {
    try {
        const members = await TeamMember.find().sort({ name: 1 });
        res.json(members);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create member
router.post('/', async (req, res) => {
    const member = new TeamMember({
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        personalEmail: req.body.personalEmail,
        collegeEmail: req.body.collegeEmail,
        githubId: req.body.githubId,
        address: req.body.address
    });

    try {
        const newMember = await member.save();
        res.status(201).json(newMember);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update member
router.put('/:id', async (req, res) => {
    try {
        const member = await TeamMember.findById(req.params.id);
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }

        member.name = req.body.name || member.name;
        member.dateOfBirth = req.body.dateOfBirth || member.dateOfBirth;
        member.personalEmail = req.body.personalEmail || member.personalEmail;
        member.collegeEmail = req.body.collegeEmail || member.collegeEmail;
        member.githubId = req.body.githubId || member.githubId;
        member.address = req.body.address || member.address;

        const updatedMember = await member.save();
        res.json(updatedMember);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE member
router.delete('/:id', async (req, res) => {
    try {
        const member = await TeamMember.findById(req.params.id);
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }
        await member.deleteOne();
        res.json({ message: 'Member deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
