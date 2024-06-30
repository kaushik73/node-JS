const mongoose = require("mongoose");

async function connectToMongoDB(url) {
  return mongoose.connect(url);
}

module.exports = {
  connectToMongoDB,
};

// mongoose.connect(
//   "mongodb+srv://testUser:testUser@usercrud.9ds5rs9.mongodb.net/?retryWrites=true&w=majority&appName=userCRUD"
// );
