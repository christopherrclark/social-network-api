const router = require("express").Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require("../../controllers/thoughtControllers");

// get all thoughts
router.route("/").get(getThoughts);

// get single thought by ID
router.route("/:thoughtId").get(getSingleThought);

// create a new thought
router.route("/").post(createThought);

// update a thought by ID
router.route("/:thoughtId").put(updateThought);

// delete a thought by ID
router.route("/:thoughtId").delete(deleteThought);

// add a reaction to a thought
router.route("/:thoughtId/reactions").post(addReaction);

// delete a reaction from a thought
router.route("/:thoughtId/reactions/:reactionsId").delete(deleteReaction);

module.exports = router;