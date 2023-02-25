const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },

    email: { 
      type: String,
      required: true,
      unique: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Please enter a valid email address"]
      // or  match: [/.+\@.+\..+/, "Please enter a valid email address"]
    },
    
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought"
      }
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },

  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtuals('friendCount').get(function () {
  return this.friend.length;
});

const User = mongoose.model('User', userSchema);

module.exports = User;