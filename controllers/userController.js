const { User } = require('../models');

module.exports = {
  ///Get all Users
  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
};
