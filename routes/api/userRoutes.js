const router = require('express').Router();
const {} = require('../../controllers/');

// /api/user
router.route('/').get(getAllUsers).post(createUser);

//api/user//:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);
module.exports = router;
