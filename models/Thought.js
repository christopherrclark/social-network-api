const mongoose = require('mongoose');
const { Schema } = mongoose;

const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: //????
    },

    username: { 
      type: String, 
      required: true
    },

    reactions: [reationSchema]
  }
);

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;