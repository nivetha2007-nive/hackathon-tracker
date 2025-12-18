const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  eventLink: {
    type: String,
    trim: true
  },
  teamSizeLimit: {
    type: Number,
    required: true,
    min: 1
  },
  teamMembers: {
    type: [String],
    validate: {
      validator: function(v) {
        return v.length <= this.teamSizeLimit;
      },
      message: props => `Team member count (${props.value.length}) exceeds the limit (${this.teamSizeLimit}).`
    }
  },
  round1Date: {
    type: Date
  },
  round2Date: {
    type: Date
  },
  round3Date: {
    type: Date
  },
  statusRound1: {
    type: String,
    enum: ['Not Started', 'Selected', 'Rejected', 'Completed', 'Missed'],
    default: 'Not Started'
  },
  statusRound2: {
    type: String,
    enum: ['Not Started', 'Selected', 'Rejected', 'Completed', 'Missed'],
    default: 'Not Started'
  },
  statusRound3: {
    type: String,
    enum: ['Not Started', 'Selected', 'Rejected', 'Completed', 'Missed'],
    default: 'Not Started'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Hackathon', hackathonSchema);
