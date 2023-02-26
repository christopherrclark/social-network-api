// boilerplate from 11-Ins_models-schemas

const mongoose = require('mongoose');

// Wrap Mongoose around local connection to MongoDB
mongoose.connect(process.env.MONGODB_URI||'mongodb://127.0.0.1:27017/social-network-api', {   //changed to social-network-api
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Export connection 
module.exports = mongoose.connection;