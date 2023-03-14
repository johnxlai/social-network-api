const router = require('express').Router();
const {} = require('../../controllers/thoughtController');

//grab all thoughts
//api/thoughts
router.route('/').get(getAllThoughts);

//api/thoughts/:thoughtId
router
  .route('/:thoughtID')
  .get(getSingleThought)
  .post(creatNewThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
