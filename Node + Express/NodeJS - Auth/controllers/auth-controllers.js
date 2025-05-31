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
      $or: [{ username }, { email }],
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
