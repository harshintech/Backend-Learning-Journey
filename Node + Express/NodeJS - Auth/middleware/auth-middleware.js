const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  console.log("auth middleware is called");

  const token = authHeader && authHeader.split(" ")[1];
  console.log(token)
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Access denied. No token provided. Please Login to Continue",
    });
  }

  //decode this token
  try {
    console.log("token decoding")
    const decodeTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decodeTokenInfo);
    req.userInfo = decodeTokenInfo;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Access denied. No token provided. Please Login to Continue",
    });
  }
};

module.exports = authMiddleware;
