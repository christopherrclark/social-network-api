const router = require("express").Router();
const { 
  getAllUsers, getSingleUser
} = require ("../../controllers/userControllers")

router.route("/").get(getAllUsers)
router.route("/:userId").get(getSingleUser)
