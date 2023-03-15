const router = require('express').Router();
const {
  getAllThoughts,
  getSingleThought,
  createNewThought,
  updateThought,
  deleteThought,
} = require('../../controllers/thoughtController');

//grab all thoughts
//api/thoughts
router.route('/').get(getAllThoughts);

//api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .post(createNewThought)
  .put(updateThought)
  .delete(deleteThought);

router.route('/:thoughtId/reactions').put(updateThought);

module.exports = router;
