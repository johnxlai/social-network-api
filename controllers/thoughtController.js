const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  // Grab all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create new thought
  createNewThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } }
        )
          .then((user) => {
            !user
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json(thought);
          })
          .catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.status(500).json(err));
  },
  //Update existing thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this Id' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove existing thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
        return User.findOneAndUpdate(
          { thought: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } }
        );
      })
      .then((user) => {
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
  //   addReaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } }
    )
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //   deleteReaction;
  deleteReaction(req, res) {
    console.log(req.params);
    Thought.findOneAndDelete(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.params.reactionId } }
    )
      .then((user) => {
        !user
          ? res.status(404).json({ message: 'No reaction with this id!' })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
};
