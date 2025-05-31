const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register controller

const registerUser = async (req, res) => {
  try {
    //extract user information from our request body
    console.log("fetchin body");
    const { username, email, password, role } = req.body;
    console.log(req.body);

    //check if the user is already exits in out database
    const checkExitingUser = await User.findOne({
      $or: [{ username }, { email }], //--> Match any one condition here in database
    });

    if (checkExitingUser) {
      return res.status(400).json({
        success: false,
        message:
          "User is already exits either with same username or same email. Please try with different username or email",
      });
    }
    //hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    // new User() + .save() = two steps: create instance, then save it
    // User.create() = one step: create + save in one go
    // Both are valid and work the same way.


    //create new user and save in database
    const newlyCreatedUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await newlyCreatedUser.save();
    
    if (newlyCreatedUser) {
      res.status(201).json({
        success: true,
        message: "User Register Successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to register user plese try again",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured! Please try again",
    });
  }
};

//login controller
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    //find if current user is exiting in database or not
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not Exit with this username or password",
      });
    }

    //if the password correct or not
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    //create user token
    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30m",
      }
    );

    res.status(200).json({
      success: true,
      message: "Logged in Successful",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured! Please try again",
    });
  }
};

module.exports = { loginUser, registerUser };



















// Great question, Harsh! How does bcrypt know to use 10 (the salt rounds) again when comparing the password?

// Here’s how it works internally:
// When you do this during registration:

// js
// Copy
// Edit
// const salt = await bcrypt.genSalt(10);
// const hashedPassword = await bcrypt.hash(password, salt);
// bcrypt generates a salt with 10 rounds (the “cost factor”).

// It combines the salt and the password, runs the hashing process, and produces a hash string.

// The important part:
// The generated hash string actually contains the salt and the cost factor inside it as part of its format.

// It looks like this (example):

// perl
// Copy
// Edit
// $2a$10$WZ.K6Wx0N5i7DwFROaMZaeB9Yg0uTGnPEFxL9MLH6cOnDdUYObMPS
// Breaking it down:

// $2a$ — bcrypt version

// 10$ — cost factor (10 rounds)

// WZ.K6Wx0N5i7DwFROaMZae — the salt

// Remaining part — the hashed password

// So when you call:
// js
// Copy
// Edit
// bcrypt.compare(inputPassword, storedHashedPassword);
// bcrypt:

// Extracts the salt and cost factor (10) from the stored hashed password.

// Uses that same salt and cost factor to hash the inputPassword.

// Compares the new hash with the stored hash.

// No need to pass the “10” rounds again for comparison!
// It’s all embedded in the hashed password string itself.

// Summary:
// The cost factor (salt rounds) and salt are stored inside the bcrypt hash string.

// bcrypt.compare reads these from the hash to reproduce the exact hashing process.

// You only specify salt rounds when creating the hash, not when comparing.

// Hope this clears it up! Want me to show an example of how the hash string looks?
