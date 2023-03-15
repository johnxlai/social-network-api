// const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');
// getAllUsers,
//   createUser,
//   getSingleUser,
//   updateUser,
//   deleteUser,
//   addFriend,
//   deleteFriend;
module.exports = {
  // Get all Users
  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  //Get a user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) => {
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Create a user
};
