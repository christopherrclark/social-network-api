const { User, Thought } = require('../models');
const userController = {
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
  getSingleUser(req,res){
    User.findOne({_id:req.params.userId})
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
  createUser(req,res){
    User.create(req.body)
    .then(function(user){
      res.json(user);
    })
    .catch(function(err){
      console.error(err)
      res.status(404).json({message: err})
    })
  }
}

module.exports = userController