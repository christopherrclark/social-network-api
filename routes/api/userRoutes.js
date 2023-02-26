const router = require("express").Router();

const { 
  getAllUsers, 
  getSingleUser, 
  createUser, 
  deleteUser, 
  updateUser, 
  addFriend,
  deleteFriend, 

} = require ("../../controllers/userControllers");

// route for getting all users
router.route("/").get(getAllUsers);

// route for getting a single user
router.route("/:userId").get(getSingleUser);

//route for creating a new user
router.route("/").post(createUser);

//route for deleting a user
router.route("/:userId").delete(deleteUser);

//route for updating a user
router.route("/:userId").put(updateUser);

//route for adding a friend
router.route("/:userId/friends/friendId").post(addFriend);

//route for deleting a friend
router.route("/:userId/friends/friendId").delete(deleteFriend);

module.exports = router;