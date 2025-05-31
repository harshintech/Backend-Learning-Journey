const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  isActive: Boolean,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

//create user model
const User = mongoose.model("User", userSchema);

async function runQueryExamples(params) {
  try {
    const newUser = await User.create({
      name: "Updated Head",
      email: "updated@gmail.com",
      age: 15,
      isActive: false,
      tags: ["devloper"],
    });

    // const newUser = new User({
    //   name: "Raj",
    //   email: "raj75@gmail.com",
    //   age: 79,
    //   isActive: true,
    //   tags: ["devloper", "desigener", "manager"],
    // });
    // await newUser.save();
    console.log("Created New User", newUser);

    // const allUsers = await User.find({});
    // console.log(allUsers);

    // const getUserOfActiveFalse = await User.find({ isActive: false });
    // console.log(getUserOfActiveFalse)

    //findOne method give you first user which match condition
    //const getUserOfActiveFalse = await User.findOne({ isActive: false });

    // const getLastCreatedUserByUserId = await User.findById(newUser._id);
    // console.log(getLastCreatedUserByUserId,"getLgetLastCreatedUserByUserIdast")

    // const selectedFields = await User.find().select('name email -_id');
    // console.log(selectedFields);

    // const limitedUsers = await User.find().limit(3).skip(1);
    // console.log(limitedUsers);

    // const sortedUsers = await User.find().sort({ age: -1 });
    // //--> +1 for asedeant order -1 means decendieant order
    // console.log(sortedUsers);

    // const countDocuments = await User.countDocuments({ isActive: false });
    // console.log(countDocuments);

    // const deletedUser = await User.findByIdAndDelete(newUser._id);
    // console.log("delted user -->", deletedUser);

    const updateUser = await User.findByIdAndUpdate(
      newUser._id,
      {
        $set: { age: 100 },
        $push: { tags: "updated" },
      },
      { new: true }
    );

    console.log(updateUser);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
  }
}

runQueryExamples();
