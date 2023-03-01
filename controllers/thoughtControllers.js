const { User, Thought, Reaction } = require('../models');

const thoughtController = {

  // get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => {
        res.json(thoughts);
      })
      .catch((err) => {
        console.error(err);
        res.status(404).json(err);
      });
  },
  
  // get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "no such thought" });
        }
        res.json(thought);
      })
      .catch((err) => {
        console.error(err);
        res.status(404).json({ message: err });
      });
  },

  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then(( thought) => {
        return User.findOneAndUpdate({ _id: req.body.userId },
          { $push: {thoughts: thought._id }},{new: true})
      })

      .then((thought) => {
        res.json(thought);
      })
      .catch((err) => {
        console.error(err);
        res.status(404).json({ message: err });
      });
  },

  // update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "no such thought" });
        }
        res.json(thought);
      })
      .catch((err) => {
        console.error(err);
        res.status(404).json({ message: err });
      });
  },
  
  // delete a thought
  deleteThought(req, res,) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "no such thought" });
        }
        return User.findOneAndUpdate(
          { username: thought.username },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then(() => {
        res.json({ message: "thought deleted" });
      })
      .catch((err) => {
        console.error(err);
        res.status(404).json({ message: err });
      });
  },

  // add a reaction to a thought
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "no such thought" });
        }
        res.json(thought);
      })
      .catch((err) => {
        console.error(err);
        res.status(404).json({ message: err });
      });
  },

  // delete a reaction to a thought
  deleteReaction(req, res) {
    console.log(req.params.thoughtId)
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "no such thought" });
        }
        res.json(thought);
      })

      // after reaction is deleted:
      // find the associated thought, and update it by pulling the reaction id 
      // from the reactions array inside the thought,
      .catch((err) => {
        console.error(err);
        res.status(404).json({ message: err });
      });
  },
};

module.exports = thoughtController;