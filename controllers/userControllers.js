const { User, Thought } = require('../models');

const userController = {

  // get all users
  getAllUsers(req,res){
    User.find()
    .then(function(users)
    {
      res.json(users);
    })
    .catch(function(err){
      console.error(err);
      res.status(404).json(err);
    })
  },

  // get single user
  getSingleUser(req,res){
    User.findOne({_id:req.params.userId})
    .populate('thoughts')
    .then(function(user)
    {
      if (!user){
        return res.status(404).json({message: "no such user"})
      }
      res.json(user);
    })
    .catch(function(err){
      console.error(err);
      res.status(404).json({message: err})
    })
  },

  // create a new user
  createUser(req,res){
    User.create(req.body)
    .then(function(user){
      res.json(user);
    })
    .catch(function(err){
      console.error(err)
      res.status(404).json({message: err})
    })
  },

  // update user
  updateUser(req,res){
    User.findByIdAndUpdate({_id:req.params.userId}, req.body, {new:true})
    .then(function(user){
      if (!user){
        return res.status(404).json({message: "no such user"})
      }
      res.json(user);
    })
    .catch(function(err){
      console.error(err)
      res.status(404).json({message: err})
    })
  },

  // delete user
  deleteUser(req,res){
    User.findByIdAndDelete({_id:req.params.userId})
    .then(function(user){
      if (!user){
        return res.status(404).json({message: "no such user"})
      }
      res.json({message: "user deleted"});
    })
    .catch(function(err){
      console.error(err)
      res.status(404).json({message: err})
    })
  },

  // add friend
  addFriend(req, res) {
    User.findByIdAndUpdate(
      { _id:eq.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((updatedUser) => {
        if (!updatedUser) {
          return res.status(404).json({message: "no such user"});
        }
        res.json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(404).json({ message: err });
      });
  },

  // delete friend
  deleteFriend(req, res) {
    User.findByIdAndUpdate(
      { _id:req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((updatedUser) => {
        if (!updatedUser) {
          return res.status(404).json({ message: "no such user" })
        }
        res.json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(404).json({ message: err })
      });
  }
};

module.exports = userController