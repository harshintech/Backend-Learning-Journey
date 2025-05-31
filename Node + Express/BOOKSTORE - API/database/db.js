const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    console.log("database connection starting")
    await mongoose.connect(
      "mongodb+srv://<username>:<password>@cluster0.iqmlqsb.mongodb.net/"
    );
    console.log("mongodb connected successfully !");
  } catch (error) {
    console.error("MongoDb Connection Failed", error);
    process.exit(1);
  }
};

module.exports = connectToDB;
