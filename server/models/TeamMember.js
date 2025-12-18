const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    personalEmail: {
        type: String,
        required: true,
    },
    collegeEmail: {
        type: String,
        required: true,
    },
    githubId: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);
